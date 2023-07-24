import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
import Navbar from '../Navbar'

import Task from "../Task/Task";
import axios from "axios";
import TaskTableAdmin from "./TaskTableAdmin";
import TaskCard from "./TaskCard";

const AdminDashboard = () => {
  const [taskModal, setTaskModal] = useState("none");

  const [taskDetail,setTaskDetail] = useState([])
  const [taskAdded,setTaskAdded] = useState(0)

  useEffect(() => {
    axios.get('/all_tasks')
    .then(res =>{setTaskDetail(res.data) 
      // ,console.log(res.data)
    })
    .catch(err => console.log(err))
  },[taskAdded])

  const handleTaskModal = () => {
    return taskModal == "none" ? setTaskModal("block") : setTaskModal("none");
  };

  const handleTaskAdded = (isAdd) => {
    setTaskAdded(taskAdded + isAdd)
  }
  return (
    <div>
      <Navbar />

      <div onClick={handleTaskModal} className="task_btn">
        {taskModal == "none" ? (
          <h2>CLICK HERE TO ADD TASK</h2>
        ) : (
          <h2>CLOSE FORM</h2>
        )}
      </div>

      <div className="task_modal" style={{ display: taskModal }}>
        <Task isTaskAdded = {handleTaskAdded} />
      </div> 

          <div className="task_table">

            <TaskCard tasks={taskDetail} isDeleted = {handleTaskAdded} />

            {/* <TaskTableAdmin tasks={taskDetail} /> */}
          </div>

    </div>
  );
};

export default AdminDashboard;
