import React from 'react'
import "../styles/nav.css"

import Image from 'next/image'
const Nav = () => {
  return (

<a href='/' className="d-flex justify-content-center mt-3 ">

<Image
        src="/assets/number-blocks.png"
        width={80}
        height={80}
        alt='numb3r logo'
        >


        </Image>

        
</a>


// <nav class="navbar bg-body-tertiary ml-5 ">
//   <div class="container-fluid">
//     <a class="navbar-brand" href="#">
//         <Image
//         src="/assets/number-blocks.png"
//         width={80}
//         height={80}
//         alt='numb3r logo'
//         >


//         </Image>

//     </a>
//   </div>
  
// </nav>
  )
}

export default Nav