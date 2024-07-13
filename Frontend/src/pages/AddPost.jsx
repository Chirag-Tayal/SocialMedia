import { useState } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import style from '../styles/post.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from '../Context/UserContext';

const AddPost = () => {
    const { user} = UseUserContext();
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState('') 
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
 

    const handleImageChange = async (e) => { 
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        try {
            const { data } = await axios.post('/upload', formData)
            if (data.success) {
                setImage(data.fileName) 
            } else { 
                toast.error(data.message)
            }
        } catch (error) { 
            console.error('Error uploading image:', error)
            toast.error(error.message)
        }
    };

    const handelPostUpload = async (e) => {
        e.preventDefault();
        if (!image || !description) {
            toast.error("All the fields are required")
            return;
        }
        try {
            const { data } = await axios.post('/posts', {
                img: image,
                desc: description,
                userId: user?._id
            })
            if (data.success) {
                toast.success(data.message)
                navigate('/')
            } else { 
                toast.error(data.message)
            }
        } catch (error) { 
            console.error('Error uploading image:', error)
            toast.error(error.message)
        }
    }

    return (
        <DefaultLayout>
            <div className={style.addPostContainer}>
                <h1>Add Post</h1> 
                <div className={style.addPostBody}>
                    <form>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                        />  
                        <textarea 
                            placeholder="Description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button onClick={handelPostUpload}>POST</button>
                    </form>
                    <div className={style.addImage}>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className={style.imagePreview} />
                        )}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AddPost;
