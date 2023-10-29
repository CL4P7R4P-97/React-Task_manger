import React from 'react';

import "./tm.css";
import {FaCheckDouble,FaCheck,FaEdit, FaTrashAlt} from 'react-icons/fa';
 
 
const Task = ({id,name,date,complete, editTask, deleteTask, completeTask}) => {


  return (

    <div key={id} className={complete ? "task complete" : "task"}>
      <span>
        <p>
          <b>Task:</b> {name}
        </p>
        <p>
          <b>Date:</b> {date}
        </p>
      </span>
      <span>
        <button onClick={()=>editTask(id)}>
          <FaEdit color="green" />
        </button>
        <button onClick={()=>deleteTask(id)} >
          <FaTrashAlt color="red" />
        </button>
        <button onClick={()=>completeTask(id)} >
          {complete ? (<FaCheck color="red" />):(<FaCheckDouble color="purple" />)}
        </button>
      </span>
    </div>
  )
}

export default Task;
