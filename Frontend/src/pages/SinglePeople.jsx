import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import style from '../styles/page.module.css';
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { UseUserContext } from "../Context/UserContext";
import PeopleComponent from "../components/PeopleComponent";

const SinglePeople = () => {
  const { user } = UseUserContext();
  const [people, setPeople] = useState(null);
  const { id } = useParams();
  const [isFriend, setIsFriend] = useState(false);

  const getUser = async () => {
    try {
      const { data } = await axios.post('/users/user', { id }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (data.success) {
        setPeople(data.user);
        setIsFriend(user?.friends.includes(data.user?._id));
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error in getting user:', error);
      toast.error('Failed to fetch user information');
    }
  };

  useEffect(() => {
    if (!people) {
      getUser();
    }
  }, [id]);

  const img = people?.profilePic ? `http://localhost:8000/uploads/${people.profilePic}` : 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png';

  const handleAddFriendAction = async () => {
    try {
      const { data } = await axios.put(`/users/${people?._id}/follow/`, {
        userId: user?._id
      });
      if (data.success) {
        toast.success(data.message);
        setIsFriend(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error Adding Freind:', error);
      toast.error('Failed to Add Freind. Please try again.');
    }
  };

  const handleRemoveFriendAction = async () => {
    try {
      const { data } = await axios.put(`/users/${people?._id}/unfollow`, {
        userId: user?._id
      });
      if (data.success) {
        toast.success(data.message);
        setIsFriend(false); // Update the state to indicate that the user is no longer a friend
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Failed to unfollow user. Please try again.');
    }
  };

  return (
    <DefaultLayout>
      <div className={style.SinglePeople}>
        <h1>{people?.username}</h1>
        <div className={style.Top}>
          <img src={img} alt='Profile Pic' />
          <div>
            <p><b>Email:</b> {people?.email}</p>
            {!isFriend ? 
              <button className={style.bbtn} onClick={handleAddFriendAction}>Add Friend</button> : 
              <button className={style.bbtn} onClick={handleRemoveFriendAction}>Remove Friend</button>}
            {isFriend && <button className={style.bbtn}>Friend</button>}
          </div>
        </div>
        <div className={style.body}>
          <h2>Friends</h2>
          {people?.friends.length === 0 ? 
            <div><p>Currently, user has no friends.</p></div> :
            people?.friends.map(friend => (
              <PeopleComponent is={false} key={friend._id} item={friend} />
            ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SinglePeople;
