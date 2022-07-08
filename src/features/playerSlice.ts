import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

const initialState = {
  currentTrack: "",
  isPlayed: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.currentTrack = action.payload;
    },
    setIsPlayed: (state, action) => {
      state.isPlayed = action.payload;
    },
  },
});

export const { setPlayers, setIsPlayed } = playerSlice.actions;

export const selectPlayer = (state: RootState) => state.player;

export default playerSlice.reducer;
