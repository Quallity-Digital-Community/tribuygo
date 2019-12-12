// create.component.js

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fileUpload.css'
import axios from 'axios';
import {getSchoolId} from '../helper'
import SchoolHeader from './schoolHeader'
import Header from '../../components/Layout/header'



export default class CreateSupervisor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      mobile : '',
      selectedFile: null
    }
  }
  onChangeName(e){this.setState({name : e.target.value});}
  onChangeEmail(e){this.setState({email : e.target.value});}
  onChangePassword(e){this.setState({password: e.target.value});}
  onChangeMobile(e){this.setState({mobile : e.target.value});}
  
  onChangeFile(e){
    console.log(e.target.files[0])
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  }


  onSubmit(e) {
    e.preventDefault();
    console.log( this.state.name, this.state.email, this.state.password, this.state.mobile);
    const obj = {
        name : this.state.name,
        email : this.state.email,
        password : this.state.password,
        mobile : this.state.mobile,
        schoolId: getSchoolId()
    };
    console.log(obj);
    axios.post('/api/supervisors/registerSupervisor', obj)
        .then(window.location.href = '/indexSupervisor');
    
    this.setState({
        name: '',
        email: '',
        password: '',
        mobile : ''
    })
  }

  handleClick(e){
    e.preventDefault();
    console.log("File being uploaded to server")
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    axios.post("http://172.105.92.110:4000/uploadSupervisor", data, { 
      // receive two    parameter endpoint url ,form data
  }).then(res => { // then print response status
    console.log(res.statusText, res.data)
  })
}
   
  
  render() {
    return (
        <div className = "container" style={{ marginTop: 1 , padding:5}}>
          <Header/>
          <SchoolHeader/>
          <div className = "row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
                <div><h6>Add New Supervisor </h6> Enter Supervisor Name : 
                    <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName}/>

Add Email:                     <input type = 'text' className = 'form-control' value = {this.state.email} onChange={this.onChangeEmail}/>
Add Password:                     <input type = 'text' className = 'form-control' value = {this.state.password} onChange={this.onChangePassword}/>
Add Contact Number :                    <input type = 'text' className = 'form-control' value = {this.state.mobile} onChange={this.onChangeMobile}/>

                </div>
                <div className="form-group">
                    <input type="submit" value="Register Supervisor" className="btn btn-primary "/> 
                </div>                
            </form>
            </div>
            
	      <form method="post" action="#" id="#">
          <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" name = "file" onChange = {this.onChangeFile} multiple=""></input>
          </div>
          <br />
          <div className="form-group">
              <input type="submit" value="Upload File" className="btn btn-success btn-block" onClick = {this.handleClick}/> 
          </div>                            
        </form>
        </div>
      </div>
    )
  }
}
