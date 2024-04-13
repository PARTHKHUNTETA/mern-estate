import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-4xl font-bold my-7">Sign In</h1>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        ></input>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover: opacity-95 disabled:opacity-80">
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have  account?</p>
        <Link to='/sign-up'><span className="text-blue-700">Sign Up</span></Link>
      </div>
    </div>
  )
}

export default SignIn