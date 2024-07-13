import style from '../styles/component.module.css';
import { IoMdMore } from "react-icons/io";


const Post = () => {
    return (
        <div className={style.postContainer}>
            <div className={style.wrapper}>
                <div className={style.top}>
                    <div className={style.topLeft}>
                    <img src='https://placehold.co/250x250' alt='profile'/>
                    <span className={style.username}>user name</span>
                    <span className={style.createdAt}>10 min ago</span>
                    </div>
                    <div className={style.topRight}>
                    <IoMdMore/>
                    </div>

                </div>
                <div className={style.center}>
                <span className={style.text}>post of the user posted by user.</span>
                <img src='https://placehold.co/320x300' alt='profile'/>
                </div>
                <div className={style.bottom}>
                <div className={style.bottomLeft}>
                <span className={style.counter}>Like </span><span>9 people liked you post</span>
                    
                    </div>
                    <div className={style.bottomRight}>
                    <span className={style.comment}><span>{2}</span> comments</span>
                     
                    </div></div>
               

            </div>
        </div>
    )
}

export default Post