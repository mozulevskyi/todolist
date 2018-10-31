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
    this.setState({[e.target.name]: e.target.value})
  };

  handleBlur = () => {
    const task = {title: this.state.title, done: this.state.done}
    axios.put(`http://localhost:3001/projects/${this.props.project.id}`, {task: task})
      .then(response => {
        console.log(response)
        this.props.updateTask(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className="input" type="text" name="name" placeholder="Enter name of the post"
                 value={this.state.name} onChange={this.handleInput}
                 ref={this.props.nameRef} />
        </form>
      </div>
    );
  }
}

export default TaskForm;