import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
  }

const slice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toDark: (state) => {
            state.mode = 'dark'
        },
        toLight: (state) => {
            state.mode = 'light'
        }
    },
})

export const { toDark, toLight } = slice.actions

export default slice.reducer