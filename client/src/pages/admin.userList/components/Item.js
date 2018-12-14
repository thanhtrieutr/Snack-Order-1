import React from 'react'
import { Button } from 'react-bootstrap'
import UserDetail from './Modal'
export default class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      stateModal: false
    }
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  showModal() {
    this.setState({
        stateModal: true
    });
  }
  closeModal(){
    this.setState({
        stateModal: false
    });
  }
  render() {
    return (
      <tr>
        <td>
          {this.props.no}
        </td>
        <td>
          {this.props.user}
        </td>
        <td>
          <Button bsStyle="link" onClick={this.showModal}>Details</Button>
        </td>
        <UserDetail bsSize="large" show={this.state.stateModal} onHide={this.closeModal}  user={this.props.user} fullName={this.props.fullName}
                    phoneNumber={this.props.phoneNumber} birthday={this.props.birthday} address={this.props.address}  avatarAddress={this.props.avatarAddress} id={this.props.id}/>
      </tr>
    )
  }
} 
