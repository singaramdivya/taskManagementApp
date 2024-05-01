import React, { Component } from 'react';
import './style.css';

class TaskAssignment extends Component {
  state = {
    tasks: [],
    newTaskTitle: '',
    newTaskDescription: '',
    selectedUserType: '',
    selectedUser: '',
    assignedTasks: {},
    titleError: false,
    descriptionError: false,
    emptyError: false,
    userOptions: {
      User: ['User 1', 'User 2', 'User 3','User 4','User 5','User 6','User 7'], // Dummy user data for individual users
      Team: ['Team A', 'Team B', 'Team C'] // Dummy user data for teams
    }
  };

  handleInputChange = e => {
    this.setState({ newTaskTitle: e.target.value });
  };

  handleUserTypeChange = e => {
    this.setState({ selectedUserType: e.target.value, selectedUser: '' });
  };

  handleUserChange = e => {
    this.setState({ selectedUser: e.target.value });
  };

  handleDescChange = e => {
    this.setState({ newTaskDescription: e.target.value });
  };

  handleTaskAdd = () => {
    const { newTaskTitle, newTaskDescription } = this.state;
    if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') {
      this.setState({ emptyError: true });
      return;
    }
    const newTask = { id: Date.now(), title: newTaskTitle, description: newTaskDescription, status: 'pending' };
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      newTaskTitle: '',
      newTaskDescription: '',
      titleError: false,
      descriptionError: false,
      emptyError: false
    }));
  };

  handleTaskAssign = taskId => {
    const { selectedUser } = this.state;
    if (selectedUser === '') {
      alert('Please select a user');
      return;
    }
    // Increase total count when task is assigned
    this.props.onTaskAdd(); // Call the function to update the total count

    this.setState(prevState => ({
      assignedTasks: {
        ...prevState.assignedTasks,
        [taskId]: { user: selectedUser, status: 'pending' }
      },
      selectedUser: ''
    }));
  };

  handleTaskStatusUpdate = (taskId, status) => {
    const { tasks, assignedTasks } = this.state;
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: status } : task
    );
    const updatedAssignedTasks = { ...assignedTasks };
    updatedAssignedTasks[taskId].status = status;

    if (status === 'inprogress') {
      // Set status to 'in progress' only if the previous status was 'pending'
      
      this.props.onTaskStart();
      if (assignedTasks[taskId].status === 'pending') {
        this.setState({ tasks: updatedTasks, assignedTasks: updatedAssignedTasks });
        this.props.onTaskStart(); // Notify parent component of task start
      }
    } else {
      // Set status to 'pending' or 'completed'
      this.setState({ tasks: updatedTasks, assignedTasks: updatedAssignedTasks });
      if (status === 'completed') {
        this.props.onTaskComplete(); // Notify parent component of task completion
      } else {
        this.props.onTaskEnd(); // Notify parent component of task end
      }
    }
  };

  render() {
    const { newTaskTitle, newTaskDescription, emptyError, selectedUserType, selectedUser, tasks, assignedTasks, titleError, descriptionError, userOptions } = this.state;

    let userList = null;
    if (selectedUserType !== '' && selectedUserType in userOptions) {
      userList = (
        <select value={selectedUser} onChange={this.handleUserChange}>
          <option value="">Select {selectedUserType}</option>
          {userOptions[selectedUserType].map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>
      );
    }

    return (
      <div className="task-assignment-container">

        <div className="task-inputs">
          <input type="text" value={newTaskTitle} onChange={this.handleInputChange} className={titleError ? 'error' : ''} placeholder="Enter Task Title" />
          {titleError && <p className="error-text">Task title cannot be empty</p>}
          <input type="text" value={newTaskDescription} onChange={this.handleDescChange} className={descriptionError ? 'error' : ''} placeholder="Enter Task Description" />
          {descriptionError && <p className="error-text">Task description cannot be empty</p>}
          {emptyError && <p className="error-text">Input fields cannot be empty</p>}
          <button onClick={this.handleTaskAdd}>Add Task</button>
        </div>
        <div className="task-inputs">
          <select className="input-container" value={selectedUserType} onChange={this.handleUserTypeChange}>
            <option value="">Select User/Team</option>
            <option value="User">User</option>
            <option value="Team">Team</option>
          </select>
          {userList}
          <div className="task-list">
   <table>
     <thead>
       <tr>
         <th>Task</th>
         <th>Description</th>
         <th>Assigned To</th>
         <th>Status</th>
         <th>Actions</th>
       </tr>
     </thead>
     <tbody>
       {tasks.map(task => (
         <tr key={task.id}>
           <td>{task.title}</td>
           <td>{task.description}</td>
          <td className={assignedTasks[task.id] ? assignedTasks[task.id].status : 'not-assigned'}>
             {assignedTasks[task.id] ? assignedTasks[task.id].user : 'Not Assigned'}
           </td>
           <td className={assignedTasks[task.id] ? assignedTasks[task.id].status : 'pending'}>
             {assignedTasks[task.id] ? assignedTasks[task.id].status : 'Pending'}
           </td>
           <td>
             {!assignedTasks[task.id] && (
               <button onClick={() => this.handleTaskAssign(task.id)}>Assign Task</button>
             )}
             {assignedTasks[task.id] && (
               <React.Fragment>
                 <button onClick={() => this.handleTaskStatusUpdate(task.id, 'inprogress')}>Start</button>
                 <button onClick={() => this.handleTaskStatusUpdate(task.id, 'pending')}>End</button>
                 <button onClick={() => this.handleTaskStatusUpdate(task.id, 'completed')}>Complete</button>
               </React.Fragment>
             )}
           </td>
         </tr>
       ))}
     </tbody>
   </table>
  </div>

        </div>
      </div>
    );
  }
}

export default TaskAssignment;
