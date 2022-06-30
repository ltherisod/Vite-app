import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'

const LogIn = () => {
    const {logInUser}= useUser()
    const [email, setEmail]= useState()
    const [password, setPassword]= useState()
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await logInUser(email, password)
            navigate('/')
        }catch(error){
            console.log(error)
            alert('ese email o contraseña erroneos')
        }
    }
  return (
    <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='ingrese su e-mail' onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='contraseña' onChange={(e)=>setPassword(e.target.value)}/>
            <input type='submit' />
        </form>
    </div>
  )
}

export default LogIn