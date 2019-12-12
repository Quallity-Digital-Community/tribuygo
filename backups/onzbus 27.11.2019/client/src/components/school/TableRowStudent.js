import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// eslint-disable-next-line
import ReactDOM from 'react-dom'
import Barcode from 'react-barcode';
import axios from 'axios';
import EditStudent from './editStudent.component'

class TableRowStudent extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.printStudent = this.printStudent.bind(this);
  }
  delete() {
    console.log("About to delete a Student");
    axios.get('/api/students/deleteStudent/'+this.props.obj.id)
        // .then(window.location.replace('/indexStudent'))
        .then(window.location.href = '/indexStudent')
        .catch(err => console.log(err))
  }

  printStudent(){
    console.log("Printing Student : ",this.props.obj.id );
    axios.get('/api/students/printStudent/pdf/'+this.props.obj.id ,{
        responseType: 'arraybuffer',
        headers: {'Accept': 'application/pdf' }
    }).then((response) => {
      const blob = new Blob([response.data], {type: 'application/pdf'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `ID Card.pdf`;
      link.click();
    }).catch(function (error) {
          console.log(error);
    })
  }
  render() {
    console.log(this.props.obj.bus)
    return (
      <Router>
      <tr>     
          <td>{this.props.obj.name}</td>
          <td>{this.props.obj.classrm}</td>
          <td>{this.props.obj.mobile}</td>
          <td>{this.props.obj.address}</td>
          <td>{this.props.obj.bus.busNumber}</td>
          <td><Barcode   value = {this.props.obj.scanId}/></td>
          <td><Link to={"/editStudent/"+this.props.obj.id} className="btn btn-primary">Edit</Link></td>
          <td><button onClick = {this.printStudent} className="btn btn-info">Print Card</button></td>
          <td><button onClick = {this.delete} className="btn btn-danger">Delete</button></td>
        </tr>
        <Switch>
          <Route path='/editStudent/:id' component={ EditStudent } />
        </Switch>
      </Router>  
    );
  }
}

export default TableRowStudent;