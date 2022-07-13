import React  from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { errorsFirebase } from '../../utils/FirebaseError'
import FormErrors from '../../components/Errors/FormErrors'
import { formValidaciones } from '../../utils/formValidaciones'
import FormInput from '../../components/FormInput/FormInput'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'

const Register = () => {
    const {registerUser }= useUser()
    const navigate = useNavigate()
    const {register, handleSubmit, getValues, setError, formState:{errors} }=useForm()
    const {required, minLength, validateEquals} = formValidaciones()

    const onSubmit = async ({email, password}) => {
        try{
            await registerUser(email, password)
            navigate('/')
        }catch(error){
            const {code, message} = errorsFirebase(error)
            setError(code, {message})
        }
    }

  return (
    <div>
        <Title text="Crea tu cuenta"/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormErrors error={errors.firebase}/>
            <FormInput type="email" placeholder='email@email.com' {...register('email', {required})} label="Ingrese su e-mail" error={errors.email}>
                <FormErrors error={errors.email}/>
            </FormInput>
            <FormInput type='password' placeholder='contraseña' {...register('password',{minLength} )} label="Ingrese su contraseña" error={errors.password}>
                <FormErrors error={errors.password}/>
            </FormInput>
            <FormInput type='password' placeholder='contraseña' {...register('repassword', {
                validate:validateEquals(getValues("password"))
            })} label="Repita su contraseña" error={errors.repassword}>
                <FormErrors error={errors.repassword}/>
            </FormInput>
            <Button type="submit" text="Registrarse"/>
        </form>
    </div>

  )
}

export default Register