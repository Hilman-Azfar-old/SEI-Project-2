import React from 'react';
import PropTypes from 'prop-types'

class ImgCard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <img className="w-100" src={this.props.src}/>
    );
  }
}

ImgCard.propTypes = {
    src: PropTypes.string.isRequired,
}

export default ImgCard;