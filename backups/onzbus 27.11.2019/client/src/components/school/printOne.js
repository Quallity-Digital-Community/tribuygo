import React,{Component} from 'react';
import axios from 'axios';
import TableRow from './pdfStudent';

export default class pdfPage extends Component{
    constructor(props) {
        super(props);
        this.state = {student: []};
      }
    componentDidMount(){
      console.log("In print One with ID: "+this.props.match.params.id);  
      axios.get('/api/students/editStudent/'+this.props.match.params.id)
          .then(response => {
            console.log(response.data);  
            this.setState({ student: response.data });
          })
          .catch(function (error){
            console.log(error);
          })
      }
      
      tabRow1(){
        return <TableRow obj={this.state.student} />;
      }
      render(){
        return(   
            <p>{this.tabRow1()}</p>
        );         
    }
}
