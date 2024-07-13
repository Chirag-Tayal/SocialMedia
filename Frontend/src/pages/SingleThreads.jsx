import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import style from '../styles/thread.module.css'; 
import DefaultLayout from '../components/DefaultLayout';
import { UseUserContext } from '../Context/UserContext';

const SingleThreads = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [replyText, setReplyText] = useState(''); 

    const { user } = UseUserContext();

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const res = await axios.post('/threads/discussions/single', { id }); 
                if (res.data.success) {
                    setDiscussion(res.data.discussion);
                    toast(res.data.message);
                } else {
                    console.error('Failed to fetch discussion:', res.data.message);
                    toast.error('Failed to fetch discussion. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching discussion:', error);
                toast(error.message)
                toast.error('Error fetching discussion. Please try again.');
            }
        };
        fetchDiscussion();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) {
            toast.error('Reply text is required.');
            return;
        }

        try {
            const res = await axios.post('/threads/reply', {
                id: id,
                text: replyText,
                author:user?.username
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setReplyText(''); 
                setDiscussion(res.data.discussion); 
            } else {
                toast.error('Failed to post reply. Please try again.');
            }
        } catch (error) {
            console.error('Error posting reply:', error);
            toast(error.message)
            toast.error('Failed to post reply. Please try again.');
        }
    };

    return (
        <DefaultLayout>
            <div className={style.singleDiscussionContainer}>
            <div className={style.discussionOutput}>
                <h2>Title : {discussion?.title}</h2>
                <p><b>Message</b>:{discussion?.text}</p>
                <div>
                <p><b>Author:</b> {discussion?.author}</p>
                        <p><b>Created at : </b> {discussion?.createdAt}</p>
                        </div>
            </div>
            <div className={style.replyContainer}>
                <h2>Replies</h2>
                {discussion?.replies?.length === 0 && <p>No replies yet.</p>}
                {discussion?.replies?.map((reply) => (
                    <div key={reply._id} className={style.replyItem}>
                        <p><b> {reply?.author} :</b> {reply.text}</p>
                        <div> 
                        <p><b>Created at: </b>{reply.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={style.replyForm}>
                <h2>Post a Reply</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        required
                        className={style.textArea}
                    ></textarea>
                    <button className={style.submitButton} type="submit">Reply</button>
                </form>
            </div> 
        </div>
        </DefaultLayout>
    );
};


export default SingleThreads