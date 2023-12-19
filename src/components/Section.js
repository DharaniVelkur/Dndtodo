import React, { useContext } from "react";
import Header from "./Header";
import IndividualTask from "./IndividualTask";
import { useDrop } from "react-dnd";
import toast from "react-hot-toast";
import Shimmer from "./Shimmer";
import notecontext from "./context/NoteContext";

const Section = ({ status, tasks, setTasks, todos, inprogress, closed, alltasks }) => {
  let {loading} =useContext(notecontext);
  let text = "Todo";
  let bg="bg-slate-500";
  let tasksToMap =todos;

  if(status==="inprogress"){
    text ="In Progress";
    bg="bg-purple-500";
    tasksToMap=inprogress;
  }

  if(status==="closed"){
    text ="Done";
    bg="bg-green-500";
    tasksToMap=closed;
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: item=>addItemtoSection(item.id,item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addItemtoSection =async (id,name)=>{
    // console.log("tasks",tasks);
    // const currentStatus =status;
    // const taskIndex = tasks.findIndex((t) => t.id === id);
    // const taskToMove = tasks[taskIndex];
    // const updatedTask = { ...taskToMove, status: currentStatus };
  // const updatedTask = await tasksToMap?.filter(t=>(t?.id===id?{...t,status:currentStatus}:t))[0];
    // console.log("updatedTask",updatedTask);
  let token= localStorage.getItem('dndtoken');
  const data =await fetch(`http://localhost:8000/edittask/${id}`,{
    method:"PUT",
    headers:{
      "Access-Control-Allow-Origin":true,
      "Content-Type": "application/json",
       Authorization:token
    },
    body:JSON.stringify({
      id:id,
      name:name,
      status:status
    })
  });
  const res= await data.json();
  if(data.status===200){
    await alltasks();
    toast("Task status changed",{icon:"✔️"}); 
  } else {
    toast.error(res.error);
  }
    // console.log(id,status)
    // setTasks(prev=>{
    //   const mtasks = prev?.map(t=>{
    //     if(t.id===id){
    //       return {...t,status:status}
    //     } 
    //     return t;
    //   })
    //   localStorage.setItem(`tasks`, JSON.stringify(mtasks));
    // toast("Task status changed",{icon:"✔️"});
    //   return mtasks;
    // })
    
  }


  return (
    <div className={`w-64 ${isOver?"bg-slate-200" :""}`} ref={drop}>
      <Header text={text} bg={bg} count={tasksToMap?.length||0} />
      {tasksToMap?.length>0&& tasksToMap?.map((task)=>(
        <>
        {loading&& <Shimmer/>}
      
      <IndividualTask key={task.id} task={task} tasks={tasks} setTasks={setTasks} alltasks={alltasks}/>
      </>
      ))}
    </div>
  );
};
 
export default Section;
