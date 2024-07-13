/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./conversation.module.css";  

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const {data} = await axios.post(`/users/user`, {id : friendId});
        if(data.success){ 
        setUser(data.user);
        }
      } catch (err) {
        console.log(err);
      }
    }; 
    getUser();
   
  }, [currentUser, conversation]);

  return (
    <div className={styles.conversation}> 
      <img
        className={styles.conversationImg} 
        src={
          user?.profilePic
            ? `http://localhost:8000/uploads/${user.profilePic}`
            : `https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png`
        }
        alt=""
      /> <span className={styles.conversationName}>{user?.username}</span>  
    </div>
  );
}
