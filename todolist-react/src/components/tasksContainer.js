import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Project from './project';
import ProjectForm from './projectForm'

class TasksContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      editingTaskId: null,
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/projects/${this.props.project_id}/tasks.json` )
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

}

export default TasksContainer;