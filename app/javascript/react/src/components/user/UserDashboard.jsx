import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'
import TaskCard from '../admin/TaskCard'

const UserDashboard = () => {

  const [task,setTask] = useState([])
  const [taskUpdate,setTaskUpdate] = useState(0)


  useEffect(() => { 
    data = localStorage.getItem('accessToken')
    r_data = JSON.parse(data)
    email = r_data.email
    // console.log(email);

    axios.get(`task/${email}`)
    .then(res => setTask(res.data))
    .catch(err => console.log(err))
    
  },[taskUpdate])

  const handleTaskUpdate = () => {
    setTaskUpdate(taskUpdate + 1)
  };

  return (
    <div>
      <Navbar/>
      <TaskCard tasks = {task} isDeleted = {handleTaskUpdate} />
    </div>
  )
}

export default UserDashboard