import React, {Component} from 'react';

class TitleContainer extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th className="has-background-grey-lighter">
            Product name
          </th>
          <th className="has-background-grey-lighter" >
            Quantity
          </th>
          <th className="has-background-grey-lighter">
            Unit Price
          </th>
          <th className="has-background-grey-lighter">
            Total
          </th>
          <th className="has-background-grey-lighter">
            Action
          </th>
        </tr>
      </thead>
    )
  }
}

export default TitleContainer