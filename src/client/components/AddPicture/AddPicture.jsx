import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'

class AddPicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <Row className="mb-2">
          <Col sm={{span:6, offset: 2}} className="text-left">
            <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input onChange={this.props.onHandleFile}
                               isValid={this.props.filename ? true : false} />
              <Form.File.Label data-browse="Browse">
                {this.props.filename ? this.props.filename : "Select a file"}
              </Form.File.Label>
              <Form.Control.Feedback type="invalid"
                                     tooltip={true}>
                                        Add a file to upload
              </Form.Control.Feedback>
            </Form.File>
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

          // <Row>
          // <Col sm={{span:6, offset: 2}}>
          //       <Form.Control
          //       value={this.props.value}
          //       onChange={this.props.onTitleChange}
          //       placeholder="Add a new picture"/>
          // </Col>

          // </Row>