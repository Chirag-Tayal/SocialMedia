import { Link, useLocation } from 'react-router-dom';
import FriendList from './FriendList';
import style from './component.module.css';
import { UseUserContext } from '../Context/UserContext';



const Menu = () => {

    const location = useLocation()
    const { user} = UseUserContext();
    const handelActive=(path)=>{
        return location.pathname === path ? 'active' : '';
    }

    const menuLink = [
      {
        id: 1,
        name: "Home",
        path: "/"
      },
      {
        id: 2,
        name: "My Posts",
        path: `/post/${user?.username}`
      },
      {
        id: 3,
        name: "Add Post",
        path: "/add-Post"
      },
      {
        id: 4,
        name: "Profile",
        path: `/profile/${user?.username}`
      },
      {
        id: 5,
        name: "chat",
        path: "/chat"
      },
      {
        id: 6,
        name: "Threads",
        path: "/thread"
      },
      {
        id: 7,
        name: "Peoples",
        path: "/people"
      },
      {
        id: 8,
        name: "My Friends",
        path: "/friends"
      },
    ];
  return (
    <div className={style.Menu}> 
      <ul className={style.links}>
        {menuLink.map((item) => (
          <li className={handelActive(item.path)} key={item.id}>
            <Link to={item.path} >{item.name}</Link>
          </li>
        ))}
        <li onClick={()=>{
          localStorage.clear()

        }} ><Link to='/login'>Logout</Link></li>
      </ul>
     </div>
  )
}

export default Menu;
