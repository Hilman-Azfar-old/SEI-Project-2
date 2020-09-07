import React from 'react';
import { Toast } from 'react-bootstrap'

class AlbumCard extends React.Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    e.target.name = this.props.data;
    this.props.onDelete(e)
  }

  render() {
    let { data } = this.props;
    return (
        <div>
             <Toast onClose={this.handleDelete}>
              <Toast.Header>
                <strong className="mr-auto">{ data }</strong>
              </Toast.Header>
            </Toast>
        </div>
    );
  }
}
//              <Card.Img variant="top" src="holder.js/100px180" />
export default AlbumCard;