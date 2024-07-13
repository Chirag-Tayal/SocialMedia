/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState,  useRef } from "react"; 
import { io } from "socket.io-client";
import styles from '../styles/messenger.module.css'
import { UseUserContext } from "../Context/UserContext";
import Conversation from "../components/Conversation";
import DefaultLayout from '../components/DefaultLayout';
import toast from 'react-hot-toast';
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null); 
  const socket = useRef();
  const { user } = UseUserContext();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", {id : user?._id});
   
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversation/${user?._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <> 
   <DefaultLayout>
   <div className={styles.messenger}>
        <div className={styles.chatMenu}>
          <div className={styles.chatMenuWrapper}> 
 
          <FriendInput friends={user?.friends} />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chatBox}>
     
          <div className={styles.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={styles.chatBoxTop}>
                  {messages.map((m, index) => (
                    <div key={index} ref={scrollRef}> 
                    {/* <p>{user?._id}</p>  <p>{m.sender}</p> */}
                      <Message message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                </div>
                <div className={styles.chatBoxBottom}>
                  <textarea
                    className={styles.chatMessageInput}
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className={styles.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={styles.noConversationText}>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div> 
      </div>
   </DefaultLayout>
    </>
  );
}






function Message({ message, own }) {
  return (
    <>
      {
        own ? (<div className={styles.messageOwn}>
      <div className={styles.messageTop}>
 
     
        <img
          className={styles.messageImg}
          src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
          alt=""
        />
        <p className={styles.messageText}>{message?.text}</p>
      </div>
      <div className={styles.messageBottom}>{message?.createdAt}</div>
    </div>) : (<div className={styles.message}>
      <div className={styles.messageTop}> 
        <img
          className={styles.messageImg}
          src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
          alt=""
        />
        <p className={styles.messageText}>{message?.text}</p>
      </div>
      <div className={styles.messageBottom}>{message?.createdAt}</div>
    </div>)
      }
    </>
    
  );
}


const FriendInput = ({ friends }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const {user} = UseUserContext()

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue); 
    const filteredFriends = friends.filter((friend) =>
      friend.username.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredFriends);
  };

  const StartChat=async(id)=>{
    console.log('reciver id : ', id);
    console.log('sender id : ', user?._id);
 
      try {
        const {data} = await axios.post(`/conversation`, {
          "senderId": user?._id, 
          "receiverId":id
      });
        if(data.success){  
       toast(data.message)
        }else{
          toast(data.message)
        }
      } catch (err) {
        toast(err.message)
        console.log(err);
      }
    }; 

 

  return (
    <div  className={styles.StartChat}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search for friends..."
      />
      <ul>
        {suggestions.map((friend) => (
          <li key={friend._id} onClick={()=>StartChat(friend._id)} >{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};
 


