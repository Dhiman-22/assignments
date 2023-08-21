
import './App.css';
import {useState} from "react";
import { UserInterface } from './Components/UserInterface';
import { UserInterface2 } from './Components/UserInterface2';

const postData= async(obj)=>{
  await fetch(`http://localhost:3000/todos`,{
    method:"POST",
    headers:{
     "Content-Type":"application/json",
    },
    body:JSON.stringify(obj)
  })
}

function App() {
const [todo,setTodo]=useState("");

const handleSubmit=(e)=>{
   e.preventDefault();
   postData({todo});
}

const HandleChange=(e)=>{
e.preventDefault();
setTodo(e.target.value)
}

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="todo" onChange={HandleChange} type="text" placeholder="ADD TODO"/>
        <input type="Submit" />
      </form>
      <UserInterface />
      {/* <UserInterface2/> */}
    </div>
  );
}

export default App;
