import { createSlice } from "@reduxjs/toolkit";

const gerirPizzaSlice = createSlice({
  name: "GerirPizza",
  initialState: {
    metades: [[], [], [], []],
  },
  reducers: {
    setMetades: (state, { payload }) => {
      state.metades = payload;
    },
    getMetades: (state) => {
      return state.metades;
    },
  },
});

export const { setMetades, getMetades } = gerirPizzaSlice.actions;

export const selectMetades = (state) => state.GerirPizza.metades;

const reducer = gerirPizzaSlice.reducer;
export default reducer;
