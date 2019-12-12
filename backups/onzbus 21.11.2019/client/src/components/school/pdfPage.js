import React,{Component} from 'react';
import axios from 'axios';
import TableRow from './pdfStudent';

export default class pdfPage extends Component{
    constructor(props) {
        super(props);
        this.state = {student: []};
      }
    componentDidMount(){
        axios.get('http://172.105.92.110:4000/getAllStudents')
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
