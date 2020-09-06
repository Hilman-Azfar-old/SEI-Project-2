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

    console.log(e);
    // auth.register(this.state , (res) => {
    //     if (res) {
    //         this.setState({
    //             username: '',
    //             password: '',
    //         })
    //         console.log('3');
    //         this.props.history.push("/user/dashboard")
    //     } else {
    //         alert('Try again')
    //     }
    // })
  }

  handleChange(e) {
    let v
  }

  render() {
    return (
        <Container>
          <Col xs={{span: 6, offset: 3}}>
            <h1> Register </h1>
            <Form onSubmit={(e)=>this.handleSubmit(e)}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e)=>this.handleChange(e)}/>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              placeholder="Password"
                              onChange={(e)=>this.handleChange(e)}/>
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