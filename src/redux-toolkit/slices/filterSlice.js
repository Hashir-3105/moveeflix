import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchItem: "",
  voteRange: "all",
  voteAverage: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
      state.voteRange = "all";
      state.voteAverage = "all";
    },
    setVoteRange: (state, action) => {
      state.searchItem = "";
      state.voteRange = action.payload;
      state.voteAverage = "all";
    },
    setVoteAverage: (state, action) => {
      state.searchItem = "";
      state.voteRange = "all";
      state.voteAverage = action.payload;
    },
    resetFilters: () => initialState,
  },
});
export const { setSearchItem, setVoteRange, setVoteAverage, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
