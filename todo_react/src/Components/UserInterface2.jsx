import React, { useEffect, useState } from 'react'
import { Pagination } from './Pagination';

export const UserInterface2 = () => {
    const [page1, setPage1] = useState(1);
    const [len,setLen]=useState();
  const [data1,setData1]=useState([]);
  const fetch_get = async () => {
    
    try {
      let res = await fetch(`http://localhost:3000/todos/`).then((e) =>
        e.json()
      );

      setData1([...res]);
      setLen(res.length);
      
    } catch (error) {
    
      
    }
  };
  console.log(len)

  useEffect(() => {
    fetch_get();
  }, [page1]);

  return (
    <div>
        <Pagination page1={page1} setPage1={setPage1} data1={data1} len={len} />
    </div>
  )
}
