import React, { useState } from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Register = () => {
    // const [email, setEmail]= useState()
    // const [password, setPassword]= useState()
    const {registerUser }= useUser()
    const navigate = useNavigate()
    const {register, handleSubmit, getValues, setError, formState:{errors} }=useForm()
    // const onSubmit = data => console.log(data)

    const onSubmit = async ({email, password}) => {
        console.log(email, password)
        try{
            await registerUser(email, password)
            navigate('/')
        }catch(error){
            console.log(error.code)
            if(error.code === 'auth/email-already-in-use'){
                setError('email',{type:'custom', message:'Usuario ya registrado'})
            }
        }
    }

  return (
    <div>
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder='ingrese su e-mail' {...register('email', {required:{
                value:true,
                message:'Por favor ingrese su email'}})}/>
            {errors.email && <small>{errors.email.message}</small> }
            <input type='password' placeholder='contraseña' {...register('password', {minLength:{
                value:6,
                message:'Minimo 6 caracteres'
            }})} />
            {errors.password && <small>{errors.password.message}</small>}
            <input type='password' placeholder='contraseña' {...register('repassword', {
                validate:{
                    equals:value => value === getValues('password') || 'Las contraseñas deben ser iguales' ,
                }
            })} />
            {errors.repassword && <small>{errors.repassword.message}</small>}
            <input type='submit' />
        </form>
    </div>

  )
}

export default Register