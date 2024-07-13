import style from '../styles/component.module.css';
import InputPost from './InputPost';
import Post from './post';
import Share from './share';

const Feed = () => {
  return (
    <div  className={style.feedContainer}>
    <div className={style.wrapper}>
    <InputPost/>
    <Share/>  


    </div></div>
  )
}

export default Feed