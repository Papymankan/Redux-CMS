import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

const slice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCategories.fulfilled,(state, action) => [...action.payload])
    }
})

export default slice.reducer