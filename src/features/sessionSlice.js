import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getSessionFromLocalStorage = () => {
    const session = localStorage.getItem("session");
    if (session) {
        return JSON.parse(session);
    }
    return null;
}

export const fetchSession = createAsyncThunk(
    "session/fetchSession",
    async () => {
        let url = "http://localhost:3001/session";
        const response = await axios(
            url,
            {
                headers: {
                    Authorization: `Bearer ${getSessionFromLocalStorage()}`,
                },
            }
        )
        return response.data;
    });

const sessionSlice = createSlice({
    name: "session",
    initialState: {
        session: {},
    },
    extraReducers: {
        [fetchSession.fulfilled]: (state, action) => {
            state.session = action.payload;
        }
    }
});

export const selectSession = (state) => state.session.session;

const reducer = sessionSlice.reducer;

export default reducer;