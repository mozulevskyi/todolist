import React, { Component } from 'react';

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.project.attributes.title,
    }
  }

  handleInput = (e) => {
    this.setState({title: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const project = {title: this.state.title}
    fetch(`/projects/${this.props.project.id}`, {
      credentials: 'include',
      method: 'put',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify({data: { type: 'projects', attributes: project, id: this.props.project.id}})
    }).then(response => response.json())
      .then(response => {
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