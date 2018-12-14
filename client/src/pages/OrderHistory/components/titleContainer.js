import React, {Component} from 'react';

class TitleContainer extends Component {
  render () {
    return (
      <thead>
        <tr>
          <th  className="display-item"> Product name </th>
          <th  className="display-item"> Quantity  </th>
          <th  className="display-item"> Unit Price  </th>
          <th  className="display-item"> Total </th>
          <th  className="display-item"> Action  </th>
        </tr>
      </thead>
    )
  }
}

export default TitleContainer