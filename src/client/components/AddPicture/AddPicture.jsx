import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

class AddPicture extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    let index = this.props.picData.urls.length
    e.target.pos = index ? this.props.picData.urls[index - 1][2] : 0;
    e.target.album = this.props.picData.album
    this.props.onAddPicture(e);
  }

  render() {
    return (
        <Container className="fixed-bottom p-4">
          <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col sm={{span:6, offset: 2}}>
                <Form.Control
                value={this.props.value}
                onChange={this.props.onTitleChange}
                placeholder="Add a new picture"/>
          </Col>
          <Col sm={2}>
              <Button variant="primary"
                      type="submit"
                      mx="auto">
                Add
              </Button>
          </Col>
          </Row>
          </Form>
        </Container>
    );
  }
}

export default AddPicture;