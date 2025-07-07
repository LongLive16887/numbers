import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Fact } from "../../types/types";

interface FactState {
  value: Fact | null;
}

const initialState: FactState = {
  value: null,
};

const factSlice = createSlice({
  name: "fact",
  initialState,
  reducers: {
    setFact: (state, action: PayloadAction<Fact>) => {
      state.value = action.payload;
    },
    clearFact: (state) => {
      state.value = null;
    },
  },
});

export const { setFact, clearFact } = factSlice.actions;
export default factSlice.reducer;
