import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import malEnhancerSingleton from "./malEnhancerSingleton";

const MALDataContext = createContext(null);

export const MALDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enhancing, setEnhancing] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to singleton state
    const unsubscribe = malEnhancerSingleton.subscribe((state) => {
      setData(state.data);
      setLoading(state.loading);
      setEnhancing(state.enhancing);
      setProgress(state.progress);
      setError(state.error);
    });
    // Start enhancement if not already started
    malEnhancerSingleton.startEnhancement();
    return unsubscribe;
  }, []);

  const refreshData = () => {
    malEnhancerSingleton.refresh();
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
