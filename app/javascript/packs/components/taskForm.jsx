import React, { Component } from 'react';

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.task.attributes.name,
      done: this.props.task.attributes.done,
      startDate: moment()
    };
  }

  handleInput = (e) => {
    this.setState({name: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const task = {name: this.state.name, done: this.state.done}
    fetch(`/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {
      credentials: 'include',
      method: 'put',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({data : {type: 'tasks',  attributes: task, id: this.props.task.id, relationships: {project: {data: {type: 'projects', id: this.props.project.id}}} } })
    }).then(response => response.json())
      .then(response => {
        this.props.updateTask(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  handleChange = (date) => {
    const task = {deadline: date}
    fetch(`/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {
      credentials: 'include',
      method: 'put',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({data : {type: 'tasks',  attributes: task, id: this.props.task.id, relationships: {project: {data: {type: 'projects', id: this.props.project.id}}} } })
    }).then(response => response.json())
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
          <button className="addTaskButton" type="submit" onClick={this.handleSubmit}>Save</button>
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