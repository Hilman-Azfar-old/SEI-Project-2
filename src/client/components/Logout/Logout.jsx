import React from 'react';
import auth from '../../Auth/Auth'
import { Button } from 'react-bootstrap'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e){
    alert('ping')
  }

  render() {
    return (
            <Button variant="primary" onChange={this.handleClick}>
                Logout
            </Button>
    );
  }
}

export default Logout;