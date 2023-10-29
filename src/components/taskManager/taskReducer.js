export const taskReducer =(state, action)=>{

    switch(action.type){
 
     case "EMPTY_FIELDS":
       console.log(action);
       return {...state, 
         isAlertOpen: true,
         alertContent: "Please enter name and date",
         alertClass: "danger"      
       }
 
     case "CLOSE_ALERT":
       console.log(action);
     return{...state, isAlertOpen: false,
     }
 
     case "ADD_TASK":
       console.log(action.payload);
       return {...state, 
         isAlertOpen: true,
         alertClass: "success",
         alertContent: "Task added successfully",
         tasks:[...state.tasks,action.payload]}
     
         case "OPEN_EDIT_MODAL":
 
         console.log(action.payload);
         return{...state,
         taskID: action.payload,
         isEditModalOpen: true,
         modalTitle: "Edit Task",
         modalMessage: "You are abou to Edit this task",
         modalActionText: "Edit"
         }
 
         case "CLOSE_EDIT_MODAL":
 
         console.log(action.payload);
         return{...state,
         isEditModalOpen: false,
         }
 
         case "EDIT_TASK":
 
         console.log(action.payload);
         return{...state,
         isEditing: true,
        
         }
 
         case "OPEN_DELETE_MODAL":
 
         console.log(action.payload);
         return{...state,
         taskID: action.payload,
         isDeleteModalOpen: true,
         modalTitle: "Delete Task",
         modalMessage: "You are abou to Delete this task",
         modalActionText: "Delete"
         }
 
         case "CLOSE_DELETE_MODAL":
 
         console.log(action.payload);
         return{...state,
         isDeleteModalOpen: false,
         }
 
         case "DELETE_TASK":
 
         console.log(action.payload);
         return {
           ...state, isDeleteModalOpen: false, tasks: state.tasks.filter(task => task.id !== action.payload)
         }
         
 
 
         case "UPDATE_TASK":
 
         console.log(action.payload);
         const updatedTask = action.payload;
         const id = updatedTask.id;
         const taskIndex = state.tasks.findIndex((task)=>task.id ===id);
         if(taskIndex != -1){
           state.tasks[taskIndex] = updatedTask;
         }
 
         return {...state, isEditing: false,
         isAlertOpen: true,
       alertContent: "Task Updated",
     alertClass: "success"}
 
     case "COMPLETE_TASK":
      
     let msgState;
         
         const taskPos = state.tasks.findIndex((task)=>task.id === action.payload);
         if(taskPos != -1){
           state.tasks[taskPos].complete = !state.tasks[taskPos].complete; 
           msgState = state.tasks[taskPos].complete
         }
 
       
         return {...state, 
         isAlertOpen: true,
       alertContent: msgState ? "Task Completed"  : "Task is pending",
       alertClass: msgState  ? "success": "warning"}
 

       default: return;
    }
 
 
 }
 