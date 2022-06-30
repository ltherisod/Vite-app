import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext()

    const UserProvider = ({children}) => {
    const [user, setUser]= useState(false)

    //se revisa si el usuario esta autenticado o no
    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, user =>{
            console.log(user)
            if(user){
                const {email, photoURL, displayName, uid}= user
                setUser({email, photoURL, displayName, uid})
            }else{
                setUser(null)
            }
        })
        return()=> unsuscribe
    },[])
    const registerUser = (email, password)=> createUserWithEmailAndPassword(auth, email, password)
    const logInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const signOutUser = () => signOut(auth) 

    return(
        <UserContext.Provider value={{user, registerUser, logInUser, signOutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider

export const useUser = () => useContext(UserContext)