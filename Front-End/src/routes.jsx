import React from "react"
import Users from './pages/Users/Users'
import Courses from './pages/Courses/Courses'

export default [
    {path:'/' , element:<Users/>},
    {path:'/users' , element:<Users/>},
    {path:'/courses' , element:<Courses/>},
]