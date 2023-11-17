"use client"
import React, {useEffect, useState} from 'react'
import { Chart } from 'primereact/chart'

import "../styles/stats.css"

const Stats = () => {

  const [gameCompletionRatio,setGameCompletionRatio] = useState([])
  const [data, setData] = useState([])
  const [options, setOptions] = useState()

  useEffect(()=>{

    const getGameStats = async() => {

    try {
    
      const response = await fetch("/api/stats")

      if (!response.ok) {
        console.log("Get request failed ui");
      }

      const data = await response.json()
      console.log("data", data);
      setGameCompletionRatio(data) 
    } catch (error) {
      console.log(error);
    }
    }
    getGameStats() 
  },[])

  useEffect(()=> {
    console.log("gameCompletionRatio", gameCompletionRatio);
 setData ( {
    labels: ['Won', 'Lost'],
    datasets: [
        {
            label: 'Win/lose',
            data: [
              gameCompletionRatio[1] ? gameCompletionRatio[1].gameWon : 0,
              gameCompletionRatio[2] ? gameCompletionRatio[2].gameLost : 0
            ],
              backgroundColor: [
                'rgba(121, 182, 95, 0.8)',
                'rgba(182, 105, 95, 0.8)',
         
              ],
              borderColor: [
                'rgba(0, 165, 9, 0.8)',
                'rgba(165, 19, 0, 0.8)',
     
              ],
              borderWidth: 2
        }
    ]
})


setOptions ({
  scales: {
      y: {
          beginAtZero: true
      }
  }
  })
  }, [gameCompletionRatio])

 


  return (

<div className='d-flex justify-content-center'>
  {/* {data && data.length > 0 && (

  )} 
  */}
<Chart type="bar" data={data} options={options} />

</div>
    )
}

export default Stats