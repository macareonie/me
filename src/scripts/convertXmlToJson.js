import fs from "fs";
import xml2js from "xml2js";
import fetch from "node-fetch";

const parser = new xml2js.Parser();

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

export async function parseAndEnhanceMAL(inputFile, outputFile) {
  const xml = await fs.promises.readFile(inputFile);

  const result = await parser.parseStringPromise(xml);

  let animeArray = result.myanimelist?.anime || [];

  const formattedAnimeList = animeArray.map((anime) => {
    const getText = (tag) =>
      anime[tag] ? anime[tag][0]?.trim() || null : null;

    return {
      mal_id: getText("series_animedb_id"),
      title: getText("series_title"),
      type: getText("series_type"),
      episodes: parseInt(getText("series_episodes")) || 0,
      my_status: getText("my_status"),
      my_score: parseInt(getText("my_score")) || 0,
      my_watched_episodes: parseInt(getText("my_watched_episodes")) || 0,
      my_start_date: getText("my_start_date"),
      my_finish_date: getText("my_finish_date"),
      my_comments: getText("my_comments"),
      my_tags: getText("my_tags"),
      // add more fields as needed
    };
  });

  for (let i = 0; i < formattedAnimeList.length; i++) {
    const malId = formattedAnimeList[i].mal_id;
    const jikanData = await fetchJikanData(malId);
    if (jikanData) {
      formattedAnimeList[i].synopsis = jikanData.synopsis || "";
      formattedAnimeList[i].mal_score = jikanData.score || 0;
      formattedAnimeList[i].genres = jikanData.genres || [];
      formattedAnimeList[i].image_url = jikanData.images?.jpg?.image_url || "";
      formattedAnimeList[i].title_english = jikanData.title_english || "";
      formattedAnimeList[i].studios = jikanData.studios || [];
    }
    if (i < formattedAnimeList.length - 1) {
      // Respect 1 request per second
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  await fs.promises.writeFile(
    outputFile,
    JSON.stringify(formattedAnimeList, null, 2),
    "utf-8"
  );
  console.log("XML successfully converted and enhanced to JSON.");

  return formattedAnimeList;
}

// Main execution
(async () => {
  try {
    await parseAndEnhanceMAL(
      "src/data/myanimelist.xml",
      "src/data/myanimelist.json"
    );
  } catch (error) {
    console.error("Error during conversion:", error);
    process.exit(1);
  }
})();
