// components/AnimeStatsPanel.jsx
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  FaTv,
  FaStar,
  FaClock,
  FaChartPie,
  FaCalendar,
  FaBuilding,
  FaAward,
} from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsPanel = ({ data }) => {
  const stats = useMemo(() => {
    if (!data.length) return null;

    const normalize = (s) => s?.toLowerCase().replace(/[\s-]/g, "_");
    const totalAnime = data.length;
    const completedAnime = data.filter(
      (anime) => normalize(anime.my_status) === "completed"
    ).length;

    // Ratings-only calculations
    const rated = data.filter((anime) => (anime.my_score || 0) > 0);
    const ratingsCount = rated.length;
    const averageScore =
      ratingsCount > 0
        ? rated.reduce((sum, anime) => sum + (anime.my_score || 0), 0) /
          ratingsCount
        : 0;
    const ratingVariance =
      ratingsCount > 0
        ? rated.reduce((sum, anime) => {
            const diff = (anime.my_score || 0) - averageScore;
            return sum + diff * diff;
          }, 0) / ratingsCount
        : 0;
    const ratingStdDev = Math.sqrt(ratingVariance);

    // Additional rating metrics
    const ratedScores = rated.map((a) => a.my_score).sort((a, b) => a - b);
    const medianScore =
      ratingsCount > 0
        ? ratingsCount % 2 === 0
          ? (ratedScores[ratingsCount / 2 - 1] +
              ratedScores[ratingsCount / 2]) /
            2
          : ratedScores[Math.floor(ratingsCount / 2)]
        : 0;

    // Mode (most common score)
    const scoreFreq = {};
    ratedScores.forEach(
      (score) => (scoreFreq[score] = (scoreFreq[score] || 0) + 1)
    );
    const modeScore =
      ratingsCount > 0
        ? Object.entries(scoreFreq).reduce((a, b) =>
            scoreFreq[a[0]] > scoreFreq[b[0]] ? a : b
          )[0]
        : 0;

    // Generosity index (% of ratings >= 8)
    const generousRatings = rated.filter((a) => a.my_score >= 8).length;
    const generosityIndex =
      ratingsCount > 0 ? (generousRatings / ratingsCount) * 100 : 0;

    // Harshness delta (average difference from MAL community score)
    const ratedWithMalScore = rated.filter(
      (a) => a.mal_score && a.mal_score > 0
    );
    const avgHarshnessDelta =
      ratedWithMalScore.length > 0
        ? ratedWithMalScore.reduce(
            (sum, a) => sum + (a.my_score - a.mal_score),
            0
          ) / ratedWithMalScore.length
        : 0;

    // Status distribution
    const statusCounts = {
      completed: 0,
      watching: 0,
      plan_to_watch: 0,
      on_hold: 0,
      dropped: 0,
    };

    data.forEach((anime) => {
      const key = normalize(anime.my_status);
      if (statusCounts.hasOwnProperty(key)) {
        statusCounts[key]++;
      }
    });

    // Genre distribution (top 8 by count)
    const genreCounts = {};
    const genreScores = {};
    data.forEach((anime) => {
      if (anime.genres && anime.genres.length > 0) {
        anime.genres.forEach((genre) => {
          const name = genre.name;
          genreCounts[name] = (genreCounts[name] || 0) + 1;
          if ((anime.my_score || 0) > 0) {
            genreScores[name] = genreScores[name] || { sum: 0, count: 0 };
            genreScores[name].sum += anime.my_score;
            genreScores[name].count += 1;
          }
        });
      }
    });

    const topGenres = Object.entries(genreCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    // Genre averages and extremes
    const minGenreSamples = 3;
    const genreAverages = Object.entries(genreScores)
      .filter(([, v]) => v.count >= minGenreSamples)
      .map(([name, v]) => ({ name, avg: v.sum / v.count, count: v.count }))
      .sort((a, b) => b.avg - a.avg);

    const mostGenerousGenre = genreAverages[0] || null;
    const harshestGenre = genreAverages.length
      ? genreAverages[genreAverages.length - 1]
      : null;

    // Score distribution
    const scoreDistribution = {};
    for (let i = 1; i <= 10; i++) {
      scoreDistribution[i] = 0;
    }
    data.forEach((anime) => {
      if (anime.my_score > 0) {
        scoreDistribution[anime.my_score]++;
      }
    });

    // Calculate total episodes watched
    const totalTVEpisodesWatched = data
      .filter((anime) => anime.type === "TV")
      .reduce((total, anime) => {
        return total + (anime.my_watched_episodes || 0);
      }, 0);

    const totalMovieEpisodesWatched = data
      .filter((anime) => anime.type === "Movie")
      .reduce((total, anime) => {
        return total + (anime.my_watched_episodes || 0);
      }, 0);

    // Estimate watch time (assuming 24 minutes per TV ep, 120 per movie)
    const estimatedMinutes =
      totalTVEpisodesWatched * 24 + totalMovieEpisodesWatched * 120;
    const estimatedHours = Math.round(estimatedMinutes / 60);
    const estimatedDays = Math.round((estimatedHours / 24) * 10) / 10;

    // Studio stats
    const studioMap = {};
    data.forEach((anime) => {
      const studios = Array.isArray(anime.studios) ? anime.studios : [];
      const score = anime.my_score || 0;
      studios.forEach((s) => {
        const name = typeof s === "string" ? s : s?.name;
        if (!name) return;
        if (!studioMap[name]) studioMap[name] = { count: 0, sum: 0, rated: 0 };
        studioMap[name].count += 1;
        if (score > 0) {
          studioMap[name].sum += score;
          studioMap[name].rated += 1;
        }
      });
    });
    const studioStats = Object.entries(studioMap).map(([name, v]) => ({
      name,
      count: v.count,
      avg: v.rated > 0 ? v.sum / v.rated : 0,
      rated: v.rated,
    }));
    const topStudiosByCount = [...studioStats]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    const minStudioSamples = 3;
    const topStudiosByAvg = studioStats
      .filter((s) => s.rated >= minStudioSamples)
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 5);

    return {
      totalAnime,
      completedAnime,
      averageScore,
      ratingsCount,
      ratingVariance,
      ratingStdDev,
      medianScore,
      modeScore,
      generosityIndex,
      avgHarshnessDelta,
      statusCounts,
      topGenres,
      genreAverages,
      mostGenerousGenre,
      harshestGenre,
      scoreDistribution,
      totalTVEpisodesWatched,
      totalMovieEpisodesWatched,
      estimatedHours,
      estimatedDays,
      topStudiosByCount,
      topStudiosByAvg,
    };
  }, [data]);

  if (!stats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No data available
        </p>
      </div>
    );
  }

  const chartColors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
  ];

  const genreChartData = {
    labels: stats.topGenres.map(([genre]) => genre),
    datasets: [
      {
        data: stats.topGenres.map(([, count]) => count),
        backgroundColor: chartColors,
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const statusChartData = {
    labels: ["Completed", "Watching", "Plan to Watch", "On Hold", "Dropped"],
    datasets: [
      {
        data: [
          stats.statusCounts.completed,
          stats.statusCounts.watching,
          stats.statusCounts.plan_to_watch,
          stats.statusCounts.on_hold,
          stats.statusCounts.dropped,
        ],
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#6B7280",
          "#F59E0B",
          "#EF4444",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
          font: { size: 11 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
              <FaTv />
              {stats.totalAnime}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Anime
            </div>
          </div>

          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {stats.completedAnime}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Completed
            </div>
          </div>

          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 flex items-center justify-center gap-2">
              <FaStar />
              {stats.averageScore.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Average Score
            </div>
          </div>

          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2">
              <FaClock />
              {stats.estimatedDays}d
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              ~{stats.estimatedHours}h Watched
            </div>
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          My Ratings
        </h3>
        <div className="space-y-2">
          {Object.entries(stats.scoreDistribution)
            .filter(([, count]) => count > 0)
            .sort(([a], [b]) => b - a)
            .map(([score, count]) => {
              const percentage = (count / stats.totalAnime) * 100;
              return (
                <div key={score} className="flex items-center gap-3">
                  <div className="w-8 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {score}/10
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-8 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {count}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Rating Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Rating Insights
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Ratings Count
            </div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.ratingsCount}
            </div>
          </div>
          <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Std. Deviation
            </div>
            <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              {stats.ratingStdDev.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Lower means more consistent
            </div>
          </div>
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Variance
            </div>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400">
              {stats.ratingVariance.toFixed(2)}
            </div>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Median Score
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats.medianScore}/10
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Middle value
            </div>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Harshness Delta
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.avgHarshnessDelta > 0 ? "+" : ""}
              {stats.avgHarshnessDelta.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              vs MAL community | Lower means stricter
            </div>
          </div>
          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Generosity Index
            </div>
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
              {stats.generosityIndex.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              % rated ≥8/10
            </div>
          </div>
          {stats.mostGenerousGenre && (
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Most Generous Genre
              </div>
              <div className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                {stats.mostGenerousGenre.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg {stats.mostGenerousGenre.avg.toFixed(2)} (
                {stats.mostGenerousGenre.count} rated)
              </div>
            </div>
          )}
          {stats.harshestGenre && (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Harshest Genre
              </div>
              <div className="text-xl font-semibold text-orange-600 dark:text-orange-400">
                {stats.harshestGenre.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Avg {stats.harshestGenre.avg.toFixed(2)} (
                {stats.harshestGenre.count} rated)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Genre Distribution */}
      {stats.topGenres.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaChartPie className="text-gray-500 dark:text-gray-400" /> Top
            Genres
          </h3>
          <div className="h-64 relative">
            <Pie data={genreChartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Status Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FaChartPie className="text-gray-500 dark:text-gray-400" /> Watch
          Status
        </h3>
        <div className="h-64 relative">
          <Pie data={statusChartData} options={chartOptions} />
        </div>
      </div>

      {/* Studios & Creators */}
      {(stats.topStudiosByCount.length > 0 ||
        stats.topStudiosByAvg.length > 0) && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaBuilding className="text-gray-500" /> Studios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.topStudiosByCount.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Most Watched (by titles)
                </h4>
                <div className="space-y-2">
                  {stats.topStudiosByCount.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg"
                    >
                      <div className="text-gray-800 dark:text-gray-200">
                        {s.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {s.count} titles
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {stats.topStudiosByAvg.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <FaAward className="text-yellow-500" /> Highest Rated (min 3
                  rated)
                </h4>
                <div className="space-y-2">
                  {stats.topStudiosByAvg.map((s) => (
                    <div
                      key={s.name}
                      className="p-3 bg-gray-50 dark:bg-gray-900/30 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-gray-800 dark:text-gray-200">
                          {s.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {s.avg.toFixed(2)} avg
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {s.rated} rated titles
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
