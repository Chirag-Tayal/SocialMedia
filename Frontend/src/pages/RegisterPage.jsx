import style from '../styles/auth.module.css'
import banner from '../assets/homebanner.svg'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useState } from 'react'; 
import axios from 'axios'
const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const navigate= useNavigate()
 
  const handleSubmit = async (e) => {
      e.preventDefault(); 

      if(!username || !email || !password || !confirmPassword)
      {
        toast('All fields are required');
        return;
    } 

      if (password !== confirmPassword) {
          toast('Passwords do not match');
          return;
      } 
      try { 
          const {data} = await axios.post('/auth/register', {
            username, email, password
          });  
          if(data.success){
            navigate('/')
            toast(data.message)
            localStorage.setItem('token',data.token)
          }else{
            toast(data.message)
          }
          setUsername('');
          setEmail('');
          setPassword('');
          setConfirmPassword(''); 
      } catch (error) {
          console.error('Error registering user:', error);  
      }
  };
    return (
        <div className={style.registerContainer}>
            <div className={style.left}>
                <img src={banner} alt='banner ' />
            </div>
            <div className={style.right}>
            <h1>gosocial</h1>
            <h5>REGISTER</h5>
            <form onSubmit={handleSubmit}>
                <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
               <button type='submit'>REGISTER</button>
                </form>
                <p><Link to='/login'>Login</Link></p>
            </div>
            
        </div>
    )
}

export default RegisterPage