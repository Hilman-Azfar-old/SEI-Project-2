import React from 'react';
import auth from '../../Auth/Auth'
import { Route, Link, Switch } from 'react-router-dom'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import CreateAlbum from '../CreateAlbum/CreateAlbum'
import AlbumCard from '../AlbumCard/AlbumCard'
import AlbumPics from '../AlbumPics/AlbumPics'

class EditAlbum extends React.Component {
  constructor(props){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e){
    this.props.onDelete(e)
  }

  render() {
    return (
    <Row id="EditAlbum"
         className="text-center"
         xs={{span: 10, offset: 1}}
         sm={{span:10, offset:1}}
         md={{span:12, offset:0}}
         lg={{span:10, offset:1}}>
        <Switch>
        <Route exact path={`/user/${this.props.user}/dashboard`}>
            {this.props.albums.map((item, index) => (
                    <Col key={index} xs={{span:10, offset:1}}
                                     sm={{span:4, offset:0}}
                                     md={{span:3, offset:0}}
                                     className="mb-2">
                    <Link to={`/user/${this.props.user}/dashboard/${item.album}`}>
                        <AlbumCard onDelete={this.handleDelete}
                                   data={item}/>
                    </Link>
                    </Col>

            ))}
            <CreateAlbum onTitleChange={this.props.onTitleChange}
                         onCreate={this.props.onCreate}
                         value={this.props.value}/>
        </Route>
        {this.props.albums.map((item, index) => (
            <Route key={index} path={`/user/${this.props.user}/dashboard/${item.album}`}>
                <Col xs={12}>
                    <h3>Pics for album</h3>
                </Col>
                <AlbumPics data={item}
                           user={this.props.user}/>
                <Col xs={12}>
                <Link to={`/user/${this.props.user}/dashboard`}>
                    <Button variant="primary">
                        Back
                    </Button>
                </Link>
                </Col>
            </Route>
        ))}
        </Switch>
    </Row>
    );
  }
}

// EditAlbum.propTypes = {
//     history: PropTypes.object.isRequired,
// }

export default EditAlbum;