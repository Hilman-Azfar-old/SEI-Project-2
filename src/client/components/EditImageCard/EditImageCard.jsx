import React from 'react';
import PropTypes from 'prop-types'
import { Col,
         Overlay,
         Button,
         Popover,
         OverlayTrigger } from 'react-bootstrap'

import ImgCard from '../ImgCard/ImgCard'

function EditImageCard(props) {
    const handleClick = (event) => {
        event.target.value = props.uid
        event.target.albumId = props.albumId
        props.onDeletePicture(event)
    };
    return (
        <OverlayTrigger
          trigger="click"
          placement="top"
          rootClose="true"
          overlay={
            <Popover id={`${props.uid[0]}-${props.uid[2]}`}>
              <Popover.Content>
                <Button variant="link"
                        onClick={handleClick}>
                    Delete?
                </Button>
              </Popover.Content>
            </Popover>
          }
        >
        <Col xs={12} sm={6} md={3} className="p-2">
          <a>
            <ImgCard src={props.src}/>
          </a>
        </Col>
        </OverlayTrigger>
    );
}

export default EditImageCard;