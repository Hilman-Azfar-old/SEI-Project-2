import React from 'react';
import { InputGroup,
         FormControl,
         Col,
       } from 'react-bootstrap'

class About extends React.Component {
  constructor(props) {
    super(props)
    this.handleDescChange = this.handleDescChange.bind(this)
  }

  handleDescChange(e){
    this.props.onDescriptionChange(e.target.value);
  }

  render() {
    let {description} = this.props.about.about;
    console.log(this.props);
    return (
        <div>
            <Col sm={{span:8, offset:1}}>
            <h4>Edit your profile here</h4>
            <InputGroup size="sm">
            <InputGroup.Prepend>
                <InputGroup.Text>Description</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea"
                         aria-label="With textarea"
                         onChange={this.handleDescChange}
                         defaultValue={description} />
            </InputGroup>
            <button className="mt-2"> Save </button>
            </Col>
        </div>
    );
  }
}

export default About;