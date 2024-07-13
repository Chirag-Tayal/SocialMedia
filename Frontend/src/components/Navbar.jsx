import { UseUserContext } from '../Context/UserContext'
import style from './component.module.css'
const Navbar = () => {

  const {user} = UseUserContext()
  return (
    <div className={style.navbar}>
    <h1>gosocial</h1>
    <img
                                src={user
                                ?.profilePic
                                    ? `http://localhost:8000/uploads/${user.profilePic}`
                                    : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png'}
                                alt="profile"/> 
    </div>
  )
}

export default Navbar