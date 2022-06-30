import {NavLink} from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const Nav = () => {
    const {user, signOutUser} = useUser()
    const handleLogOut = async () => {
        try{
            await signOutUser()
        }catch(error){
            console.log(error.code)
        }


    }
  return (
    <div>
       {user 
       ? <>
        <NavLink to='/'>Home</NavLink>
        <button onClick={handleLogOut}>Sign out </button>
        </>

        :<>
        <NavLink to='/login'>Log In </NavLink>
        <NavLink to='/register'>Register </NavLink>
        </>}
    </div>
  )
}

export default Nav