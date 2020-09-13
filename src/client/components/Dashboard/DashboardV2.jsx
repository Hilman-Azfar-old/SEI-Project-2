import React from 'react';
import { Button,
         Navbar,
         Container, } from 'react-bootstrap'

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
        isProcess: false,
        file: null,
        filename: null,
    }

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePicTitle = this.handlePicTitle.bind(this);
    this.handleAddPicture = this.handleAddPicture.bind(this);
    this.handleDeletePicture = this.handleDeletePicture.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentDidMount() {
    const url = `/api/${this.state.user}/object`
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
    const url = `/api/new/album`

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
    const url = `/api/${this.state.user}/album/${album_id}`
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

  handlePicTitle(e) {
    this.setState({
        newPicture: e.target.value,
    })
  }

  handleFile(e){
    let newFile = e.target.files[0];
    this.setState(prevState=>({
        isProcess: !prevState.isProcess,
        file: newFile,
        filename: newFile.name
    }))
  }

  async handleAddPicture(e){
    e.preventDefault();
    let pos = parseInt(e.target.pos) + 1;
    let album = e.target.album;

    const url2 = `/api/new/picture`

    /* Api fetch

    Upload to cloudinary
    if ok
    add res url to db

    if fail throw error

    */
    const url = `https://api.cloudinary.com/v1_1/dk0bjhiu9/image/upload`

    try {
        if (this.state.file === null) {
            throw new Error('Enter an image url')
        }

        const data = new FormData();
        data.append('file', this.state.file)
        data.append('upload_preset', 'project_2')

        let res = await fetch(url, {
            method: "POST",
            body : data,
        })

        const uploadRes = await res.json()

        this.setState({
            newPicture: uploadRes.public_id
        })

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

        let response = await fetch(url2, requestOptions)
        if (response.status == '201') {
            this.setState(prevState=>({
            albums: prevState.albums.map(obj=>{
                if(obj.album === album){
                    obj.urls.push([album, this.state.newPicture, pos])
                }
                return obj
            }),
            file: null,
            filename: null,
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
    const url = `/api/del/picture`

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
        <React.Fragment>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="#home">
                    Gallery
                </Navbar.Brand>
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
                     pictureValue={this.state.newPicture}

                     onHandleFile={this.handleFile}
                     filename={this.state.filename}/>
        </Container>
        </React.Fragment>
    );
  }
}

export default Dashboard;