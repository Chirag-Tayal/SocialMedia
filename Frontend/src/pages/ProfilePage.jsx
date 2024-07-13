import {useState} from "react";
import {UseUserContext} from "../Context/UserContext";
import DefaultLayout from "../components/DefaultLayout"
import style from '../styles/page.module.css';
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {

    const {user} = UseUserContext()
    const [image,
        setImage] = useState('')
    const [imagePreview,
        setImagePreview] = useState('');
    const [email,
        setemail] = useState(user
        ?.email)
    const [password,
        setpassword] = useState('')

    const handleImageChange = async(e) => {

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
            const {data} = await axios.post('/upload', formData)
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

    const handelPostUpload = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/users/${user
                ?._id}`, {
                profilePic: image,
                userId: user
                    ?._id,
                email: email,
                password: password
            })
            if (data.success) {
                toast.success(data.message)
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
            <div className={style.ProfileContainer}>
                <h1>Profile</h1>
                <div className={style.profileBody}>

                    <div className={style.profilePic}>
                        {imagePreview
                            ? (<img src={imagePreview} alt="profile"/>)
                            : (<img
                                src={user
                                ?.profilePic
                                    ? `http://localhost:8000/uploads/${user.profilePic}`
                                    : '/placeholder-image.jpg'}
                                alt="profile"/>)}
                        <label>{user
                                ?.profilePic
                                    ? "Change Profile Picture "
                                    : "Add Profile Picture"}</label>
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)}/>

                    </div>
                    <form>
                        <label>Email:
                            <input
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                placeholder="Update Email"/></label>
                        <label>update password :
                            <input
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder=" Update Password"/></label>
                        <button onClick={handelPostUpload}>Update</button>
                    </form>

                </div>
            </div>
        </DefaultLayout>
    )
}

export default ProfilePage