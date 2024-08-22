import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../store";

export const fetchUsers = createAsyncThunk('user/fetchUsers', async (url) => {
    return fetch(url).then(res => res.json()).then(data => data)
})


export const removeUser = createAsyncThunk('user/removeUser', async (url) => {
    console.log(url);
    return fetch(url, { method: 'DELETE' }).then(res => {
        console.log(res);
        if(res.ok){
            store.dispatch(fetchUsers('https://redux-cms.iran.liara.run/api/users'))
        }
        return res.json()
    }).then(data => {
        console.log(data);
        return data
    })
})

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload)
        .addCase(removeUser.fulfilled , (state , action)=>{
            console.log(state ,action);
        })
    }
})

export default slice.reducer