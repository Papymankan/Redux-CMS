import {configureStore} from '@reduxjs/toolkit'
import UsersReducer from './Reducer/users'
import CoursesReducer from './Reducer/courses'
import ArticlesReducer from './Reducer/articles'
import CategoriesReducer from './Reducer/categories'

export default configureStore({
    reducer:{
        users:UsersReducer,
        courses:CoursesReducer,
        articles:ArticlesReducer,
        categories:CategoriesReducer
    }
})

