import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

const slice = createSlice({
    name: 'courses',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => action.payload)
    }
})

export default slice.reducer