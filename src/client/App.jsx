import React from 'react';
import { hot } from 'react-hot-loader';

import Landing from './components/Landing/Landing'

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
        <Landing/>
    );
  }
}



export default hot(module)(App);