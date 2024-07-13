import { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import style from '../components/component.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const SinglePost = () => {
    const {id} = useParams()
    const [postData,
        setpostData] = useState(null)

        useEffect(() => {
            const getMessages = async () => {
              try {
                const res = await axios.get(`/posts/${id}`);
                console.log(res);
                setpostData(res.data);
              } catch (err) {
                console.log(err);
              }
            };
          if(postData === null){
            getMessages();
          }
          }, [postData]);

          const img= `http://localhost:8000/uploads/${postData?.img}`
    return (
        <DefaultLayout> 
            <div className={style.singlePostComponent}>
            <h1>POST</h1>
            <div>
                <img src={img} />
                <p>{postData?.desc}</p>
                <p>No. of reactins : {postData?.likes?.length}</p>
            </div>
             
            </div>
        </DefaultLayout>
    )
}

export default SinglePost