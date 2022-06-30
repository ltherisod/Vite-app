export const erroresFirebase = (code) => {
    switch(code) {
        case "auth/email-already-in-use":
            return "Usuario ya registrado";
        case "auth/invalid-email":
            return "Formato email no válido"
        default:
            return "Ocurrió un error inesperado"
    }
}