import React, { Component } from 'react';

class Task extends Component {

  handleDelete = () => { this.props.onDelete(this.props.comment.id) };

  render() {
    return(
      <div className="commentTab">
        <span className="commentDeleteButton" onClick={this.handleDelete}>&#10539;</span>
        <h5 className="comment">{this.props.comment.attributes.body}</h5>
      </div>
    )
  }
}

export default Task;