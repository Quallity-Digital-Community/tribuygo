import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import editBus from './editBusRoute.component.js';


class TableRowBus extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  
  delete() {
    console.log("About to delete Bus: ", this.props.obj.busNumber );
    axios.get('api/busses/deleteBus/'+this.props.obj.id)
        .then(window.location.href = 'indexBusRoute')
        .catch(err => console.log(err))
  }

  render() {
    return (
      <Router>
        <tr>
          <td>
            {this.props.obj.busNumber}
          </td>
          <td>
          <Link to={"/editBus/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          <td><button onClick = {this.delete} className="btn btn-danger">Delete</button></td>
        </tr>
        <Switch>
            <Route path='/editBus/:id' component={ editBus } />
        </Switch>  
      </Router>  
    );
  }
}

export default TableRowBus;