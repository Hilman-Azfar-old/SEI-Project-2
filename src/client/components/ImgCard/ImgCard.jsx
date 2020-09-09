import React from 'react';
import PropTypes from 'prop-types'
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Col } from 'react-bootstrap'

class ImgCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Image className="w-100" cloudName="dk0bjhiu9" publicId={this.props.src}/>
    );
  }
}

ImgCard.propTypes = {
    src: PropTypes.string.isRequired,
}

export default ImgCard;