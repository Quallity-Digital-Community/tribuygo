import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
class TableRowSupervisor extends Component {

  render() {
    return (
      
        <tr>
          <td>{this.props.obj.name}</td>
          <td>{this.props.obj.email}</td>
          <td>{this.props.obj.phone}</td>
        </tr>
        
    );
  }
}

export default TableRowSupervisor;