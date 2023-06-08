import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    error: null,
    data: null,
    loading: false
};

export const fetchAnalyticsData = createAsyncThunk("analytics/get", async () => {
    const response = await fetch('http://localhost:3000/api/analytics', {
        method: 'GET',
    });

   return await response.json();
})

export const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAnalyticsData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
            state.loading = false;

            state.data = action.payload;
        })
        .addCase(fetchAnalyticsData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(HYDRATE, (state, action) => {
            return {
                ...state,
                ...action.payload.analytics
            }
        })
    },
});
