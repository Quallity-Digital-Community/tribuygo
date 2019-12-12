import React,{Component} from 'react';
import axios from 'axios';
import TableRow from './pdfStudent';
import {getSchoolId} from '../helper'
export default class pdfPage extends Component{
    constructor(props) {
        super(props);
        this.state = {student: []};
      }
    componentDidMount(){
      console.log("Props recieved: ", this.props.match.params.schoolId)  
      axios.get('/api/students/getAllStudents/'+ this.props.match.params.schoolId)
          .then(response => {
            console.log(response.data);  
            this.setState({ student: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
      }      
      tabRow(){
        return this.state.student.map(function(object, i){
           return <TableRow obj={object} key={i} />;
        });
      }
      render(){
        return(   
            <p>{this.tabRow()}</p>
        );         
    }
}
