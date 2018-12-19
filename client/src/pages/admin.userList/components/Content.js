import React from 'react'
import { Col, Table } from 'react-bootstrap'
import { loadUser } from '../../../helpers/api/adminApi/get-user.api'
import NavBarAdmin from '../../../components/NavBarAdmin/NavBarAdmin'
import Item from './Item'

export default class ContentField extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      item: {},
    }
  }
  componentWillMount() {
    loadUser((result) => {
      this.setState({
        users: result.users,
      });
    });
  }
  render() {
    return (
      <Col xs={12} md={9} lg={10}>
      <NavBarAdmin activeMenuItem="users"></NavBarAdmin>
      <Table striped responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>{this.createUser(this.state.users)}</tbody>
        </Table>
      </Col>
    )
  }
  createUser(userList) {
    var listItem = userList.map((item, index) => {
      return <Item no={index+1} key={index} user={item.user} fullName={item.fullName} phoneNumber={item.phoneNumber} birthday={item.birthday}
                   address={item.address} avatarAddress={item.avatarAddress} getData={this.getData}/>
    })
    return listItem;
  }
  updateInfo() {
    this.componentWillMount();
  }
}
