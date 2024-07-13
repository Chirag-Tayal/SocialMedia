// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import PostComponent from '../components/PostComponent';
import style from '../styles/post.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
const MyPosts = () => {

    const { username } = useParams(); 
    
  

    const [myPosts, setmyPosts] = useState([])


  const getAllPosts= async ()=>{ 
      try {
          const { data } = await axios.get(`/posts/all-posts/${username}`)
          if (data.success) {

            console.log(data);
            toast(data.message)
            setmyPosts(data.posts)
          } else { 
              toast.error(data.message)
          }
      } catch (error) { 
          console.error('Error in getting user:', error)
          toast.error(error.message)
      }
  }

  useEffect(()=>{

    if(myPosts.length === 0){
        getAllPosts()
    }

  },[myPosts.length])
  
  return (
    <DefaultLayout>
    <div className={style.myPostContainer}>
    <h1>{username} Post</h1>
    <div className={style.myPostBody}> 
       {
        myPosts.map((post)=>(<PostComponent post={post} key={post._id} />))
       }
    </div>
    </div></DefaultLayout>
  )
}

export default MyPosts