import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Project from './project';
import ProjectForm from './projectForm'

class ProjectsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      editingProjectId: false,
    }
    axios.defaults.withCredentials = true;
  }

  componentDidMount() {
    fetch('/projects.json', { credentials: 'include' })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({ projects: response.data });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  addNewProject = () => {
    fetch('/projects', {
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({data : {type: 'projects',  attributes: {title: ''} } })
    }).then(response => response.json())
      .then(response => {
        console.log(' resp', response)
        const projects = update(this.state.projects, { $splice: [[0, 0, response.data]]})
        this.setState({projects: projects, editingProjectId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updateProject = (project) => {
    const projectIndex = this.state.projects.findIndex(x => x.id === project.id)
    const projects = update(this.state.projects, {[projectIndex]: {$set: project }})
    this.setState({projects: projects, editingProjectId: false})
  };

  enableEditing = (id) => {
    this.setState({editingProjectId: id}, () => { this.title.focus() })
  };

  deleteProject = (id) => {
    fetch(`/projects/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    }).then(response => {
        const projectIndex = this.state.projects.findIndex(x => x.id === id)
        const projects = update(this.state.projects, { $splice: [[projectIndex, 1]]})
        this.setState({projects: projects})
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div>
        {this.state.projects.map((project) => {
          if(this.state.editingProjectId === project.id) {
            return(<ProjectForm project={project} key={project.id} updateProject={this.updateProject}
                             titleRef={input => this.title = input} />)
          } else {
            return (<Project project={project} key={project.id} onClick={this.enableEditing}
                          onDelete={this.deleteProject} />)
          }
        })}
        <div>
          <button className="newProjButton" onClick={this.addNewProject}>
            New Project
          </button>
        </div>
      </div>
    )
  }
}

export default ProjectsContainer;