import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { formValidaciones } from '../../utils/formValidaciones'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/FormInput/FormInput'
import FormErrors from '../../components/Errors/FormErrors'


const LogIn = () => {
    const {logInUser}= useUser()
    const navigate = useNavigate()
    const {required, minLength } = formValidaciones()
    const {register, handleSubmit, setError, formState:{errors} }=useForm()
    
    const onSubmit = async ({email, password}) => {
        try{
            await logInUser(email, password)
            navigate('/')
        }catch(error){
            const {code, message} = errorsFirebase(error)
            setError(code, {message})
        } 
        
    }
  return (
    <div>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput type="email" placeholder='ingrese su e-mail' {...register('email', {required})}>
                <FormErrors error={errors.email}/>
            </FormInput>
            <FormInput type='password' placeholder='contraseña' {...register('password',{minLength} )}>
                <FormErrors error={errors.password}/>
            </FormInput>
            <button type="submit">Log in</button>
        </form>
    </div>
  )
}

export default LogIn