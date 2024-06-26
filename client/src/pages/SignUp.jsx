import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [formData, setFormData]= useState({})
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      }, 
     )
      const data = await response.json()
      console.log(data)
      setLoading(false)
      if(data.success===false){
        setError(true);
        return;
      }
      setError(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  
  }
  console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign-Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 rounded-lg py-2 text-white uppercase hover:opacity-90">
          SignUp
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-semibold">Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">{loading? 'Loading...': 'Sign-In'}</span>

        </Link>
      </div>
      <p className="text-red-600">{error&&'something went wrong'}</p>
      <ToastContainer />
    </div>
  );
}
