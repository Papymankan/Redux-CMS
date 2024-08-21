import {configureStore} from '@reduxjs/toolkit'
import UsersReducer from './Reducer/Users'
import CoursesReducer from './Reducer/courses'
import ArticlesReducer from './Reducer/articles'

export default configureStore({
    reducer:{
        users:UsersReducer,
        courses:CoursesReducer,
        articles:ArticlesReducer,
    }
})

