// index.component.js
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRowSupervisor';
import CreateSupervisor from './createSupervisor.component';
import {getSchoolId} from '../helper'
import SchoolHeader from './schoolHeader'
export default class IndexSupervisor extends Component {

  constructor(props) {
    
    super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('/api/supervisors/getAllSupervisor/'+getSchoolId())
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
          <Router>
            <SchoolHeader/>
            <div>
              <Link to={"/addSupervisor"} className="btn btn-primary btn-lg m-4">Add Supervisor</Link>
              <h3 align="center">Supervisor List</h3>
              <table className="table table-striped" style={{ marginTop: 5 }}>
                <thead>
                  <tr>
                    <th> Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  { this.tabRow() }
                </tbody>
              </table>
            </div>
            <Switch>
            <Route path='/addSupervisor' component={ CreateSupervisor } />
            </Switch>  
            </Router>
      );
    }
  }