import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRowBus';
import {getSchoolId} from '../helper'
import SchoolHeader from './schoolHeader'
import Header from '../../components/Layout/header'

export default class IndexBusRoute extends Component {

  constructor(props) {
      super(props);
      //console.log(getSchoolId());
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('/api/busses/getBusListTest/'+ getSchoolId())
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
        
        <div>
          <Header/>
          <SchoolHeader/>
        <Link to= {"/createBusRoute"} className="btn btn-primary btn-lg m-6">Add Bus Route</Link>
        
        <div>
          <h4 align="center">Buses List</h4>
          <table className="table table-striped" style={{ marginTop: 1 }}>
            <thead>
              <tr>
                <th>Bus Number</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
        </div>
        
          
        
      );
    }
  }