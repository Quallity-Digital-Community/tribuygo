import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fileUpload.css';
import axios from 'axios';
import {getSchoolId} from '../helper'

export default class editStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeClassrm = this.onChangeClassrm.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBusNumber = this.onChangeBusNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '', classrm: '',  mobile: '',  address : '',  busNumber: '',busses : []
    }
  }

  componentDidMount() {
    //console.log('In component Did Mount ', this.props.match.params.id);
    axios.get('/api/students/editStudent/'+this.props.match.params.id)
        .then(response => {
            this.setState({ 
              name: response.data.name, 
              classrm: response.data.classrm,
              mobile: response.data.mobile,
              address: response.data.address,
              busNumber: response.data.busId
         }); 
         console.log("Data sent is: ", response);
        })
        .catch(function (error) {
            console.log(error);
        })


         axios.get('/api/busses/getBusListTest/'+getSchoolId())
        .then(responses => {
          //console.log({busNumber: response.data[3].busNumber});
          this.setState({ busses: responses.data });
          console.log("Data busses is: ", responses.data);
          console.log("Data busses is: ", this.state.busses);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  onChangeName(e){this.setState({name : e.target.value});}
  onChangeClassrm(e){this.setState({classrm : e.target.value});}
  onChangeMobile(e){this.setState({mobile: e.target.value});}
  onChangeAddress(e){this.setState({address : e.target.value});}
  onChangeBusNumber(e) {this.setState({busNumber: e.target.value });}

  onChangeBusNumberdrop(e) {    
    console.log(e.target.value)
    this.setState({ value : e.target.value});
    console.log("dropdown clicked", this.state.value);
  }
  
  onSubmit(e) {
    e.preventDefault();
    //console.log( "Chcek tets",this.state.name, this.state.classrm, this.state.mobile, this.state.address, this.state.busNumber);
    const obj = {
        name : this.state.name,
        classrm : this.state.classrm,
        mobile : this.state.mobile,
        address : this.state.address,
        busId: this.state.busNumber
    };
    console.log(obj);
    axios.post('/api/students/updateStudent/'+this.props.match.params.id, obj)
    .then(window.location.href = '/indexStudent');   
    this.setState({
        name: '', classrm: '', mobile: '', address : '', busNumber: ''
    })
  }

   
  
  render() {

   
    return (
        <div className = "container" style={{ marginTop: 1 , padding:1}}>
          <div className = "row" >
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
                <div style ={{width:350}}><h6>Update Student Informations : </h6>  
                    Change Name: 
                    <input type="text" style ={{width:350}} className="form-control" value={this.state.name} onChange={this.onChangeName}/>

                    Edit Class :
                    <input type = 'text' style ={{width:350}} className = 'form-control' value = {this.state.classrm} onChange={this.onChangeClassrm}/>

                    Edit Contact Number:
                     <input type = 'text' style ={{width:350}} className = 'form-control' value = {this.state.mobile} onChange={this.onChangeMobile}/>

                    Edit address:
                     <input type = 'text' style ={{width:350}} className = 'form-control' value = {this.state.address} onChange={this.onChangeAddress}/>

                    Change Bus :
                    <input type = 'text' style ={{width:350}} className = 'form-control' value = {this.state.busNumber} onChange={this.onChangeBusNumber}/>
                     <div id = "bus">  Change Bus :                                                
                   
                    <select id = "busses" style ={{width:350}} value = {this.state.value} >
                       <option value = "1">Please Select One Bus </option>
                       {this.state.busses.map(fbb =>
                       <option key={fbb.id} value={fbb.id}>{fbb.busNumber}</option>
                         )};
                     </select>
                     </div>
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Change Student Information" className="btn btn-primary "/> 
                </div>                
            </form>
            </div>
        </div>
      </div>
    )
  }
}