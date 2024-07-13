import toast from 'react-hot-toast';
import DefaultLayout from '../components/DefaultLayout';
import PostComponent from '../components/PostComponent';
import style from '../styles/page.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [todayPosts, setTodayPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllPosts = async () => {
    try {
      const { data } = await axios.get(`/posts/top/ten`);
      if (data.success) {
        setTodayPosts(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching today posts:', error);
      toast.error('Error fetching today posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getAllPostsTillNow = async () => {
    try {
      const { data } = await axios.get(`/posts/all/posts`);
      if (data.success) {
        setAllPosts(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching all posts till now:', error);
      toast.error('Error fetching all posts till now. Please try again later.');
    }
  };

  useEffect(() => {
    getAllPosts();
    getAllPostsTillNow();
  }, []);

  return (
    <DefaultLayout>
      <div className={style.HomeContainer}>
        <h1>Todays Feed</h1>
        {loading && <p>Loading...</p>}
        {!loading && todayPosts.length === 0 && <p>No top posts available for today.</p>}
        <div className={style.HomeBody}>
          {todayPosts.map(post => <PostComponent post={post} key={post._id} />)}
        </div>
        <h1>AllPosts till now</h1>
        {loading && <p>Loading...</p>}
        {!loading && allPosts.length === 0 && <p>No posts available till now.</p>}
        <div className={style.HomeBody}>
          {allPosts.map(post => <PostComponent post={post} key={post._id} />)}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
