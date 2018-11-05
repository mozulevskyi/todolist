import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import Comment from './comment';
import CommentForm from './commentForm';

class CommentsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      editingCommentId: false
    }
    axios.defaults.withCredentials = true;
  }

  componentDidMount() {
    axios.get(`/projects/${this.props.project.id}/tasks/${this.props.task.id}/comments.json`)
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  addNewComment = () => {
    axios.post(`/projects/${this.props.project.id}/tasks/${this.props.task.id}/comments`, {comment: {body: ''}})
      .then(response => {
        const comments = update(this.state.comments, { $splice: [[0, 0, response.data]]})
        this.setState({comments: comments, editingCommentId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updateComment = (comment) => {
    const commentIndex = this.state.comments.findIndex(x => x.id === comment.id)
    const comments = update(this.state.comments, {[commentIndex]: {$set: comment }})
    this.setState({comments: comments, editingCommentId: false});
  };

  enableEditing = (id) => {
    this.setState({editingCommentId: id}, () => { this.body.focus() })
  };

  deleteComment = (id) => {
    axios.delete(`/projects/${this.props.project.id}/tasks/${this.props.task.id}/comments/${id}`)
      .then(response => {
        const commentIndex = this.state.comments.findIndex(x => x.id === id)
        const comments = update(this.state.comments, { $splice: [[commentIndex, 1]]})
        this.setState({comments: comments})
      })
      .catch(error => console.log(error))
  };

  render() {
    let self = this;
    return(
      <div>
        Comments
        {this.state.comments.map((comment) => {
          if(self.state.editingCommentId === comment.id && comment.id) {
            return(<CommentForm project={self.props.project} task={self.props.task} comment={comment} key={comment.id} updateComment={this.updateComment}
                                bodyRef={input => this.body = input} />)
          } else {
            return (<Comment project={this.props.project} task={this.props.task} comment={comment} key={comment.id} onClick={this.enableEditing}
                          onDelete={this.deleteComment} />)
          }
        })}
        <button className="newComButton" onClick={this.addNewComment}>
          New Comment
        </button>
      </div>
    )
  }

}

export default CommentsContainer;