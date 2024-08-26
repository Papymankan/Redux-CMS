import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../store";
import Swal from "sweetalert2";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})


export const removeUser = createAsyncThunk('users/removeUser', async (url) => {
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

export const createUser = createAsyncThunk('users/createUser', async ({ url, user }) => {
    Swal.fire({
        title: "<strong>در حال اضافه کردن ...</strong>",
        icon: "warning",
        showCloseButton: false,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname : user.name,
            lastname:user.lastName,
            username:user.userName,
            email:user.email,
            city:user.city,
            age:user.age
        })
    }).then(res => {
        if (res.ok) {
            Swal.fire({
                title: "<strong>کاربر با موفقیت اضافه شد</strong>",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            })
            store.dispatch(fetchUsers(url))
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
        builder.addCase(fetchUsers.fulfilled, (state, action) => [...action.payload])
            .addCase(removeUser.fulfilled, (state, action) => {
                console.log(state, action);
                if (action.payload.id) {
                    let newUsers = state.filter(user => user._id != action.payload.id)
                    return newUsers
                }
            })
            .addCase(createUser.fulfilled, (state, action) => {
                console.log(state, action);
            })
    }
})

export default slice.reducer