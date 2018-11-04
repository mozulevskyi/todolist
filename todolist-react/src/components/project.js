import React, { Component } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import TasksContainer from "./tasksContainer";

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleClick = () => { this.props.onClick(this.props.project.id) };

  handleDelete = () => { this.props.onDelete(this.props.project.id) };

  render() {
    return(
      <div className="section">
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <span className="projectDeleteButton" onClick={this.handleDelete}>&#10539;</span>
              <h4 className="tile" onClick={this.handleClick}>{this.props.project.title}</h4>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
              />
            </AccordionItemTitle>
            <AccordionItemBody>
              <TasksContainer project={this.props.project}/>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }
}

export default Project;