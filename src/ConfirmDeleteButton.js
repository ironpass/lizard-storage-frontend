import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import trash from './static/trash.svg';

class ConfirmDeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      file: props.file,
    };
    this.toggle = this.toggle.bind(this);
    this.deleteFile = props.deleteFile;
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  deleteAndToggle(file) {
    this.toggle()
    this.deleteFile(file)
  }

  render() {
    return (
      <React.Fragment>
        <Button className='deleteBtn' onClick={this.toggle}>
          <img className='deleteIcon' src={trash} alt='delete icon'/>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            Do you want to remove this file?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={()=>this.deleteAndToggle(this.state.file)}>Delete</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConfirmDeleteButton;