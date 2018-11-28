import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: this.props.comment.attributes.body,
    }
  }

  handleInput = (e) => {
    this.setState({body: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const comment = {body: this.state.body}
    fetch(`/projects/${this.props.project.id}/tasks/${this.props.task.id}/comments/${this.props.comment.id}`, {
      credentials: 'include',
      method: 'put',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({data : {type: 'comments',  attributes: comment, id: this.props.comment.id, relationships: {task: {data: {type: 'tasks', id: this.props.task.id}}} } })
    }).then(response => response.json())
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
        <form>
          <input className="commentInput" type="text" name="body" placeholder="Type your comment"
                 value={this.state.body} onChange={this.handleInput}
                 ref={this.props.bodyRef} />
          <button className="addCommentButton" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default CommentForm;