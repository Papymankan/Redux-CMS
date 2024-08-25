import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import store from "../store";

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})

export const createCourse = createAsyncThunk('courses/createCourse', async ({url, course}) => {
    console.log(course);
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(course)
    }).then(res => {
        if (res.ok) {
            Swal.fire({
                title: "<strong>دوره با اضافه شد</strong>",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            })
        }
        return res.json()
    }).then(data => {
        console.log(data);

        return data
    })
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
                title: "<strong>دوره با موفقیت حذف شد</strong>",
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

export const addDiscount = createAsyncThunk('courses/addDiscount', async ({url ,discount}) => {
    console.log( discount);
    
    Swal.fire({
        title: "<strong>در حال ثبت ...</strong>",
        icon: "warning",
        showCloseButton: false,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })
    return fetch(url ,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({discount})
    }).then(res => {
        if (res.ok) {
            Swal.fire({
                title: "<strong>تخفیف با موفقیت اعمال گردید</strong>",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            })
            store.dispatch(fetchCourses('https://redux-cms.iran.liara.run/api/courses'))
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
            .addCase(createCourse.fulfilled, (state, action) => {
                console.log(state, action);

            })
            .addCase(addDiscount.fulfilled, (state, action) => {
                console.log(state, action);
            })

    }
})

export default slice.reducer