import React, { Component } from 'react';
import CommentsContainer from "./commentsContainer";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = props.task
  }

  handleClick = () => { this.props.onClick(this.props.task.id) };

  handleDelete = () => { this.props.onDelete(this.props.task.id) };

  handleChecked = (checked) => {
    const task = {done: checked}
    fetch(`/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {
      credentials: 'include',
      method: 'put',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({data : {type: 'tasks', attributes: task, id: this.props.task.id, relationships: {project: {data: {type: 'projects', id: this.props.project.id}}} } })
    }).then(response => response.json())
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  };

  tuggleChecked = (e) => {
    this.setState({ done: e.target.checked })
    this.handleChecked(e.target.checked);
  };

  deadlineStyle = () => {
    if(!this.props.task.attributes.deadline) return 'deadline_time'
    let date = new Date(this.props.task.attributes.deadline);
    let currentDate = new Date();
    return (currentDate > date) ? 'deadline_red' : 'deadline_ok';
  };

  render() {
    let css = this.deadlineStyle();
    return(
      <div className="taskTab">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <i className="down_arrow"></i>
              <span className="taskDeleteButton" onClick={this.handleDelete}>&#10539;</span>
              <div className="task" onClick={this.handleClick}>{this.props.task.attributes.name}</div>
              <input className="checkboxInput" onChange={this.tuggleChecked.bind(this)} type={'checkbox'} checked={this.state.done} />
            </AccordionItemTitle>
              <AccordionItemBody>
                <div id="deadline" className={css}>
                  Deadline: {this.props.task.attributes.deadline ? this.props.task.attributes.deadline : 'no deadline'}
                </div>
                <CommentsContainer project={this.props.project} task={this.props.task} />
              </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
}

export default Task;