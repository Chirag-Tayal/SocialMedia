/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import style from '../styles/thread.module.css'; 
import DefaultLayout from '../components/DefaultLayout';
import { UseUserContext } from '../Context/UserContext';
import { MdDelete } from "react-icons/md";


const Threads = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [discussionList, setDiscussionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = UseUserContext();

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const res = await axios.get('/threads/discussions');
                if (res.data.success) {
                    toast.success(res.data.message);
                    setDiscussionList(res.data.discussions);
                } else {
                    toast.error("Failed to fetch discussions. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to fetch discussions. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussions();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !body) {
            toast.error("Enter all the fields!");
            return;
        }

        try {
            const res = await axios.post('/threads/discussions', {
                title,
                text: body,
                author: user?.username
            });
            if (res.data.success) {
                toast.success("Discussion created successfully!");
                setDiscussionList((prevList) => [res.data.discussion, ...prevList]);
                setTitle('');
                setBody('');
            } else {
                toast.error("Failed to create discussion. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to create discussion. Please try again.");
        }
    };

    const handleDeleteThread=async(id)=>{
        try {
            const res = await axios.post('/threads/delete', {
               id
            });
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.message);
        }
    }

    return (
        <DefaultLayout>
            <div className={style.discussionContainer}>
                <div className={style.discussionForm}>
                    <h1>Create a Thread</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={style.inputField}
                        />
                        <textarea
                            placeholder='Body'
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className={style.textArea}
                        />
                        <button type="submit" className={style.submitButton}>Submit</button>
                    </form>
                </div>
                <div className={style.discussionList}>
                    <h1>All Threads</h1>
                    {loading ? (
                        <p>Loading discussions...</p>
                    ) : (
                        discussionList.map((topic) => (
                            <div key={topic._id}> <Link to={`/thread/${topic._id}`} key={topic._id} className={style.discussionLink}>
                                <h3>{topic.title}</h3>  
                            </Link>
                            <h3 onClick={()=>handleDeleteThread(topic._id)} style={{float:'right'}}><MdDelete/></h3>
                            </div>
                        ))
                    )}
                    {
                        discussionList.length === 0 && <p>As of now there are no threads available.</p>
                    }
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Threads;
