// malEnhancerSingleton.js
// Singleton enhancement orchestrator for MAL data

import malData from "../data/myanimelist.json";
import { enhanceAllAnimeData } from "../utils/enhanceAnimeData";

class MalEnhancer {
  constructor() {
    this.data = [];
    this.loading = true;
    this.enhancing = false;
    this.progress = null;
    this.error = null;
    this.listeners = new Set();
    this._hasStarted = false;
    this._enhancementPromise = null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Immediately notify with current state
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  getState() {
    return {
      data: this.data,
      loading: this.loading,
      enhancing: this.enhancing,
      progress: this.progress,
      error: this.error,
    };
  }

  async startEnhancement() {
    if (this._hasStarted) return this._enhancementPromise;
    this._hasStarted = true;
    this.loading = true;
    this.enhancing = true;
    this.notify();
    // ...existing cache logic from MALDataContext...
    const cacheKey = "mal_enhanced_all_data";
    const cacheTimestampKey = "mal_enhanced_all_timestamp";
    const partialCacheKey = "mal_enhanced_partial_data";
    const ttl = 1000 * 60 * 60 * 24 * 30; // 30 days
    const cached = localStorage.getItem(cacheKey);
    const ts = localStorage.getItem(cacheTimestampKey);
    if (cached && ts && Date.now() - parseInt(ts, 10) < ttl) {
      this.data = JSON.parse(cached);
      this.loading = false;
      this.enhancing = false;
      this.notify();
      return;
    }
    let startData = malData;
    let resumeCount = 0;
    const partialCached = localStorage.getItem(partialCacheKey);
    if (partialCached) {
      try {
        const partialData = JSON.parse(partialCached);
        const enhancedMap = new Map(
          partialData.map((item) => [item.mal_id, item])
        );
        startData = malData.map((item) => enhancedMap.get(item.mal_id) || item);
        resumeCount = startData.filter((item) => item.image_url).length;
        this.data = startData;
        this.progress = {
          current: resumeCount,
          total: malData.length,
          successful: resumeCount,
          currentAnime: resumeCount > 0 ? "Resuming..." : "",
        };
        this.enhancing = true;
        this.loading = false;
        this.notify();
      } catch (e) {
        this.error = "Failed to parse partial cache";
        this.notify();
      }
    }
    this._enhancementPromise = enhanceAllAnimeData(startData, {
      progressCallback: (val) => {
        this.progress = val;
        this.notify();
      },
      incrementalSaveCallback: (partialData) => {
        try {
          localStorage.setItem(partialCacheKey, JSON.stringify(partialData));
          this.data = [...partialData];
          this.notify();
        } catch (e) {
          this.error = "Failed to save partial cache";
          this.notify();
        }
      },
    })
      .then((enhanced) => {
        this.data = enhanced;
        localStorage.setItem(cacheKey, JSON.stringify(enhanced));
        localStorage.setItem(cacheTimestampKey, String(Date.now()));
        localStorage.removeItem(partialCacheKey);
        this.enhancing = false;
        this.loading = false;
        this.notify();
      })
      .catch((err) => {
        this.error = err.message;
        this.enhancing = false;
        this.loading = false;
        this.notify();
      });
    return this._enhancementPromise;
  }

  refresh() {
    localStorage.removeItem("mal_enhanced_all_data");
    localStorage.removeItem("mal_enhanced_all_timestamp");
    localStorage.removeItem("mal_enhanced_partial_data");
    this._hasStarted = false;
    this._enhancementPromise = null;
    this.data = [];
    this.progress = null;
    this.loading = true;
    this.enhancing = false;
    this.error = null;
    this.notify();
    this.startEnhancement();
  }
}

const singleton = new MalEnhancer();
export default singleton;
