import React, { Component } from 'react';
import './App.css';
import ProjectsContainer from './components/projectsContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <h1>Todolist</h1>
        </div>
          <ProjectsContainer />
      </div>
    );
  }
}

export default App;
