import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import SideBar from './Components/SideBar/SideBar'
import routes from './routes'
import {useRoutes} from 'react-router-dom'


export default function App() {

  const router = useRoutes(routes)

  return (
    <>
      <NavBar />
      <div className="container px-0">
        <main className='main'>
          <div className="row justify-content-between mx-0">
            <SideBar />
            {
              router
            }
          </div>
        </main>
      </div>
    </>
  )
}
