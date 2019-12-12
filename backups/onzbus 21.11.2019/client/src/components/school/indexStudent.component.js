import pdfPage from './pdfPage.js';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import axios from 'axios';
import TableRow from './TableRowStudent';
import CreateStudent from './createStudent.component';

export default class IndexStudent extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []}; 
    }
    componentDidMount(){
      axios.get('http://172.105.92.110:4000/getAllStudents')
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

    printCards(){
      console.log("Printing all cards...");
      axios.get('http://172.105.92.110:4000/exportAll/pdf',{
        responseType: 'arraybuffer',
        headers: {'Accept': 'application/pdf' }
    }).then((response) => {
      const blob = new Blob([response.data], {type: 'application/pdf'});
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `ID Cards.pdf`;
      link.click();
    }).catch(function (error) {
          console.log(error);
        })      
    }

    render() {
      return (
        <Router>
        <div>
          <h3 align="center">Student List</h3>
          <button onClick = {this.printCards} className="btn btn-danger"> Print Card for All Students </button>    
          <Link to={"/addStudent"} className="btn btn-primary btn-lg m-4">Add Student</Link>      
          <table className="table table-striped" style={{ marginTop: 1 }}>
            <thead>
              <tr>
                <th></th>
                <th>Student Name</th>
                <th>Class Room</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Bus Number</th>
                <th>Barcode</th>
                <th colSpan="3">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
        <Switch>
          <Route path = "/pdfGenerate" component = {pdfPage}/>
          <Route exact path='/addStudent' component={ CreateStudent } />
        </Switch>
        </Router>
      );
    }
  }