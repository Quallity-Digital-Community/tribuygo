import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import editSupervisor from './editSupervisor.component.js';

class TableRowSupervisor extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  
  delete() {
    console.log("About to delete Supervisor: ", this.props.obj.busNumber );
    axios.get('api/supervisors/deleteSupervisor/'+this.props.obj.id)
        .then(window.location.href = '/indexSupervisor')
        .catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
        <tr>
          <td>{this.props.obj.name}</td>
          <td>{this.props.obj.email}</td>
          <td>{this.props.obj.phone}</td>
          <td><Link to={"/editSupervisor/"+this.props.obj.id} className="btn btn-primary">Edit</Link></td>
          <td><button onClick ={this.delete} className="btn btn-danger">Delete</button></td>
        </tr>
        <Switch>
          <Route exact path='/editSupervisor/:id' component={ editSupervisor } />
        </Switch>
      </Router>
    );
  }
}

export default TableRowSupervisor;