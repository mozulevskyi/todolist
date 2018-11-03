import React, { Component } from 'react';
import axios from 'axios';

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: this.props.comment.body,
    }
  }

  handleInput = (e) => {
    this.setState({body: e.target.value})
  };

  handleBlur = () => {
    const comment = {body: this.state.body}
    axios.put(`http://localhost:3001/projects/${this.props.project.id}/tasks/${this.props.task.id}/comments/${this.props.comment.id}`, {comment: comment})
      .then(response => {
        console.log(response)
        this.props.updateComment(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form onBlur={this.handleBlur} >
          <input className="commentInput" type="text" name="body" placeholder="Type your comment"
                 value={this.state.body} onChange={this.handleInput}
                 ref={this.props.bodyRef} />
        </form>
      </div>
    );
  }
}

export default CommentForm;