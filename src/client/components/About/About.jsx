import React from 'react';

import {} from 'react-bootstrap'

class About extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        user : (()=>{
            let params = window.location.pathname;
            let currentUser = params.split('/')[2]
            return currentUser;
        })(),
        description: null,
    }
  }

  componentDidMount() {
    const url = `http://192.168.1.106:3000/api/${this.state.user}/profile`
    fetch(url)
      .then(res=>res.json())
      .then(res=>{
        this.setState({
            description: res[0].description
        })
      })
      .catch(err=>console.log(err))
  }

  render() {
    return (
        <div>
            <h1>About me</h1>
            {this.state.description
            ? (<p>{this.state.description}</p>)
            : <p>Basic description goes here...</p>}
        </div>
    );
  }
}

export default About;