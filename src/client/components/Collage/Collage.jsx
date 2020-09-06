import React from 'react';
import PropTypes from 'prop-types'

import { Container, Row } from 'react-bootstrap'
import ImgCard from '../ImgCard/ImgCard'
import pic_1 from './Images/card_pic_01.png'
import pic_2 from './Images/card_pic_02.png'
import pic_3 from './Images/card_pic_03.png'
import pic_4 from './Images/card_pic_04.png'

class Collage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        user : (()=>{
        let params = window.location.pathname;
        let currentUser = params.split('/')[2]
        return currentUser;
    })(),
        loggedIn : false,
        album: null,
    }
  }

  componentDidMount() {
    let album = this.props.album;
    let user = this.state.user;
    const url = `http://192.168.1.106:3000/api/${user}/album/${album}`
    // get all the pictures
    fetch(url)
      .then(res=>res.json())
      .then(res=> {
        this.setState(()=>({
            album: res
        }));
      })
      .catch(err=>console.log(err))
  }

  render() {
    // api call
    let allPics;
    if (this.state.album) {
        allPics = this.state.album.map((item, index) => {
        switch(item.img_url){
            case 'pic_1':
                return <ImgCard key={index} src={pic_1}/>
            case 'pic_2':
                return <ImgCard key={index} src={pic_2}/>
            case 'pic_3':
                return <ImgCard key={index} src={pic_3}/>
            case 'pic_4':
                return <ImgCard key={index} src={pic_4}/>
        }
    })
    } else {
        allPics = "RENDERING"
    }
    return (
        <Container>
            <Row>
                {allPics}
            </Row>
        </Container>
    );
  }
}

Collage.propTypes = {
    album: PropTypes.string.isRequired,
}

export default Collage;