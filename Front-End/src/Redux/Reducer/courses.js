import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

export const removeCourse = createAsyncThunk('courses/removeCourse', async (url) => {
    Swal.fire({
        title: "<strong>در حال حذف کردن ...</strong>",
        icon: "warning",
        showCloseButton: false,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })
    return fetch(url, { method: 'DELETE' }).then(res => {
        if (res.ok) {
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
    name: 'courses',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCourses.fulfilled, (state, action) => action.payload)
            .addCase(removeCourse.fulfilled, (state, action) => {
                console.log(state, action);
                if (action.payload.id) {
                    let newCourses = state.filter(course => course._id != action.payload.id)
                    return newCourses
                }
            })
    }
})

export default slice.reducer