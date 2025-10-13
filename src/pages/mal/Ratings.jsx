import React, { useState, useMemo } from "react";
import {
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSync,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useMALData } from "../../hooks/useMALData";
import RatingCard from "./RatingCard";
import StatsPanel from "./StatsPanel";

const Ratings = () => {
  const { data, loading, enhancing, progress, error, refreshData } =
    useMALData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("my_score");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((anime) =>
        anime.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((anime) => {
        // Normalize status values for comparison
        const normalizedStatus = anime.my_status
          ?.toLowerCase()
          .replace(/[\s-]/g, "_");
        return normalizedStatus === statusFilter;
      });
    }

    // Sort data
    filtered.sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case "my_score":
          valueA = a.my_score || 0;
          valueB = b.my_score || 0;
          break;
        case "title":
          valueA = a.title?.toLowerCase() || "";
          valueB = b.title?.toLowerCase() || "";
          break;
        case "mal_score":
          valueA = a.mal_score || 0;
          valueB = b.mal_score || 0;
          break;
        case "my_finish_date":
          valueA = new Date(a.my_finish_date || "1970-01-01");
          valueB = new Date(b.my_finish_date || "1970-01-01");
          break;
        case "year":
          valueA = a.year || 0;
          valueB = b.year || 0;
          break;
        default:
          valueA = a.my_score || 0;
          valueB = b.my_score || 0;
      }

      if (typeof valueA === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    return filtered;
  }, [data, searchTerm, statusFilter, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex);

  if (loading && !data.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            {enhancing
              ? "Enhancing anime data with additional information..."
              : "Loading your anime collection..."}
          </h2>
          {enhancing && progress && (
            <div className="bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto">
              <>
                <p className="text-sm text-gray-600 mb-2">
                  Processing: {progress.currentAnime}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(progress.current / progress.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {progress.current} / {progress.total} ({progress.successful}{" "}
                  enhanced)
                </p>
              </>
            </div>
          )}
          {enhancing && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              This may take a few minutes for the first load
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 max-w-md mx-auto text-center border border-gray-200 dark:border-gray-700">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => refreshData()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                MyAnimeList Ratings
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Trying to "document" everything I've watched/read.
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Total: {filteredAndSortedData.length} anime</span>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                {enhancing && <FaSpinner className="animate-spin" />}
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setShowStats(!showStats)}
                className="bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaCog />
                {showStats ? "Hide Stats" : "Show Stats"}
              </button>
              <button
                onClick={() => refreshData()}
                disabled={enhancing}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <FaSync className={enhancing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <StatsPanel data={data} />
        </div>
      )}

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search anime..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="watching">Watching</option>
                <option value="on_hold">On Hold</option>
                <option value="plan_to_watch">Plan to Watch</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex gap-2">
              <div className="relative">
                <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="my_score">My Score</option>
                  <option value="title">Title</option>
                  <option value="mal_score">MAL Score</option>
                  <option value="year">Year</option>
                  <option value="my_finish_date">Finish Date</option>
                </select>
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top progress during initial enhancement */}
        {enhancing && progress && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
              />
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Enhancing: {progress.current} / {progress.total} —{" "}
              {progress.currentAnime}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedData.length)} of{" "}
            {filteredAndSortedData.length} anime
          </p>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FaChevronLeft />
            </button>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Anime Grid */}
        {currentPageData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPageData.map((anime) => (
              <RatingCard
                key={anime.mal_id}
                anime={anime}
                showReview={
                  anime.my_comments && anime.my_comments.trim().length > 0
                }
              />
            ))}
          </div>
        ) : filteredAndSortedData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No anime found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className="mt-2 text-blue-600 hover:text-blue-800 underline"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        {/* Bottom Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-2"
              >
                <FaChevronLeft /> Previous
              </button>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-2"
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ratings;
