import React, { useEffect } from 'react'
import NavBar from './Components/NavBar/NavBar'
import './App.css'
import SideBar from './Components/SideBar/SideBar'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function App() {

  const router = useRoutes(routes)

  const theme = useSelector(state => state.theme.mode)

  useEffect(() => {
    console.log(theme);
    if (theme == 'dark') {
      // document.body.style.backgroundColor = 'var(--secondry-light)'
      document.body.className = 'dark'
    } else {
      document.body.className = ''
      // document.body.style.backgroundColor = 'var(--secondry-light)'
    }
  }, [theme])

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
