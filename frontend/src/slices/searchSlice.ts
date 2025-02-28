// src/store/slices/searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  recentSearches: string[];
  currentQuery: string | null;
}

const initialState: SearchState = {
  recentSearches: [],
  currentQuery: null,
};

// Helper function to get searches from localStorage (for initial state)
const loadRecentSearches = (): string[] => {
  try {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load recent searches from localStorage', e);
    return [];
  }
};

// Initialize with localStorage data
initialState.recentSearches = loadRecentSearches();

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      // Remove if exists (to avoid duplicates)
      state.recentSearches = state.recentSearches.filter(item => item !== query);
      // Add to beginning
      state.recentSearches.unshift(query);
      // Limit to 5 items
      state.recentSearches = state.recentSearches.slice(0, 5);
      // Save to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
    },
    
    removeRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(
        item => item !== action.payload
      );
      localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
    },
    
    clearAllRecentSearches: (state) => {
      state.recentSearches = [];
      localStorage.removeItem('recentSearches');
    },
    
    setCurrentQuery: (state, action: PayloadAction<string | null>) => {
      state.currentQuery = action.payload;
    }
  },
});

export const { 
  addRecentSearch, 
  removeRecentSearch, 
  clearAllRecentSearches,
  setCurrentQuery 
} = searchSlice.actions;

export default searchSlice.reducer;