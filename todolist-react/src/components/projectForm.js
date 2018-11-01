import React, { Component } from 'react';
import axios from 'axios';

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.project.title,
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  handleBlur = () => {
    const project = {title: this.state.title}
    axios.put(`http://localhost:3001/projects/${this.props.project.id}`, {project: project})
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
        <form onBlur={this.handleBlur} >
          <input className="input" type="text" name="title" placeholder="Enter name of the post"
                 value={this.state.title} onChange={this.handleInput}
                 ref={this.props.titleRef} />
        </form>
      </div>
    );
  }
}

export default ProjectForm;