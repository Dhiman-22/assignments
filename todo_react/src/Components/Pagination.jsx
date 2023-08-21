import React, { useState } from 'react'

export const Pagination = ({page,setPage,data,setPage1,page1,data1,len}) => {
 
   const handleChg = (val)=>{
        setPage(page+val); 
   }
  console.log(page1,data1,len)

  const handleClick= (val)=>{
        setPage1(val)
  }


  return (
    <div>
<button  disabled={page==1} onClick={()=>handleChg(-1)}>-</button>
      <button disabled>{page}</button>
      <button onClick={()=>handleChg(1)}>+</button>
<br/>
     
         </div>
  )
}
