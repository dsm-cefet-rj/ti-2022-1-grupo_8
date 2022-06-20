import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSessionFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return token;
    }
    return "";
};

export const saveSessionToLocalStorage = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
};

const sessionSlice = createSlice({
    name: "session",
    initialState: {
        token: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const selectToken = (state) => state.session.token;

export const { setToken } = sessionSlice.actions;

const reducer = sessionSlice.reducer;

export default reducer;
