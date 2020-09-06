import React from 'react';

import { Col, Row, Tab, Nav } from 'react-bootstrap'
import Showcase from '../Carousel/Carousel'
import Collage from '../Collage/Collage'
import About from '../About/About'

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="home">
          <Row>
            <div style={{position:'fixed',
                         height: '100vh'}}
                 className="col-sm-3">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="contact">Contact</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="album-1">Fun</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="album-2">Food</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="album-3">Cool</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Col sm={{span:9, offset:3}}>
              <Tab.Content>
                <Tab.Pane eventKey="home">
                  <Showcase/>
                </Tab.Pane>
                <Tab.Pane eventKey="about">
                  <About />
                </Tab.Pane>
                <Tab.Pane eventKey="contact">
                  Contact
                </Tab.Pane>
                <Tab.Pane eventKey="album-1">
                  <Collage album="food"/>
                </Tab.Pane>
                <Tab.Pane eventKey="album-2">
                  <Collage album="fun"/>
                </Tab.Pane>
                <Tab.Pane eventKey="album-3">
                  <Collage album="cool"/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    );
  }
}

export default Landing;