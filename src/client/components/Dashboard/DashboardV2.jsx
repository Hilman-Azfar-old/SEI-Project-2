import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { InputGroup, FormControl, Col, Button, Row } from 'react-bootstrap'
import ProtectedRoute from '../../Auth/ProtectedRoute'

import CreateAlbum from '../CreateAlbum/CreateAlbum'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        user : (()=>{
        let params = window.location.pathname;
        let currentUser = params.split('/')[2]
        return currentUser;
        })(),
        description: null,
        albums: [],
        newTitle: '',
    }

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const url = `http://localhost:3000/api/${this.state.user}/object`
    fetch(url)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  async create(e) {
    e.preventDefault();
    const url = `http://localhost:3000/api/new/album`

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.state.user,
            title: this.state.newTitle,
        })
    };
    try {
        let response = await fetch(url, requestOptions)
        if (response.status == '201') {
            alert('created ', this.state.newTitle)
        } else {
            throw new Error(response.status)
        }
    } catch(err) {
        alert('Unable to create album')
    }
  }

  update(e) {
    e.preventDefault();
  }

  delete(e) {
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
        newTitle: e.target.value,
    })
  }

  render() {
    return (
        <div>
            <Row>
            <Switch>
                <Route exact path="/user/:user/dashboard">
                <Col className="text-center" sm={{span: 6, offset: 3}}>
                    <h4>What would you like to do?</h4>
                    <nav className="m-4 justify-content-around d-flex">
                        <Link to={`/share/${this.state.user}`}>
                        <Button variant="primary">View</Button>
                        </Link>
                        <Link to={`/user/${this.state.user}/dashboard/create`}>
                        <Button variant="primary">Create</Button>
                        </Link>
                        <Link to={`/user/${this.state.user}/dashboard/edit`}>
                        <Button variant="primary">Edit</Button>
                        </Link>
                    </nav>
                </Col>
                </Route>
                <ProtectedRoute exact
                                path="/user/:user/dashboard/create">
                    <CreateAlbum onTitleChange={this.handleChange}
                                 onCreate={this.create}/>
                </ProtectedRoute>
                <Route exact path="/user/:user/dashboard/edit">
                    <h1> Edit </h1>
                </Route>
            </Switch>
            </Row>
        </div>
    );
  }
}

export default Dashboard;