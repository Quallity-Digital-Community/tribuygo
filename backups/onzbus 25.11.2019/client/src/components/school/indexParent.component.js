// index.component.js
import React, { Component} from 'react';
import TableRow from './TableRowSupervisor';
import {getSchoolId} from '../helper'
import axios from 'axios'
import SchoolHeader from './schoolHeader'
import Header from '../../components/Layout/header'

export default class IndexParent extends Component {

  constructor(props) {
      super(props);
      this.state = {parents: []};
    }
    componentDidMount(){
      axios.get('/api/parents/getAllParent/'+getSchoolId())
        .then(response => {
          this.setState({ parents: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
        
    }
    tabRow(){
      return this.state.parents.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      
      return (
       
  
         <div> 
           <Header/>
           <SchoolHeader/>
          <h3 align="center">Parent List</h3>
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
              {this.tabRow}
            </tbody>
          </table>
          </div>
    
      );
    }
  }