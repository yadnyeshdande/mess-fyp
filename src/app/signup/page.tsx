'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      console.log('SignUp Success' , response.data);
      router.push('/login');

    } catch (error:any) {
      console.log(error.message)
      console.log("SignUp Failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length>0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2 '>
      <h1>{loading ? "Loading..." : "Sign Up"}</h1>
      <hr />

      <label htmlFor="username" >username</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="number"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='roll no.'
      />

      <label htmlFor="email" >Email</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />

      <label htmlFor="password" >Password</label>
      <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />

      <button
        onClick={onSignup}
        className='p-2 border border-gray-300 text-white rounded-lg mb-4 focus:outline-none focus:border-gray-100'  
      >
        {buttonDisabled ? "Be worthy to Sign Up" : "You're worthy can sign up"}
      </button>
      <Link href={"/login"} className='text-blue-500'>Already have an account?</Link>
    </div>
  )
}

