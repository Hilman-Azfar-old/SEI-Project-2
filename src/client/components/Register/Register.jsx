import React from 'react';
import auth from '../../Auth/Auth'
import { Row, Col,
         Form, Button,
         Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        username: '',
        password: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    auth.register(this.state , (res) => {
        if (res) {
            let path = `/user/${this.state.username}/dashboard`
            this.setState({
                username: '',
                password: '',
            })
            this.props.history.push(path)
        } else {
            alert('Username is taken')
        }
    })
  }

  handleUsername(e) {
    this.setState({
        username: e.target.value
    })
  }

  handlePassword(e) {
    this.setState({
        password: e.target.value
    })
  }

  render() {
    return (
        <div>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand>
                Gallery
            </Navbar.Brand>
        </Navbar>
        <div style={{position: "relative", top: "30vh"}}>
          <Col xs={{span: 6, offset: 3}}>
            <h1> Register </h1>
            <Form onSubmit={(e)=>this.handleSubmit(e)}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e)=>this.handleUsername(e)}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              placeholder="Password"
                              onChange={(e)=>this.handlePassword(e)}/>
              </Form.Group>
            <Row>
            <Col md={4}>
              <Button variant="primary"
                      type="submit"
                      mx="auto"
                      block>
                    Sign up
              </Button>
            </Col>
            <Col md={{span:4, offset: 4}}>
              <Link to="/user/login">
                <Button variant="secondary"
                        block>
                    Have an account?
                </Button>
              </Link>
            </Col>
            </Row>
            </Form>
          </Col>
        </div>
        </div>
    );
  }
}

Register.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Register;