import style from '../styles/component.module.css';
// import { Link } from 'react-router-dom';
// import FriendList from './FriendList';

const menuLink=[
  {
    id:1,
    name:"Home",
    path:"/home"
  },
  {
    id:2,
    name:"My Post",
    path:"/Post/:username"
  },
  {
    id:3,
    name:"Post Post",
    path:"/add-Post"
  },
  {
    id:4,
    name:"Profile",
    path:"/profile/:username"
  },
  {
    id:5,
    name:"chat",
    path:"/chat"
  },
  {
    id:6,
    name:"Threads",
    path:"/thread"
  },
]


const SideBar = () => {
  return (
    <div className={style.p}>
    <div className={style.wrapper}>
    <ul className={style.itemList}>
           {
            menuLink.map((item)=>(<li key={item._id} ><Link to={item.path}>{item.name}</Link></li>))
           }
        </ul>
        <button> show more</button>
        <hr style={{color:"black", margin:"20px 0"}}/>
        {/* <FriendList title="Friends list"/> */}
    </div>
    </div>
  )
}

export default SideBar