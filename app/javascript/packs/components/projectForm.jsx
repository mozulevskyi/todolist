import React, { Component } from 'react';
import axios from 'axios';

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.project.title,
    }
    axios.defaults.withCredentials = true;
  }

  handleInput = (e) => {
    this.setState({title: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const project = {title: this.state.title}
    axios.put(`/projects/${this.props.project.id}`, {project: project})
      .then(response => {
        console.log(response)
        this.props.updateProject(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="tile">
        <form>
          <input className="projectInput" type="text" name="title" placeholder="Enter title of the project"
                 value={this.state.title} onChange={this.handleInput}
                 ref={this.props.titleRef} />
          <button className="addProjButton" type="submit" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default ProjectForm;