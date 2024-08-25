import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import store from "../store";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

export const createCategory = createAsyncThunk('categories/createCategory', async ({ url, title }) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    }).then(res => {
        if (res.ok) {
            Swal.fire({
                title: "<strong>دسته بندی با موفقیت اضافه شد</strong>",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            })
            store.dispatch(fetchCategories(url))
        }
        return res.json()
    }).then(data => data)
})



const slice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => [...action.payload])
        .addCase(createCategory.fulfilled , (state , action) => {
            console.log(state , action);
            
        })
    }
})

export default slice.reducer