import style from './component.module.css';
const FriendList = ({title}) => {
    return (
        <div className={style.FriendListContainer}>
            <h3>{title}</h3>
            <div className={style.content}>

            <ul className={style.friendList}>
            <li><img src='https://placehold.co/30x30' alt="profie"/> <span>User Name</span></li>
            <li><img src='https://placehold.co/30x30' alt="profie"/> <span>User Name</span></li>
            <li><img src='https://placehold.co/30x30' alt="profie"/> <span>User Name</span></li>
         
              
        </ul>
            </div>
        </div>
    )
}

export default FriendList