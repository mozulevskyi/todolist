import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Task from './task';
import TaskForm from './taskForm'

class TasksContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      done: false,
      editingTaskId: null,
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/projects/${this.props.project.id}/tasks.json` )
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  addNewTask = () => {
    axios.post(`http://localhost:3001/projects/${this.props.project.id}/tasks`, {task: {name: '', done: false}})
      .then(response => {
        const tasks = update(this.state.tasks, { $splice: [[0, 0, response.data]]})
        this.setState({tasks: tasks, editingTaskId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updateTask = (task) => {
    const taskIndex = this.state.tasks.findIndex(x => x.id === task.id)
    const tasks = update(this.state.tasks, {[taskIndex]: {$set: task }})
    this.setState({tasks: tasks})
  };

  enableEditing = (id) => {
    this.setState({editingTaskId: id}, () => { this.name.focus() })
  };

  deleteTask = (id) => {
    axios.delete(`http://localhost:3001/projects/${this.props.project.id}/tasks/${id}`)
      .then(response => {
        const taskIndex = this.state.tasks.findIndex(x => x.id === id)
        const tasks = update(this.state.tasks, { $splice: [[taskIndex, 1]]})
        this.setState({tasks: tasks})
      })
      .catch(error => console.log(error))
  };

  render() {
    let self = this;
    return(
      <div>
        {this.state.tasks.map((task) => {
          if(self.state.editingTaskId === task.id && task.id) {
            return(<TaskForm project={self.props.project} task={task} key={task.id} updateTask={this.updateTask}
                                nameRef={input => this.name = input} />)
          } else {
            return (<Task project={this.props.project} task={task} key={task.id} onClick={this.enableEditing}
                             onDelete={this.deleteTask} />)
          }
        })}
        <div>
          <button className="newProjButton" onClick={this.addNewTask}>
            New Task
          </button>
        </div>
      </div>
    )
  }

}

export default TasksContainer;