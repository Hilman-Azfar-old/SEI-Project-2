import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import { InputGroup,
         FormControl,
         Col,
         Button,
         Row,
         Navbar,
         Container, } from 'react-bootstrap'
import ProtectedRoute from '../../Auth/ProtectedRoute'

import EditAlbum from '../EditAlbum/EditAlbum'
import Logout from '../Logout/Logout'

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
        newPicture: '',
    }

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePicTitle = this.handlePicTitle.bind(this);
    this.handleAddPicture = this.handleAddPicture.bind(this);
    this.handleDeletePicture = this.handleDeletePicture.bind(this);
  }

  componentDidMount() {
    const url = `http://localhost:3000/api/${this.state.user}/object`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{

        const userData = res.map(item=> {
            if (item.urls[0] !== null) {
                item.urls = item.urls.map(item=>item.split(':'))
            } else {
                item.urls = []
            }
            return item
        })

        this.setState({
            albums: userData
        })
    })
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
        if (this.state.newTitle === '') {
            throw new Error('Enter a name')
        }
        let response = await fetch(url, requestOptions)
        if (response.status == '201') {
            let data = await response.json();
            this.setState(prevState => ({
                albums: prevState.albums.length ?
                    [...prevState.albums,
                        {album_id: data.album_id,
                         album: this.state.newTitle,
                         urls: []}]
                    : [{album_id: data.album_id,
                        album: this.state.newTitle,
                        urls: []}],
                newTitle: '',
            }))
        } else {
            throw new Error(response.status)
        }
    } catch(err) {
        console.log(err);
        alert('Unable to create album')
    }
  }

  update(e) {
    e.preventDefault();
  }

  async delete(e) {
    e.preventDefault();
    let {album, album_id} = e.target.name
    const url = `http://localhost:3000/api/${this.state.user}/album/${album_id}`
    // need to delete from images too
    const requestOptions = {
        method: 'DELETE',
        }

    fetch(url, requestOptions)
    .then(res=>{
        if(res.status === 200) {
        this.setState(prevState=> ({
            albums: prevState.albums.filter(obj=>obj.album !== album)
        }))
        } else {
            console.log(res);
            throw new Error("try again")
        }
    })
    .catch(err=>console.log(err))
  }

  handleChange(e) {
    this.setState({
        newTitle: e.target.value,
    })
  }

  handleClick(){
    console.log(this.state);
  }

  handlePicTitle(e) {
    this.setState({
        newPicture: e.target.value,
    })
  }

  async handleAddPicture(e){
    e.preventDefault();
    let pos = parseInt(e.target.pos) + 1;
    let album = e.target.album;

    const url = `http://localhost:3000/api/new/picture`

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.state.user,
            title: album,
            img_url: this.state.newPicture,
            pos: pos,
        })
    };

    try {
        if (this.state.newPicture === '') {
            throw new Error('Enter an image url')
        }
        let response = await fetch(url, requestOptions)
        if (response.status == '201') {
            this.setState(prevState=>({
            albums: prevState.albums.map(obj=>{
                if(obj.album === album){
                    obj.urls.push([album, this.state.newPicture, pos])
                }
                return obj
            }),
            newPicture: '',
            }))
        } else {
            throw new Error(response.status)
        }
    } catch(err) {
        console.log(err);
        alert('Unable to add picture')
    }
  }

  async handleDeletePicture(e){
    let [album, picture, pos] = e.target.value.split(',');
    let albumId = e.target.albumId;
    const url = `http://localhost:3000/api/del/picture`

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            albumId: albumId,
            pos: pos,
        })
    }

    try {
        let response = await fetch(url, requestOptions)
        if (response.status == '200') {
            this.setState(prevState=>({
                albums: prevState.albums.map(obj=>{
                    if (obj.album_id === albumId) {
                        obj.urls = obj.urls.filter(array=>array[2] != pos)
                    }
                    return obj
                })
            }))
        } else {
            throw new Error(response.status)
        }
    } catch(err) {
        console.log(err);
        alert('Oh no error')
    }
  }

  render() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">
                    Gallery
                </Navbar.Brand>
                <Button onClick={this.handleClick}>
                State Checker
                </Button>
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="mr-3">
                    Signed in as: {this.state.user}
                </Navbar.Text>
                    <Logout />
                </Navbar.Collapse>
            </Navbar>

        <Container className="mt-5 pt-5" id="Dashboard">
          <EditAlbum albums={this.state.albums}
                     onDelete={this.delete}
                     user={this.state.user}

                     onTitleChange={this.handleChange}
                     onCreate={this.create}
                     value={this.state.newTitle}

                     onPicTitleChange={this.handlePicTitle}
                     onAddPicture={this.handleAddPicture}
                     onDeletePicture={this.handleDeletePicture}
                     pictureValue={this.state.newPicture}/>
        </Container>
        </div>
    );
  }
}

export default Dashboard;