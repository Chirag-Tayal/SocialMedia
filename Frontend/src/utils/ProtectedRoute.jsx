/* eslint-disable react/prop-types */
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react'; 
import { UseUserContext } from '../Context/UserContext';

export default function ProtectedRoute({ children }) {
    const { user, setUser } = UseUserContext();

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const res = await axios.get("/auth/get-user", {
                    headers: {
                        Authorization: token
                    }
                });

                if (res.data.success) {
                    setUser(res.data.user);
                } else {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.error('Error getting user:', error);
                toast.error(error.message); 
                <Navigate to='/login' />;
            }
        };

        if (!user) {
            getUser();
        }
    }, [user, setUser]);

    if (localStorage.getItem('token')) {
        return children;
    } else { 
        return <Navigate to='/login' />;
    }
}