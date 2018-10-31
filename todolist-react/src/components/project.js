import React, { Component } from 'react';

class Project extends Component {

  handleClick = () => { this.props.onClick(this.props.project.id) };

  handleDelete = () => { this.props.onDelete(this.props.project.id) };

  render() {
    return(
      <div className="tile">
        <button>+</button>
        <span className="deleteButton" onClick={this.handleDelete}>&#10539;</span>
        <h4 onClick={this.handleClick}>{this.props.project.title}</h4>
      </div>
    )
  }
}

export default Project;