import React, { useState } from "react";
import { FaStar, FaPlay, FaEye, FaTv } from "react-icons/fa";

const RatingCard = ({ anime, showReview = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase().replace(/[\s-]/g, "_");
    const colors = {
      watching: "bg-green-500",
      completed: "bg-blue-500",
      on_hold: "bg-yellow-500",
      dropped: "bg-red-500",
      plan_to_watch: "bg-gray-500",
    };
    return colors[normalizedStatus] || "bg-gray-400";
  };

  const getStatusText = (status) => {
    return status || "Unknown";
  };

  const getScoreColor = (score) => {
    if (score >= 9) return "text-green-600 bg-green-100";
    if (score >= 7) return "text-blue-600 bg-blue-100";
    if (score >= 5) return "text-yellow-600 bg-yellow-100";
    if (score >= 1) return "text-red-600 bg-red-100";
    return "text-gray-600 bg-gray-100";
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Image Section */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-700">
        {!imageError && anime.image_url ? (
          <img
            src={anime.image_url}
            alt={anime.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <FaTv className="text-4xl" />
            <span className="ml-2 text-sm">No Image</span>
          </div>
        )}

        {/* My Score Badge */}
        {anime.my_score > 0 && (
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getScoreColor(
              anime.my_score
            )}`}
          >
            <FaStar className="text-xs" />
            {anime.my_score}
          </div>
        )}

        {/* Status Badge */}
        <div
          className={`absolute top-3 left-3 ${getStatusColor(
            anime.my_status
          )} text-white px-3 py-1 rounded-full text-xs font-medium`}
        >
          {getStatusText(anime.my_status)}
        </div>

        {/* Progress */}
        {anime.my_watched_episodes > 0 && (
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaPlay className="text-xs" />
            {anime.my_watched_episodes}/{anime.episodes || "?"}
          </div>
        )}

        {/* Rewatch indicator */}
        {anime.my_times_watched > 1 && (
          <div className="absolute bottom-3 right-3 bg-purple-500/90 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <FaEye className="text-xs" />
            {anime.my_times_watched}x
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors min-h-[3.5rem]">
          {anime.title}
        </h3>

        {/* MAL Stats Row */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-yellow-600">
              <FaStar className="text-xs" />
              MAL: {anime.mal_score ? `${anime.mal_score}/10` : "N/A"}
            </span>
          </div>
          {anime.rank && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
              #{anime.rank}
            </span>
          )}
        </div>

        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.mal_id || genre.name}
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium"
              >
                {genre.name}
              </span>
            ))}
            {anime.genres.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{anime.genres.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Studio and Type */}
        <div className="text-xs text-gray-600 dark:text-gray-400">
          <span>
            {anime.studios && anime.studios.length > 0
              ? anime.studios[0].name
              : anime.type}
          </span>
        </div>

        {/* My Review */}
        {showReview && anime.my_comments && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic line-clamp-3">
              "{anime.my_comments}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingCard;
