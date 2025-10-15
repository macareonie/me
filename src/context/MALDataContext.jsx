import React, { createContext, useContext, useState, useEffect } from "react";
import malData from "../data/myanimelist.json";
import { enhanceAllAnimeData } from "../utils/enhanceAnimeData";

const MALDataContext = createContext(null);

export const MALDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enhancing, setEnhancing] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnimeData();
  }, []);

  const loadAnimeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cache keys
      const cacheKey = "mal_enhanced_all_data";
      const cacheTimestampKey = "mal_enhanced_all_timestamp";
      const ttl = 30 * 24 * 60 * 60 * 1000; // 30 days

      const cached = localStorage.getItem(cacheKey);
      const ts = localStorage.getItem(cacheTimestampKey);
      if (cached && ts && Date.now() - parseInt(ts, 10) < ttl) {
        setData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Enhance all upfront
      setEnhancing(true);
      const enhanced = await enhanceAllAnimeData(malData, {
        progressCallback: setProgress,
      });
      setData(enhanced);
      localStorage.setItem(cacheKey, JSON.stringify(enhanced));
      localStorage.setItem(cacheTimestampKey, String(Date.now()));
    } catch (err) {
      setError(err.message);
    } finally {
      setEnhancing(false);
      setLoading(false);
    }
  };

  const refreshData = () => {
    // clear cache then reload
    localStorage.removeItem("mal_enhanced_all_data");
    localStorage.removeItem("mal_enhanced_all_timestamp");
    loadAnimeData();
  };

  return (
    <MALDataContext.Provider
      value={{ data, loading, enhancing, progress, error, refreshData }}
    >
      {children}
    </MALDataContext.Provider>
  );
};

export const useMALData = () => {
  const context = useContext(MALDataContext);
  if (!context) {
    throw new Error("useMALData must be used within MALDataProvider");
  }
  return context;
};
