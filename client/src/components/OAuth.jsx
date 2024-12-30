import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/useSlice';
import { useNavigate } from 'react-router-dom';
// import { createClient } from "@supabase/supabase-js";

  // const supabase = createClient("https://rvdbfvrtgwimrnrvdbeb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2ZGJmdnJ0Z3dpbXJucnZkYmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1ODkyMDIsImV4cCI6MjA1MTE2NTIwMn0.VOAXEUIvBx7R221yU-bxl8_qQJ27bY5C463thdznArI");

function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleGoogleClick=async()=>{
        try{
                const provider=new GoogleAuthProvider();
                const auth=getAuth(app);
                const result=await signInWithPopup(auth,provider)
                console.log(result);
                const res= await fetch('/api/auth/google',{
                    method : 'POST',
                    headers :{
                        'Content-Type': 'application/json'
                    },
                    body :JSON.stringify({
                        name : result.user.displayName,
                        email : result.user.email,
                        photo: result.user.photoURL

                    })
                });
                const data= await res.json();
                dispatch(signInSuccess(data));
                console.log(data);
                navigate('/');
        }
        catch(err){
            console.log(err);
            
        }
    }
  return (
    <div>
      <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 items-center flex mx-auto max-w-lg'>Sign in with Google</button>
    </div>
  )
}

export default OAuth
