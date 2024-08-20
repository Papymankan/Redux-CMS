import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import SideBar from './Components/SideBar/SideBar'

export default function App() {
  return (
    <>
      <NavBar />
      <div className="container px-0">
        <main className='main'>
          <div className="row justify-content-between mx-0">
            <SideBar />
          </div>
        </main>
      </div>
    </>
  )
}
