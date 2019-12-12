import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Moment from 'react-moment'



class tableBody extends Component {
  render() {
    return (      
      <tr>          
          <td>{this.props.obj.busNumber}</td>
          <td>{this.props.obj.supervisorName}</td>
          <td>{<Moment date = {this.props.obj.createdAt} format="DD/MM/YYYY"/>}</td>
          <td>{<Moment date = {this.props.obj.createdAt} format="HH:MM:SS"/>   }</td>
          
      </tr>
        
    );
  }
}

export default tableBody;