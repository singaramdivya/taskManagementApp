import React, { Component } from 'react';
import TaskAssignment from './components/TaskAssignment';
import TaskSummary from './components/TaskSummary';
import './components/style.css';


class App extends Component {
  state = {
    tasks: [],
    assignedTasks: {},
    activeTasks: 0,
    totalTasks:0,
    completedTasks:0,
  };


  handleTaskStart = () => {
    this.setState(prevState => ({
      activeTasks: prevState.activeTasks + 1,
    }), () => {
      console.log("Total tasks after starting:", this.state.totalTasks);
    });
  };
  

  handleTaskEnd = () => {
    this.setState({ taskStatus: 'pending' });
  };

  handleTaskComplete = () => {
    this.setState(prevState=>({ activeTasks: prevState.activeTasks - 1,completedTasks: prevState.completedTasks + 1,taskStatus: 'completed' }));
  };


  handleTaskAdd = task => {
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task],
      totalTasks: prevState.totalTasks + 1,
    }));
  };

  handleTaskAssign = (taskId, assignedTo) => {
    this.setState(prevState => ({
      assignedTasks: {
        ...prevState.assignedTasks,
        [taskId]: assignedTo
      }
    }));
  };

  
  render() {
    const { tasks, assignedTasks, activeTasks,completedTasks,totalTasks} = this.state;
    
    return (
      <div className="app">
        <h2>Task Management Application</h2>
        <div className='sections'>
          <TaskAssignment
            tasks={tasks}
            assignedTasks={assignedTasks}
            onTaskAssign={this.handleTaskAssign}
            onTaskStart={this.handleTaskStart}
            onTaskEnd={this.handleTaskEnd}
            onTaskComplete={this.handleTaskComplete}
            onTaskAdd={this.handleTaskAdd} 
          />
        <TaskSummary activeTasks={activeTasks} completedTasks={completedTasks} totalTasks={totalTasks}/>
        </div>
      </div>
    );
  }
}

export default App;
