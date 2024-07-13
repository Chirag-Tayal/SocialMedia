import { MdPermMedia } from "react-icons/md";
import style from '../styles/component.module.css';
import { CiHashtag } from "react-icons/ci";
import { FaLocationArrow } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";


const Share = () => {
  return (
    <div className={style.shareContainer}>
    <div className={style.wrapper}>
    <div className={style.shareTop}>
      
      <img src='https://placehold.co/300x300' alt='share top '/>
      <input type='text' placeholder='whats in your mind?' />
    </div>
    <hr />
    <div className={style.shareBottom}>
      <div className={style.shareOptions}>
        <div className={style.shareOption}>
        <MdPermMedia/>

        <span> Photo or video</span>

        </div>
        <div className={style.shareOption}>
        <CiHashtag/>

        <span> tag</span>

        </div>
        <div className={style.shareOption}>
        <FaLocationArrow/>

        <span>Location</span>

        </div>
        <div className={style.shareOption}>
        <MdEmojiEmotions/>

        <span> Feelings</span>

        </div>

      </div>
      <button>Share</button>
      </div>
    </div> 
    </div>
  )
}

export default Share