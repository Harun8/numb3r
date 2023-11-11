"use client"

import React, {useState} from 'react'
import "../styles/leaderboard.css"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
        
const Leaderboard = () => {
  const [products, setProducts] = useState([
    {
      name: "Harun",
      time: "2",
      tries: "4"
  },
  {
    name: "Michael",
    time: "50",
    tries: "5"
},
{
  name: "Michael",
  time: "42",
  tries: "3"
},
{
  name: "Michael",
  time: "42",
  tries: "3"
},
{
  name: "Michael",
  time: "42",
  tries: "3"
}
  ]);

  
  return (
    <div className='d-flex justify-content-center '>
 <div className=" card   p-3 shadow " style={{ backgroundColor: 'var(--blue-50)'}} >
            <DataTable   value={products} stripedRows showGridlines   tableStyle={{ minHeight: '25rem',minWidth: "25rem"  } }>
                <Column field="name" header="Name"></Column>
                <Column field="time" header="Time"> </Column>
                <Column field="tries" header="Tries"></Column>
            </DataTable>
        </div>

    </div>
  )
}

export default Leaderboard