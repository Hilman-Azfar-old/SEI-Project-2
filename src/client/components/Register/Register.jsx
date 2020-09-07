import React from 'react';
import auth from '../../Auth/Auth'
import { Col, Container, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

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
        <Container>
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
              <Button variant="primary"
                      type="submit"
                      mx="auto">
                Submit
              </Button>
            </Form>
          </Col>
        </Container>
    );
  }
}

Register.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Register;