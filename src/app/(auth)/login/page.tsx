import LoginForm from '@/components/shared/LoginForm'
import React from 'react'

const page = () => {
  return (
    <section className="wrapper flex justify-center items-center h-screen">
      <div className="space-y-4">
    <h1 className="main-heading">Login</h1>
    <LoginForm/>
    </div>
    </section>
  )
}

export default page