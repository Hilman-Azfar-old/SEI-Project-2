import React from 'react';
import { hot } from 'react-hot-loader';

import { Col, Row, Tab, Nav } from 'react-bootstrap'
import Showcase from './components/Carousel/Carousel'
import Collage from './components/Collage/Collage'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Tab 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Tab 2</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Showcase/>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Collage/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    );
  }
}

export default hot(module)(App);