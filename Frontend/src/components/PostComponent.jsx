/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import styles from './component.module.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { UseUserContext } from '../Context/UserContext'
import { Link } from 'react-router-dom'

const PostComponent = ({post}) => {

  const {user} = UseUserContext()

  const [isLiked, setisLiked] = useState(false)
  const [likes, setlikes] = useState(post?.likes?.length)
  const img= `http://localhost:8000/uploads/${post?.img}`
 

  const likeHandler = async () => {
    try {
        const { data } = await axios.put(`/posts/${post?._id}/like`, {
            userId: user?._id
        });
        if (data.success) {
            toast.success(data.message);
            setlikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
            setisLiked((prevIsLiked) => !prevIsLiked);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        toast.error(error.message);
    }
};

useEffect(()=>{
  setisLiked(post.likes.includes(user?._id))
},[user?._id, post.likes])


    return (
        <div className={styles.postContainer}>
       <Link to={`/singlepost/${post?._id}`}>
          <img src={img} alt='poohto' />
          </Link>
          <p>{post?.desc.slice(0,22)}...</p>
          <p onClick={likeHandler} className={styles.likes}>❤️: {likes} People has liked your post. </p>
        </div>
      
    )
}

export default PostComponent