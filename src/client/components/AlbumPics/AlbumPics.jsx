import React from 'react';

import EditImageCard from '../EditImageCard/EditImageCard'

class AlbumPics extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <React.Fragment>
            { this.props.data.urls.length
              ? this.props.data.urls.map((url, index)=>{
                    return <EditImageCard   key={index}
                                            src={url[1]}
                                            uid={url}
                                            albumId={this.props.data.album_id}
                                            onDeletePicture={this.props.onDeletePicture}/>
                })
              : (<h3> No pictures in this album </h3>)
            }
        </React.Fragment>
    );
  }
}

export default AlbumPics;


// switch(url[1]){
//                         case 'pic_1':
//                             return <EditImageCard key={index}
//                                                   src={pic_1}
//                                                   uid={url}
//
//                         case 'pic_2':
//                             return <EditImageCard key={index}
//                                                   src={pic_2}
//                                                   uid={url}
//                                                   albumId={this.props.data.album_id}
//                                                   onDeletePicture={this.props.onDeletePicture}/>
//                         case 'pic_3':
//                             return <EditImageCard key={index}
//                                                   src={pic_3}
//                                                   uid={url}
//                                                   albumId={this.props.data.album_id}
//                                                   onDeletePicture={this.props.onDeletePicture}/>
//                         case 'pic_4':
//                             return <EditImageCard key={index}
//                                                   src={pic_4}
//                                                   uid={url}
//                                                   albumId={this.props.data.album_id}
//                                                   onDeletePicture={this.props.onDeletePicture}/>
//                     }

//                            <Col xs={{span:10, offset:1}}
//                                 sm={{span:4, offset:0}}
//                                 md={{span:3, offset:0}}
//                                  className="mb-2">
//                                  {item}
//                            </Col>