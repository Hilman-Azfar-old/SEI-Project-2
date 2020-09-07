import React from 'react';
import auth from '../../Auth/Auth'
import { Link, Switch } from 'react-router-dom'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import AlbumCard from '../AlbumCard/AlbumCard'

class EditAlbum extends React.Component {
  constructor(props){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e){
    this.props.onDelete(e)
  }

  render() {
    console.log(this.props.user);
    return (
        <Container>
            <Col className="text-center" sm={{span: 8, offset: 2}}>
                <h4>All albums</h4>
                <Row>
                    {this.props.albums.map((item, index) =>
                        (
                            <Col key={index} sm={4} className="mb-2">
                            <AlbumCard onDelete={this.handleDelete}
                                       data={item.album}/>
                            </Col>
                        )
                    )}
                </Row>
            </Col>
            <Switch>

            </Switch>
          <Row>
            <Link to={`/user/${this.props.user}/dashboard`}>
                <Button variant="primary">Back</Button>
            </Link>
          </Row>
        </Container>
    );
  }
}

// EditAlbum.propTypes = {
//     history: PropTypes.object.isRequired,
// }

export default EditAlbum;