// create.component.js
import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './fileUpload.css'
import axios from 'axios';
import {getSchoolId} from '../helper'

export default class CreateBusRoute extends Component {
  constructor(props) {
    super(props);
    this.onChangeBusNumber = this.onChangeBusNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      busNumber: 'Bus ',
      selectedFile: null
    }
  }
  onChangeBusNumber(e) {
    this.setState({
      busNumber: e.target.value
    });
  }
  onChangeFile(e){
    console.log(e.target.files[0])
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  }


  onSubmit(e) {
    e.preventDefault();
    console.log("bus number added with ", this.state.busNumber);
    const obj = {
      busNumber: this.state.busNumber, 
      schoolId: getSchoolId()
    };
    axios.post('/api/busses/addBusRoute', obj)
        .then(function (data) {
         window.location.href = '/indexBusRoute';
        }).catch(function (error) {

        });
    
    this.setState({
      busNumber: ''
    })
  }

  handleClick(e){
    e.preventDefault();
    console.log("File being uploaded to server")
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    axios.post("http://172.105.92.110:4000/uploadBus", data, { 
      // receive two    parameter endpoint url ,form data
  }).then(res => { // then print response status
    console.log(res.statusText, res.data)
  })
}
   
  
  render() {
    return (
        <div className = "container" style={{ marginTop: 5 , padding:5}}>
          <div className = "row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
                <div><h6>Add New Bus :  (e.g  Bus 1, Bus 2, etc) </h6>
                    <input type="text" className="form-control" value={this.state.busNumber} onChange={this.onChangeBusNumber}
                    />
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Register Bus Route" className="btn btn-primary "/> 
                </div>                
            </form>
            </div>
            
	      <form method="post" action="#" id="#">
          <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" name = "file" onChange = {this.onChangeFile} multiple=""></input>
          </div>
          <div className="form-group">
              <input type="submit" value="Upload File" className="btn btn-success btn-block" onClick = {this.handleClick}/> 
          </div>                
            
        </form>
        </div>
      </div>
    )
  }
}