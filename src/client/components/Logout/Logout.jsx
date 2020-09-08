import React from 'react';
import auth from '../../Auth/Auth'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    auth.logout()
  }

  render() {
    return (
            <Link to="/user/login" onClick={this.handleClick}>
            <Button variant="secondary"
                    size="sm">
                Logout
            </Button>
            </Link>
    );
  }
}

export default Logout;