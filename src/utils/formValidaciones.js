export const formValidaciones = (getValues) => {
    return{
        required:{
            value:true,
            message:'Campo obligatorio'},
            minLength:{
                value:6,
                message:'Minimo 6 caracteres'
            },
            validateEquals(getValues){
                return{
                    equals:value => value === getValues('password') || 'Las contraseñas deben ser iguales' ,
                }
            }
    }
}