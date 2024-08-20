import {configureStore} from '@reduxjs/toolkit'
import UsersReducer from './Reducer/Users'

export default configureStore({
    reducer:{
        users:UsersReducer
    }
})

