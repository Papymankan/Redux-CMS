import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

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
    }
})

export default slice.reducer