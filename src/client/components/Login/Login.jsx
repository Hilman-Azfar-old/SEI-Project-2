import React from 'react';
import auth from '../../Auth/Auth'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        username: '',
        password: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    auth.login(this.state , (res) => {
        if (res) {
            this.setState({
                username: '',
                password: '',
            })
            this.props.history.push("/user/dashboard")
        } else {
            alert('Try again')
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
            <h1> Login </h1>
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
                          mx="auto">
                    Submit
                  </Button>
                  </Col>
                  <Col md={{span:4, offset: 4}}>
                  <Link to="/user/register">
                    <Button variant="primary"
                          block>
                        Register
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </Container>
    );
  }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
}

export default Login;