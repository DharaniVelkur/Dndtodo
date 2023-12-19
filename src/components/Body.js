import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ListTasks from "./ListTasks";
import CreateTask from './CreateTask';
import {useNavigate} from 'react-router-dom';
import notecontext from "./context/NoteContext";

function Body() {
  const [tasks,setTasks] =useState([]);
  let {setLoading} =useContext(notecontext);
  let token=localStorage.getItem('dndtoken');
  let navigate =useNavigate();
  const alltasks= async () =>{
    setLoading(true);
    const data =await fetch('https://dndtodo-backend.onrender.com/tasks',{
      method:"GET",
      headers:{
        'Access-Control-Allow-Origin':true,
        "Content-Type":'application/json',
        Authorization:token
      }
    });
    const res = await data.json();
    if(data.status===200) {
      setLoading(false);
      setTasks(res?.tasks);
    }
    else {
      setLoading(false);
      console.log(res?.error)
    }
  }
  // console.log(tasks);


  const validuser = async () => {
    let token = localStorage.getItem("dndtoken");
    
    const res = await fetch("https://dndtodo-backend.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      }
    });
    const data = await res.json();
    if (res.status === 200) {
      navigate("/body");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    validuser();
  }, []);
    let user = JSON.parse(localStorage.getItem("dnduser"));

  const handleLogout =async () =>{
    const data =await fetch('https://dndtodo-backend.onrender.com/logout',{
      method:"GET",
      headers:{
        'Access-Control-Allow-Origin':true,
        'Content-Type':'application/json',
        Authorization:token
      }
    });
    const res = await data.json();
    if(data.status===200) {
      localStorage.removeItem('dndtoken');
      localStorage.removeItem('dnduser');
      navigate('/');

    } else {
      toast.error(res.error);
      navigate("/*");
    }
  }

  useEffect(()=>{
    // setTasks(JSON.parse(localStorage.getItem("tasks")));
    alltasks();
  },[]);

  return (
    <DndProvider backend={HTML5Backend}>
    <Toaster/>
    <button className="absolute top-4 right-4 font-bold" onClick={handleLogout}>Sign Out <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
    <h1 className="absolute top-4 left-4 font-bold text-3xl">Welcome {user.name.toUpperCase()}!!</h1>
    <div className=" flex flex-col pt-32 gap-16 items-center">
      <CreateTask tasks={tasks} setTasks={setTasks} alltasks={alltasks}/>
      <ListTasks tasks={tasks} setTasks={setTasks} alltasks={alltasks}/>
    </div>
    </DndProvider>
  );
}

export default Body;