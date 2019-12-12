import { BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import TableRow from './tableBody'
import axios from 'axios';



export default class Reports extends Component {

  constructor(props) {
      super(props);
      this.state = {trips: []};
    }
    componentDidMount(){
      axios.get('http://172.105.92.110:4000/getAllTrips')
        .then(response => {
          this.setState({ trips: response.data });
          //console.log(this.state.trips);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
        console.log(this.state.trips);
        return this.state.trips.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
        //console.log(this.componentDidMount());
        return (          
          <Router>
            <div>              
              <h3 id = "tripsTable" align="center">Trips Detail</h3>
              <table className="table table-striped" style={{ marginTop: 5 }}>
                <thead>
                  <tr>
                    <th> Bus Number</th>
                    <th>Supervisor Name</th>
                    <th>Date </th>
                    <th>Time</th>                    
                  </tr>
                </thead>
                <tbody>
                  { this.tabRow() }
                </tbody>
              </table>
            </div>
            <Switch>
            
            </Switch>  
            </Router>
          
            );
      
    }
  }