import React, { Component } from 'react';
import axios from 'axios';

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.task.name,
      done: this.props.task.done
    }
  }

  handleInput = (e) => {
    this.setState({name: e.target.value})
  };

  handleBlur = () => {
    const task = {name: this.state.name, done: this.state.done}
    axios.put(`http://localhost:3001/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {task: task})
      .then(response => {
        console.log(response)
        this.props.updateTask(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className="taskInput" type="text" name="name" placeholder="Enter name of the task"
                 value={this.state.name} onChange={this.handleInput}
                 ref={this.props.nameRef} />
        </form>
      </div>
    );
  }
}

export default TaskForm;