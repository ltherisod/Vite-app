import { useUser } from "../../context/UserContext"
import {Navigate} from 'react-router-dom'
const Auth = ({children}) => {
    const {user} = useUser()

    if(!user){
        return <Navigate to='/login'/>
    }
  return children
}

export default Auth