import React, { Component } from 'react';

class Task extends Component {

  handleClick = () => { this.props.onClick(this.props.task.id) };

  handleDelete = () => { this.props.onDelete(this.props.task.id) };

  render() {
    return(
      <div className="task">
        <span className="deleteButton" onClick={this.handleDelete}>&#10539;</span>
        <h4 onClick={this.handleClick}>{this.props.task.name}</h4>
        {/*<input type="checkbox">{this.props.task.done}</input>*/}
      </div>
    )
  }
}

export default Task;