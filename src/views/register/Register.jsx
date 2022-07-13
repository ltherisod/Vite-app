import React  from 'react'
import { useUser } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { errorsFirebase } from '../../utils/FirebaseError'
import FormErrors from '../../components/Errors/FormErrors'
import { formValidaciones } from '../../utils/formValidaciones'
import FormInput from '../../components/FormInput/FormInput'

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
        <h1>Registrar</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormErrors error={errors.firebase}/>
            <FormInput type="email" placeholder='ingrese su e-mail' {...register('email', {required})}>
                <FormErrors error={errors.email}/>
            </FormInput>
            <FormInput type='password' placeholder='contraseña' {...register('password',{minLength} )}>
                <FormErrors error={errors.password}/>
            </FormInput>
            <FormInput type='password' placeholder='contraseña' {...register('repassword', {
                validate:validateEquals(getValues)
            })}>
                <FormErrors error={errors.repassword}/>
            </FormInput>
            <button type="submit">Register</button>
        </form>
    </div>

  )
}

export default Register