import React from 'react';

import { Container, Row, Col } from 'react-bootstrap'

class Collage extends React.Component {
  render() {
    let arr = [1,2,3,4,5,6,7,8]
    let allPics = arr.map((item, index) => {
        return <Col key={index} sm={4}> {item} </Col>
    })
    return (
        <Container>
            <Row>
                {allPics}
            </Row>
        </Container>
    );
  }
}

export default Collage;