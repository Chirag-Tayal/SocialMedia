import style from '../styles/auth.module.css'
import banner from '../assets/homebanner.svg'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import { useState } from 'react'; 
import axios from 'axios' 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate()
 
  const handleSubmit = async (e) => {
      e.preventDefault(); 

      if(  !email || !password  )
      {
        toast('All fields are required');
        return;
    } 

        
      try { 
          const {data} = await axios.post('/auth/login', {
             email, password
          });  
          if(data.success){
            
            toast(data.message)
            localStorage.setItem('token',data.token)
            navigate('/')
          }else{
            toast(data.message)
          } 
          setEmail('');
          setPassword(''); 
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
            <h5>LOGIN</h5>
            <form onSubmit={handleSubmit}>
                 
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
               <button type='submit'>LOGIN</button>
                </form>
                <p><Link to='/register'>Register</Link></p>
            </div>
            
        </div>
    )
}

export default LoginPage