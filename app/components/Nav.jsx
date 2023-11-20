import React from 'react'
import "../styles/nav.css"
import Link from 'next/link'

import Image from 'next/image'
const Nav = () => {
  return (
<div className="container ">
  <div className="row ">
    <div className="col text-right mt-4">
      <Link href="/leaderboard" className=" text-white link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
        Leaderboard
      </Link>
    </div>
    <div className="col text-center">
      <a href='/'>
        <Image
          src="/assets/number-blocks.png"
          width={80}
          height={80}
          alt='numb3r logo'
          priority={true}
        />
      </a>
    </div>
    <div className="col text-left mt-4">
      <Link href="/stats" className=" text-white link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
        Stats
      </Link>
    </div>
  </div>
</div>



  )
}

export default Nav