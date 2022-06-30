import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import UserProvider, { useUser }  from './context/UserContext'
import Home from './views/home/Home'
import LogIn from './views/logIn/LogIn'
import Auth from './components/Auth/Auth'
import Register from './views/register/Register'

function App() {
const{ user }= useUser()

if(user === false){
  return <p>Loading...</p>
}
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={
          <Auth>
            <Home/>
          </Auth>
        }/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
