import React, { Component } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import TasksContainer from "./tasksContainer";

class Project extends Component {

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