import {configureStore} from '@reduxjs/toolkit'
import UsersReducer from './Reducer/Users'
import CoursesReducer from './Reducer/courses'

export default configureStore({
    reducer:{
        users:UsersReducer,
        courses:CoursesReducer
    }
})

