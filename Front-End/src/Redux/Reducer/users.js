import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
    }
})

export default slice.reducer