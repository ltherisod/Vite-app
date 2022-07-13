import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { formValidaciones } from '../../utils/formValidaciones'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/FormInput/FormInput'
import FormErrors from '../../components/Errors/FormErrors'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import { errorsFirebase } from '../../utils/FirebaseError'


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
        <Title text="Log In"/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput type="email" placeholder='email@email.com' {...register('email', {required})} label="Ingrese su e-mail" error={errors.email}>
                <FormErrors error={errors.email}/>
            </FormInput>
            <FormInput type='password' placeholder='contraseña' {...register('password',{minLength} )} label="Ingrese su contraseña" error={errors.password}>
                <FormErrors error={errors.password}/>
            </FormInput>
            <Button type="submit" text="Log in"/>
        </form>
    </div>
  )
}

export default LogIn