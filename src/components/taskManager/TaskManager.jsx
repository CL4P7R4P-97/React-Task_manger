import React from 'react';
 
import Task from './Task';
import "./tm.css";
import {useState, useRef,useReducer, useEffect} from 'react';
import useLocalStorage from 'use-local-storage';
import Alert from '../alert/Alert';
import Confirm from '../confirm/Confirm';
import { taskReducer } from './taskReducer';


const TaskManagerReducer = () => {


    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [tasks, setTasks] = useLocalStorage("tasks",[]);

    // we are keeping initialState inside cuz tasks above 
    //should be in initial state
    const initialState = {

     tasks,
     taskID: null,
     isEditing: false,
     isAlertOpen: false,
     alertContent: "This is an alert",
     alertClass: "success",
     idEditModalOpen: false,
     isDeleteModalOpen: false,
     modalTitle: "Delete Task",
     modalMessage: "You are about to delete this task",
     modalActionText: "OK"
    }


    const [state, dispatch]  = useReducer(taskReducer, initialState);



    const nameInputRef = useRef(null);
    


    const handleSubmit = (e)=>{

        e.preventDefault();
        if(!name || !date){
          dispatch({
            type: "EMPTY_FIELDS"
          })
        }

        if(name && date && state.isEditing){

          const updatedTask = {

            id: state.taskID,
            name,
            date,
            complete: false
          }

          dispatch({
            type: "UPDATE_TASK",
            payload: updatedTask
          });
          setTasks(
            tasks.map(task => {
              if(task.id === updatedTask.id){
                 
                return {
                  ...task,name,date,complete:false
                }
              }
              return task;
            })
          );
          setDate("");
          setName("");
          return;
        }

        if(name && date ){

           const newTask = {
            id: Date.now(),
            name,
            date,
            complete: false
           }

           dispatch({
            type: "ADD_TASK",
            payload: newTask
           });
           
           setTasks([...tasks, newTask]);
           setDate("");
        setName("");
        }

        
    }

    const openEditModal = (id)=>{

        dispatch({
          type: "OPEN_EDIT_MODAL",
          payload: id
        })
    }


    const modalEditAction = ()=>{

      
      const id = state.taskID;
      dispatch({
        type: "EDIT_TASK",
        payload: id
      })

      const thisTask = state.tasks.find((task)=>task.id === id);
      setName(thisTask.name);
      setDate(thisTask.date);
      closeEditModal();
      
    
    }

    const openDeleteModal = (id)=>{

      dispatch({

        type: "OPEN_DELETE_MODAL",
        payload: id
      })
     
        
    }

    const closeDeleteModal = ()=>{

      dispatch({
        type: "CLOSE_DELETE_MODAL"
      })
    }

     const modalDeleteAction =()=>{

      const id = state.taskID;
      dispatch({
        type: "DELETE_TASK",
        payload: id
      })
      setTasks(
        tasks.filter(task=>task.id !== state.taskID)
      );

        closeDeleteModal();
     } 


   

    const completeTask = (id)=>{
 
      dispatch({
        type: "COMPLETE_TASK",
        payload: id
      })

      setTasks(
        tasks.map(task => {
          if(task.id === id){
             
            return {
              ...task, complete:!task.complete
            }
          }
          return task;
        })
      );
  
    }

     const closeEditModal = ()=>{

        dispatch({
          type: "CLOSE_EDIT_MODAL"
        })
     }



    useEffect(()=>{

        nameInputRef.current.focus();
       
       
    });

    const closeAlert =()=>{

      dispatch({
        type: "CLOSE_ALERT"
      })

    }

  return (



    <div className="--bg-primary">

     { state.isAlertOpen &&  <Alert alertContent={state.alertContent} alertClass={state.alertClass} onCloseAlert={closeAlert} />}

     {state.isEditModalOpen && <Confirm 
     modalTitle={state.modalTitle}
     modalActionText={state.modalActionText}
     modalMessage={state.modalMessage} 
     modalAction={modalEditAction}
     onCloseModal={closeEditModal}
     />}

{state.isDeleteModalOpen && <Confirm 
     modalTitle={state.modalTitle}
     modalActionText={state.modalActionText}
     modalMessage={state.modalMessage} 
     modalAction={modalDeleteAction}
     onCloseModal={closeDeleteModal}
     />}


      <h1 className="--text-center --text-light">Task Manager with REDUCER</h1>
      <div className="--flex-center --p">
        <div className="--card --bg-light --width-500px --p --flex-center">
          <form onSubmit={handleSubmit} className="form --form-control">
            <div>
              <label htmlFor="name">Task:</label>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Task name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                placeholder="Task name"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button className="--btn --btn-success --btn-block"
            >
             {state.isEditing ? 'Save Changes': ' + New Task'}
              
            </button>
          </form>
        </div>
      </div>
      {/* Display Task */}

      <article className="--flex-center --my2">
        <div className="--width-500px --p">
          <h2 className="--text-light">Task List</h2>
          <hr style={{ background: "#fff" }} />
          {tasks.length === 0 ? (
            <p className="--text-light">No task added...</p>
          ) : (
            <div>
              { 
              tasks.map((task) => {
               
                return (
                  <Task key = {task.id}
                    {...task}
                    editTask={openEditModal}
                    completeTask={completeTask}
                    deleteTask={openDeleteModal}
                  />
                );
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default TaskManagerReducer;
