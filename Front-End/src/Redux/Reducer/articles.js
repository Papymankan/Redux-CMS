import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import store from "../store";

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

export const removeArticle = createAsyncThunk('articles/removeArticle', async (url) => {
    Swal.fire({
        title: "<strong>در حال حذف کردن ...</strong>",
        icon: "warning",
        showCloseButton: false,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        showConfirmButton:false,
        didOpen:()=>{
            Swal.showLoading()
        }
      })
    return fetch(url, { method: 'DELETE' }).then(res => {
        if(res.ok){
            Swal.fire({
                title: "<strong>مقاله با موفقیت حذف شد</strong>",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
              })
        }
        return res.json()
    }).then(data => {
        return data
    })
})

export const createArticle = createAsyncThunk('articles/createArticle', async ({url, article}) => {
    Swal.fire({
        title: "<strong>در حال اضافه کردن ...</strong>",
        icon: "warning",
        showCloseButton: false,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        showConfirmButton:false,
        didOpen:()=>{
            Swal.showLoading()
        }
      })
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    }).then(res => {
        if (res.ok) {
            Swal.fire({
                title: "<strong>مقاله با موفقیت اضافه شد</strong>",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            })
            store.dispatch(fetchArticles(url))
        }
        return res.json()
    }).then(data => {
        console.log(data);
        return data
    })
})

const slice = createSlice({
    name: 'articles',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchArticles.fulfilled, (state, action) => action.payload)
            .addCase(removeArticle.fulfilled, (state, action) => {
                console.log(state, action);
                if (action.payload.id) {
                    let newArticles = state.filter(article => article._id != action.payload.id)
                    return newArticles
                }
            })
            .addCase(createArticle.fulfilled, (state, action) => {
                console.log(state, action);
            })
    }
})

export default slice.reducer