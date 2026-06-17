import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[400px] h-[400px] bg-violet-600/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* glass card wrapper */}
      <div className="relative w-full max-w-md p-6 rounded-3xl border border-slate-700 bg-slate-900/60 backdrop-blur-xl shadow-2xl">

        {/* header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Sign in to continue building resumes with AI
          </p>
        </div>

        {/* Clerk component (unchanged logic) */}
        <div className="flex justify-center">
          <SignIn />
        </div>

      </div>
    </div>
  )
}

export default SignInPage