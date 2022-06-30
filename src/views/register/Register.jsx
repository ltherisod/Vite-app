import React  from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { erroresFirebase } from '../../utils/erroresFirebase'
import FormErrors from '../../components/Errors/FormErrors'

const Register = () => {
    const {registerUser }= useUser()
    const navigate = useNavigate()
    const {register, handleSubmit, getValues, setError, formState:{errors} }=useForm()

    const onSubmit = async ({email, password}) => {
        try{
            await registerUser(email, password)
            navigate('/')
        }catch(error){
                setError('firebase',{
                    message: erroresFirebase(error.code) 
            })
        }
    }

  return (
    <div>
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormErrors error={errors.firebase}/>
            <input type="email" placeholder='ingrese su e-mail' {...register('email', {required:{
                value:true,
                message:'Por favor ingrese su email'}})}/>
                <FormErrors error={errors.password}/>
            <input type='password' placeholder='contraseña' {...register('password', {minLength:{
                value:6,
                message:'Minimo 6 caracteres'
            }})} />
            <FormErrors error={errors.repassword}/>
            <input type='password' placeholder='contraseña' {...register('repassword', {
                validate:{
                    equals:value => value === getValues('password') || 'Las contraseñas deben ser iguales' ,
                }
            })} />
            <input type='submit' />
        </form>
    </div>

  )
}

export default Register