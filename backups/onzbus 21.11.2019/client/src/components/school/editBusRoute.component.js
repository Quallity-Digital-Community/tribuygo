import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fileUpload.css';
import axios from 'axios';


export default class EditBusRoute extends Component {
    constructor(props){
        super(props);
        this.onChangeBusNumber = this.onChangeBusNumber.bind(this);
        this.state = {
            busNumber: ''
        }
    }

    componentDidMount() {
        console.log('In component Did Mount ', this.props.match.params.id);
        axios.get('/api/busses/editBus/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 
                  busNumber: response.data.busNumber,
             }); 
            //console.log("Data sent is: ", this.state.busNumber);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onChangeBusNumber(e) {
        //console.log(this.state.busNumber);
        this.setState({busNumber: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        //console.log(this.state.busNumber);
        const obj = {
            busNumber: this.state.busNumber
        };
        console.log(obj);      
        axios.post('/api/busses/updateBus/'+this.props.match.params.id, obj)
        .then(window.location.href = '/indexBusRoute');   
        this.setState({
            busNumber: ''
        })
    }

    render() {
        return (
        <div className = "container" style={{ marginTop: 1 , padding:1}}>
          <div className = "row" >
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
                <div style ={{width:350}}><h6>Update Bus Informations : </h6>  
                    Change BusNumber: 
                    <input type="text"
                     style ={{width:350}} 
                     className="form-control"
                     value={this.state.busNumber} 
                     onChange={this.onChangeBusNumber}/>
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Change Bus Information" className="btn btn-primary "/> 
                </div>                
            </form>
            </div>
        </div>
      </div>
        )
    }
}