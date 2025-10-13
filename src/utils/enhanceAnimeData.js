async function fetchJikanData(malId) {
  if (!malId) return null;
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${malId}`);
    if (response.status === 429) {
      // Rate limited - wait and retry
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return fetchJikanData(malId);
    }
    if (!response.ok) return null;
    const data = await response.json();
    return data.data;
  } catch {
    return null;
  }
}

// Enhanced cache for individual anime
const enhancedCache = new Map();

export async function enhanceSingleAnime(anime) {
  // Check cache first
  if (enhancedCache.has(anime.mal_id)) {
    return enhancedCache.get(anime.mal_id);
  }

  // If already enhanced, return as is
  if (anime.image_url) {
    enhancedCache.set(anime.mal_id, anime);
    return anime;
  }

  const jikanData = await fetchJikanData(anime.mal_id);

  const enhancedAnime = jikanData
    ? {
        ...anime,
        image_url: jikanData.images?.jpg?.image_url || "",
        genres: jikanData.genres || [],
        studios: jikanData.studios || [],
        producers: jikanData.producers || [],
        licensors: jikanData.licensors || [],
        mal_score: jikanData.score || 0,
        synopsis: jikanData.synopsis || "",
        year: jikanData.year || 0,
        status: jikanData.status || "",
      }
    : anime;

  // Cache the result
  enhancedCache.set(anime.mal_id, enhancedAnime);

  return enhancedAnime;
}

export async function enhanceAnimeList(animeList) {
  const results = [];

  for (let i = 0; i < animeList.length; i++) {
    const enhanced = await enhanceSingleAnime(animeList[i]);
    results.push(enhanced);

    // Rate limiting - 1 request per second if we made an API call
    if (i < animeList.length - 1 && !animeList[i].image_url) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}

export async function enhanceAllAnimeData(
  animeList,
  { progressCallback } = {}
) {
  const enhanced = [];
  let success = 0;
  for (let i = 0; i < animeList.length; i++) {
    const base = animeList[i];
    if (progressCallback) {
      progressCallback({
        current: i + 1,
        total: animeList.length,
        successful: success,
        currentAnime: base.title,
      });
    }
    const item = await enhanceSingleAnime(base);
    if (item.image_url) success++;
    enhanced.push(item);
    if (i < animeList.length - 1 && !base.image_url) {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return enhanced;
}
