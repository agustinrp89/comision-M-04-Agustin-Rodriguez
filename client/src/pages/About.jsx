import {  useRef, useState} from 'react'
import { useNavigate } from "react-router-dom"



function PostUp() {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData ({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);    
      const res = await fetch('/api/auth/postup',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if(data.sucess === false){
        setError(true);
       return;
      }
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
   
  };



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Create a Post </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input type="text" placeholder='Title' id='title' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="text" placeholder='Link de la imagen' id='picture' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>  
        <textarea type="text" placeholder='Message' id='message' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}></textarea>
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Create'}
          </button>
                </form>
          <p className="text-red-700 mt-5 ">{error && "Something went wrong"}</p>
    </div>
  );
}

export default PostUp