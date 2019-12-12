import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SchoolHeader from './schoolHeader'
import Header from '../../components/Layout/header'
import axios from 'axios';
import TableRow from './TableRowStudent';
import { getSchoolId } from '../helper';

export default class IndexStudent extends Component {

  constructor(props) {
      super(props);
      console.log("Schhol Id: ",getSchoolId())
      this.state = {students: []}; 
    }
    componentDidMount(){
      axios.get('/api/students/getAllStudents/'+ getSchoolId())
        .then(response => {
          console.log("Student List: ", response.data);
          this.setState({ students: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }       
    tabRow(){
      return this.state.students.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    printCards(){
      console.log("Printing all cards...", getSchoolId());
        axios.get('/api/students/exportAll/pdf/'+getSchoolId(),{
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
        
        <div>
        <Header/>
        <SchoolHeader/>
        
          <h3 align="center">Student List</h3>
          <button onClick = {this.printCards} className="btn btn-danger"> Print Card for All Students </button>    
          <Link to={"/addStudent"} className="btn btn-primary btn-lg m-4">Add Student</Link>      
          <table className="table table-striped" style={{ marginTop: 1 }}>
            <thead>
              <tr>
                
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
        
        
      );
    }
  }