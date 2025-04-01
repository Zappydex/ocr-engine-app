import SignUpForm from '@/components/shared/SignupForm'
import React from 'react'

const page = () => {
  return (
    <section className="wrapper flex justify-center items-center h-screen">
    <div className="space-y-4">
  <h1 className="main-heading">SignUp</h1>
  <SignUpForm/>
  </div>
  </section>
  )
}

export default page