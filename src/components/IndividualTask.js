import React, { useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";
import Modal from '@mui/material/Modal';

const IndividualTask = ({ task, tasks, setTasks,alltasks }) => {
  // console.log("task:",task,"tasks:",tasks);
  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedTaskName, setEditedTaskName] = useState(task.name);


  const handleRemove =async (id) => {
    let token = localStorage.getItem('dndtoken');
    const data =await fetch(`http://localhost:8000/deletetask/${id}`,{
      method: 'DELETE',
      headers:{
        "Access-Control-Allow-Origin":true,
        "Content-Type": "application/json",
         Authorization:token
      }
    });
    const res= await data.json();
    if(data.status===200){
      alltasks();
    toast("Task removed", { icon: "⚡" });
    } else {
      toast.error(res.error);
    }

    // let filteredtasks = tasks.filter((task) => task.id !== id);
    // setTasks(filteredtasks);
    // toast("Task removed", { icon: "⚡" });
    // localStorage.setItem("tasks", JSON.stringify(filteredtasks));
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, name:task.name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

const handleEdit =async (id) =>{
  let token= localStorage.getItem('dndtoken');
  if(editedTaskName==="") return toast.error("Task can't be empty");
  const taskIndex = tasks.findIndex((t) => t.id === id);
  const updatedTask = { ...tasks[taskIndex], name: editedTaskName };
  // const updatedTask =await tasks?.filter(t=>(t.id===id?{...t,name: editedTaskName}:t))[0];
  // console.log(updatedTask)
  const data =await fetch(`http://localhost:8000/updatetask/${id}`,{
    method:"PUT",
    headers:{
      "Access-Control-Allow-Origin":true,
      "Content-Type": "application/json",
       Authorization:token
    },
    body:JSON.stringify({
      updatedTask:updatedTask
    })
  });
  const res= await data.json();
  if(data.status===200){
    alltasks();
    toast("Task edited",{icon:"✔️"});
    handleClose();
  } else {
    toast.error(res.error);
  }
  
  // const updatedTasks =tasks.map(t=> t.id===id ? {...t,name: editedTaskName}: t);
  // setTasks(updatedTasks);
  // toast("Task edited", { icon: "⚡" });
  //   localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  //   handleClose();
}

  return (
    <>
      <div
        ref={drag}
        className={`flex justify-between p-4 mt-8 shadow-md rounded-md cursor-grab ${
          isDragging ? "opacity-25" : "opacity-100"
        }`}
      >
        <p className="font-serif">{task.name}</p>
        <div className="flex">
          <button className="text-slate-400" onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
          />
        </svg>
        </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-slate-200 flex flex-col justify-center items-center">
         <textarea type="text" placeholder="Edit..." value={editedTaskName} onChange={e=>setEditedTaskName(e.target.value)} className="w-9/12 h-4/6 resize-none border-none focus:outline-none p-2" />
         <br/>
         <button onClick={()=>handleEdit(task.id)} className="absolute bottom-4 right-4  rounded-lg px-4 bg-red-500 text-white">Save</button>
        </div>
      </Modal>
        <button
          className="text-slate-400"
          onClick={() => {
            handleRemove(task.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        </div>
      </div>
    </>
  );
};

export default IndividualTask;
