/* eslint-disable react/prop-types */
  import { Link } from 'react-router-dom';
import style from './component.module.css';
import { UseUserContext } from '../Context/UserContext';
import { useEffect, useState } from 'react';

const PeopleComponent = ({item,is}) => {

    const {user} = UseUserContext()
    const [isFriend, setisFriend] = useState(false)
    const img= `http://localhost:8000/uploads/${item?.profilePic}`

    useEffect(()=>{
        setisFriend(user?.friends.includes(item?._id))
      },[user?._id])
      
  return ( 
        <div className={style.peopleComponent}>
            <div className={style.left}>
                {item?.profilePic ? <img src={img} alt='pic' /> :<img src='https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png' alt='pic' /> }
                {is && <Link to={`/people/${item?._id}`} >Visit Profile</Link>}
            </div>
            <div className={style.right}>
            <p><b>username</b>: {item?.username}</p>
            <p><b>email</b>: {item?.email}</p>
           {isFriend && <button>Friend</button>}
            </div>
        </div> 
  )
}

export default PeopleComponent