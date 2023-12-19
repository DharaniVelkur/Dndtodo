import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const CreateTask = ({ tasks, setTasks,alltasks }) => {
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("Please enter a task name more than 3 characters");
    let token = localStorage.getItem("dndtoken");
  
    const data = await fetch(`https://dndtodo-backend.onrender.com/addtask`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        newTask: task
      }),
    });
    const res = await data.json();
    if (data.status === 200) {
      toast.success("Task created successfully");
      alltasks();
      setTask({
          id: "",
          name: "",
          status: "todo",
        });

    } else {
      toast.error(res.error);
      setTask({
        id: "",
        name: "",
        status: "todo",
      });
    }
    // setTasks((prev) => {
    //   const list = [...(prev || []), task];
    //   localStorage.setItem(`tasks`, JSON.stringify(list));
    //   return list;
    // });
    // toast.success("Task created successfully");
    // setTask({
    //   id: "",
    //   name: "",
    //   status: "todo",
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 rounded mr-4 h-12 w-64 px-2"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="p-3 rounded-lg border-2 px-4 h-12 bg-red-600 text-white">
        Create
      </button>
    </form>
  );
};

export default CreateTask;
