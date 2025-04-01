import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="wrapper">
      <div className="flex justify-between">
        <p className="font-bold">OCREngine</p>
        <div className="flex space-x-4">
          <Link href="/login">
          <Button variant={'outline'}>Login</Button>
          </Link>
          <Link href="/signup">
          <Button>SignUp</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header