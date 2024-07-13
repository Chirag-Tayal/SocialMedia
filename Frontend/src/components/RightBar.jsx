import style from '../styles/component.module.css';
import FriendList from './FriendList';

const RightBar = () => {
    return (
        <div className={style.rightBarContainer}>
            <div className={style.wrapper}>
            <div  className={style.birthday}>
            <img src='https://placehold.co/300x300' alt='share top '/>
            <span>Post text andd 15 other people share thier birhthday day todayy tadaa.</span>
            </div>
            <img className={style.advertisment} src='https://placehold.co/100x100' alt='share top '/>
            <FriendList title="Active friends list"/>
            </div>
        </div>
    )
}

export default RightBar