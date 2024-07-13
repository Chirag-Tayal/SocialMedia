import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import axios from 'axios';
import AddPost from './pages/AddPost';
import  { Toaster } from 'react-hot-toast';
import MyPosts from './pages/MyPosts';
import ProtectedRoute from './utils/ProtectedRoute';
import Threads from './pages/Threads';
import SingleThreads from './pages/SingleThreads';
import Peoples from './pages/Peoples'
import SinglePeople from './pages/SinglePeople';
import Friends from './pages/Friends';
import ChatPage from './pages/ChatPage';
import SinglePost from './pages/SinglePost';

axios.defaults.baseURL ='http://localhost:8000/api'

function App() {
  return ( 
        <>
      <Routes><Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/profile/:username' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/chat'  element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
        <Route path='/thread' element={<ProtectedRoute><Threads /></ProtectedRoute>} /> 
        <Route path='/thread/:id' element={<ProtectedRoute><SingleThreads /></ProtectedRoute>} /> 
        <Route path='/post/:username' element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
        <Route path='/add-post' element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
        <Route path='/people' element={<ProtectedRoute><Peoples /></ProtectedRoute>} />
        <Route path='/people/:id' element={<ProtectedRoute><SinglePeople /></ProtectedRoute>} />
        <Route path='/friends' element={<ProtectedRoute><Friends /></ProtectedRoute>} />
        <Route path='/singlepost/:id' element={<ProtectedRoute><SinglePost /></ProtectedRoute>} />
        
        <Route path="*" element={<Navigate to="/" />} />
      
      </Routes> 
          <Toaster/>
      </>
  );
}



export default App;
 

{/* <Router>crea
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch> */}
    {/* </Router> */}

//     Primary Color:

// Light Blue: #6FC1FF 

// Gray: #CCCCCC 

// Dark Blue: #2E4057 
// White: #FFFFFF 
// Dark Gray: #333333