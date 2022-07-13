export const formValidaciones = (getValues) => {
    return{
        required:{
            value:true,
            message:'Campo obligatorio'},
            minLength:{
                value:6,
                message:'Minimo 6 caracteres'
            },
            validateEquals(value){
                return{
                    equals:v => v === value || 'Las contraseñas deben ser iguales' ,
                }
            }
    }
}