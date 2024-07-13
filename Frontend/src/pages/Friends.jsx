import {useEffect, useState} from "react";
import DefaultLayout from "../components/DefaultLayout"
import style from '../styles/page.module.css';
import axios from "axios";
import toast from "react-hot-toast";
import PeopleComponent from "../components/PeopleComponent";
import { Link } from "react-router-dom";

const Friends = () => {
    const [allUsers,
        setAllUsers] = useState([]);

    const getAllUsers = async() => {
        try {
            const {data} = await axios.get('/users/friends',{
              headers: {
                  Authorization: localStorage.getItem('token')
              }
          });
            if (data.success) {
                toast.success(data.message);
                setAllUsers(data.friends);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error in getting users:', error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (allUsers.length === 0) {
            getAllUsers();
        }
    }, [allUsers.length]);
    return (
        <DefaultLayout>
            <div className={style.PeoplePageContainer}>
                <h2>MY FRIENDS</h2>
                <div className={style.PeopleBody}>
                {
                    allUsers.length === 0 && <div> <p>Currently, you have no friends.</p>
                    <Link to='/people'>ALL USERS PAGE</Link> </div>
                }
                   {
                    allUsers.map((i)=>(<PeopleComponent is={true} key={i?._id} item={i} />))
                   }
                </div>
            </div>

        </DefaultLayout>
    )
}
export default Friends