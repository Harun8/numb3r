import React from 'react'
import "../globals.css"


import Image from 'next/image'

const Footer = () => {
  return (

<>
<nav className="navbar fixed-bottom d-flex justify-content-center mx-auto gap-3 p-3 my-3">


    <a className='linkedin btn text-white px-4 py-2 ' role='button'>
        <Image
        src="/assets/linkedin.svg"
        width={15}
        height={15}
        alt='linkedin'
        ></Image>
    </a>

    <a className='github btn text-white  px-4 py-2 ' role='button'>
        <Image
        src="/assets/github.svg"
        width={15}
        height={15}
        alt='github'
        ></Image>
    </a>
</nav>

 </>
    )
}

export default Footer