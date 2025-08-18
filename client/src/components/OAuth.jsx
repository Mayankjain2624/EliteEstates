import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/useSlice';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
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
    <button 
      onClick={handleGoogleClick} 
      type='button' 
      className='w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-all duration-200 flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-[0.98]'
    >
      <FaGoogle className="h-5 w-5 text-red-500" />
      <span>Continue with Google</span>
    </button>
  )
}

export default OAuth
