import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

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
        <Container className="fixed-bottom p-4">
          <Form onSubmit={this.handleCreate}>
          <Row>
          <Col sm={{span:6, offset: 2}}>
                <Form.Control
                value={this.props.value}
                placeholder="my new album ~"
                onChange={this.handleTitle}/>
          </Col>
          <Col sm={2}>
              <Button variant="primary"
                      type="submit"
                      mx="auto">
                Create
              </Button>
          </Col>
          </Row>
          </Form>
        </Container>
    );
  }
}

export default CreateAlbum;