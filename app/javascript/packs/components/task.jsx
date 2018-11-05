import React, { Component } from 'react';
import axios from 'axios';
import CommentsContainer from "./commentsContainer";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

// import DatePicker from "react-datepicker";
// import moment from "moment";

// import "react-datepicker/dist/react-datepicker.css";

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = props.task
  }

  // handleChange = (date) => {
  //   const task = {deadline: date}
  //   axios.put(`http://localhost:3001/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {task: task})
  //     .then(response => {
  //       console.log(response)
  //       this.setState({ startDate: date });
  //     })
  //     .catch(error => console.log(error))
  // };

  handleClick = () => { this.props.onClick(this.props.task.id) };

  handleDelete = () => { this.props.onDelete(this.props.task.id) };

  handleChecked = (checked) => {
    const task = {done: checked}
    axios.put(`/projects/${this.props.project.id}/tasks/${this.props.task.id}`, {task: task})
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error))
  };

  tuggleChecked = (e) => {
    this.setState({ done: e.target.checked })
    this.handleChecked(e.target.checked);
  };

  render() {
    return(
      <div className="taskTab">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <span className="taskDeleteButton" onClick={this.handleDelete}>&#10539;</span>
              <h5 className="task" onClick={this.handleClick}>{this.props.task.name}</h5>
              <input className="checkboxInput" onChange={this.tuggleChecked.bind(this)} type={'checkbox'} checked={this.state.done} />
            </AccordionItemTitle>
              <AccordionItemBody>
                <div>Deadline:</div>
                {this.props.task.deadline ? this.props.task.deadline : 'no deadline'}
                {/*<p>Set the deadline: </p>*/}
                {/*<DatePicker*/}
                  {/*selected={this.state.startDate}*/}
                  {/*onChange={this.handleChange}*/}
                  {/*showTimeSelect*/}
                  {/*timeFormat="HH:mm"*/}
                  {/*timeIntervals={15}*/}
                  {/*dateFormat="LLL"*/}
                  {/*timeCaption="time"*/}
                {/*/>*/}
                <CommentsContainer project={this.props.project} task={this.props.task}/>
              </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
}

export default Task;