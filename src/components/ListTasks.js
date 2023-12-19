import React, { useEffect, useState } from "react";
import Section from "./Section";

const ListTasks = ({ tasks, setTasks,alltasks }) => {

  const [todos, setTodos] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    const ftodos = tasks?.filter((task) => task?.status === "todo");
    const fInProgress = tasks?.filter((task) => task?.status === "inprogress");
    const fClosed = tasks?.filter((task) => task?.status === "closed");
    setTodos(ftodos);
    setInprogress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);


// console.log(tasks);
  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="flex flex-wrap justify-center  gap-16">
      {statuses?.map((status, index) => {
       return <Section
       alltasks={alltasks}
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inprogress={inprogress}
          closed={closed}
        />;
      })}
    </div>
  );
};

export default ListTasks;
