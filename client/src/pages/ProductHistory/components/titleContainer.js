import React, {Component} from 'react';

class TitleContainer extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th>  Product name </th>
          <th>  Quantity  </th>
          <th>  Unit Price  </th>
          <th>  Total </th>
          <th>  Action  </th>
        </tr>
      </thead>
    )
  }
}

export default TitleContainer