import style from '../styles/component.module.css';
import { CiSearch } from "react-icons/ci";
import { MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoPerson } from "react-icons/io5";


const TopBar = () => {
  return (
    <div className={style.topBarContainer}>
    <div className={style.left}> S-oo-cial</div>
    <div className={style.center}><div><input type='text' placeholder='Search...' /> <CiSearch/></div></div>
    <div className={style.right}> 
        <div className={style.links}>
            <a> Home </a>
            <a> Timeline</a>
        </div>
        <div className={style.icons}>
            <span><IoPerson/><sup>2</sup></span>
            <span><MdMessage/><sup>1</sup></span>
            <span><IoIosNotifications/><sup>2</sup></span> 
        </div>
        <img src='https://placehold.co/30x30' alt='profile' />
    </div>
    </div>
  )
}

export default TopBar