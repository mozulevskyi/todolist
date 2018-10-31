import React, { Component } from 'react';

class Task extends Component {

  handleClick = () => { this.props.onClick(this.props.task.id) };

  handleDelete = () => { this.props.onDelete(this.props.task.id) };

  render() {
    return(
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>&#10539;</span>
        <h4 onClick={this.handleClick}>{this.props.task.title}</h4>
      </div>
    )
  }
}

export default Task;