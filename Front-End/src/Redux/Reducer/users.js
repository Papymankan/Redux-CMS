import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../store";
import Swal from "sweetalert2";

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})


export const removeUser = createAsyncThunk('user/removeUser', async (url) => {
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
                title: "<strong>کاربر با موفقیت حذف شد</strong>",
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
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
            .addCase(removeUser.fulfilled, (state, action) => {
                console.log(state, action);
                if (action.payload.id) {
                    let newUsers = state.filter(user => user._id != action.payload.id)
                    return newUsers
                }
            })
    }
})

export default slice.reducer