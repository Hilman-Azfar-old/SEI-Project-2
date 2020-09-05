import React from 'react';
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'

class ImgCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Col xs={12} sm={6} lg={4} className="p-2">
            <img className="w-100" src={this.props.src}/>
        </Col>
    );
  }
}

ImgCard.propTypes = {
    src: PropTypes.string.isRequired,
}

export default ImgCard;