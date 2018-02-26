import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './scripts/components/App';
import './styles/styles.css';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={App}/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
