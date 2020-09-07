import React from 'react';
import auth from '../../Auth/Auth'
import { Link } from 'react-router-dom'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class CreateAlbum extends React.Component {
  constructor(props){
    super(props)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
  }

  handleCreate(e) {
    e.preventDefault();
    this.props.onCreate(e)
  }

  handleTitle(e) {
    this.props.onTitleChange(e)
  }

  render() {
    return (
        <Container>
          <Col xs={{span: 6, offset: 3}}>
            <div className="text-center">
            <h1> Create Album </h1>
            </div>
            <Form onSubmit={this.handleCreate}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                value={this.props.value}
                type="text"
                placeholder="my new album ~"
                onChange={this.handleTitle}/>
              </Form.Group>
              <Button variant="primary"
                      type="submit"
                      mx="auto">
                Create
              </Button>
            </Form>
          </Col>
          <Row>
            <Link to={`/user/${this.props.user}/dashboard`}>
                <Button variant="primary">Back</Button>
            </Link>
          </Row>
        </Container>
    );
  }
}

// CreateAlbum.propTypes = {
//     history: PropTypes.object.isRequired,
// }

export default CreateAlbum;