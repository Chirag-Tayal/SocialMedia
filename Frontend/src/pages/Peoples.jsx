import {useEffect, useState} from "react";
import DefaultLayout from "../components/DefaultLayout"
import style from '../styles/page.module.css';
import axios from "axios";
import toast from "react-hot-toast";
import PeopleComponent from "../components/PeopleComponent";
 
const Peoples = () => {

    const [allUsers,
        setAllUsers] = useState([]);

    const getAllUsers = async() => {
        try {
            const {data} = await axios.get('/users/allusers',{
              headers: {
                  Authorization: localStorage.getItem('token')
              }
          });
            if (data.success) {
                toast.success(data.message);
                setAllUsers(data.users);
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
                <h2>ALL USERS</h2>
                <div className={style.PeopleBody}>
                   {
                    allUsers.map((i)=>(<PeopleComponent is={true}   key={i?._id} item={i} />))
                   }
                   {
                    allUsers.length === 0 && <div> <p>Currently, There are no users.</p>
                 </div>
                }
                </div>
            </div>

        </DefaultLayout>
    )
}

export default Peoples