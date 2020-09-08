import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

import ImgCard from '../ImgCard/ImgCard'
import pic_1 from '../Collage/Images/card_pic_01.png'
import pic_2 from '../Collage/Images/card_pic_02.png'
import pic_3 from '../Collage/Images/card_pic_03.png'
import pic_4 from '../Collage/Images/card_pic_04.png'

class AlbumPics extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props, '--Pics');
    return (
        <React.Fragment>
            { this.props.data.urls.length
              ? this.props.data.urls.map(item=>(
                            <Col xs={{span:10, offset:1}}
                                 sm={{span:4, offset:0}}
                                 md={{span:3, offset:0}}
                                  className="mb-2">
                                  {item}
                            </Col>
                ))
              : (<h3> No pictures in this album </h3>)
            }
        </React.Fragment>
    );
  }
}

export default AlbumPics;