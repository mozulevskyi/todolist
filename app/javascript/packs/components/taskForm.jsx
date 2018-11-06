import React, { Component } from 'react';
import axios from 'axios';

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.task.name,
      done: this.props.task.done,
      startDate: moment()
    }

    axios.defaults.withCredentials = true;
  }

  handleInput = (e) => {
    this.setState({name: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const task = {name: this.state.name, done: this.state.done}
    axios.put(`/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {task: task})
      .then(response => {
        console.log(response)
        this.props.updateTask(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  handleChange = (date) => {
    const task = {deadline: date}
    axios.put(`/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {task: task})
      .then(response => {
        console.log(response)
        this.setState({ startDate: date });
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form>
          <input className="taskInput" type="text" name="name" placeholder="Enter name of the task"
                 value={this.state.name} onChange={this.handleInput}
                 ref={this.props.nameRef} />
          <button className="addTaskButton" type="submit" onClick={this.handleSubmit}>Add</button>
        </form>
        Set the deadline:
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
          className="deadline"
        />
      </div>
    );
  }
}

export default TaskForm;