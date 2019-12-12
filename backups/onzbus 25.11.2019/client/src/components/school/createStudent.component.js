import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './fileUpload.css'
import Script from 'react-load-script';
import axios from 'axios';
import {getSchoolId} from '../helper'
import SchoolHeader from './schoolHeader'
import Header from '../../components/Layout/header'


export default class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeClassrm = this.onChangeClassrm.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBusNumber = this.onChangeBusNumber.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    

    this.state = {
      name: '', classrm: '', mobile: '', address : '', busNumber: [], busId: '', query: '',
      nameError: '', addressError: '', mobileError:'', 
      selectedFile: null,  geoCode:'', busses: [], 
    }
  }
  onChangeQuery = e => {this.setState({query : e.target.value});
  }
  onChangeName(e){this.setState({name : e.target.value}, () => {
    this.validateName();
  });
  }
  onChangeClassrm(e){this.setState({classrm : e.target.value});}
  onChangeMobile(e){this.setState({mobile: e.target.value}, () => {
    this.validateMobile();
  });}
  
  onChangeAddress(e){this.setState({address : e.target.value}, () => {
    this.validateAddress();
  });
}
  onChangeBusNumber(e) {    
    console.log(e.target.value)
    this.setState({
                    value : e.target.value
                   });
    console.log("dropdown clicked", this.state.value);
  }
  validateName = () => {
    const { name } = this.state;
    this.setState({
      nameError:
        name.length > 3 ? null : 'Name must be longer than 3 characters'
    });
  }
  validateAddress = () => {
    const { address } = this.state;
    this.setState({
      addressError:
        address.length > 3 ? null : 'Address must be longer than 3 characters'
    });
  }
  validateMobile = () => {
    const { mobile } = this.state;
    this.setState({
      mobileError:
        mobile.length > 9 ? null : 'Mobile number must be correct'
    });
  }

  componentDidMount() {
     //console.log("Go Git bus List");
     axios.get('/api/busses/getBusListTest/'+getSchoolId())
        .then(response => {
          //console.log({busNumber: response.data[3].busNumber});
          this.setState({ busses: response.data });
        })
        .catch(function (error) {
          console.log(error);
        });
      // console.log("testing", this.state.testBus); 
  };

  onChangeFile(e){
    console.log(e.target.files[0])
    this.setState({
      selectedFile: e.target.files[0],
      loaded: 0,
    })
  }

  handleScriptLoad = () => {
    const options = {
      componentRestrictions: {country: 'ae'}
    };

    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );    
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  } 

  handlePlaceSelect = () => {
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    if (address) {
      console.log("Address Object: ", addressObject);
      //console.log("Address : ", address);
      this.setState(
        {
          query: addressObject.description,
          geoCode: addressObject.formatted_address,
        }
      );
    } 
  }  
  onSubmit(e) {
    e.preventDefault();    
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:this.state.geoCode,
          key:'AIzaSyBgG9can04sw-SCdWIcWTgnD_rlUoiZaIk'
        }
      })
      .then(response => {
        // Log full response
        //console.log( "student detail: ", this.state.name, this.state.classrm, this.state.mobile, this.state.address, this.state.busNumber,this.state.query);
        console.log(response);
        this.lat = response.data.results[0].geometry.location.lat;
        this.lng = response.data.results[0].geometry.location.lng;
     }).then(data =>{
      console.log("Current value of street: ", this.state.query);
      const obj = {
          name : this.state.name,
          classrm : this.state.classrm,
          mobile : this.state.mobile,
          address : this.state.address, 
          street: this.state.query,
          busId: this.state.value,
          latitude: this.lat,
          longitude: this.lng, 
          schoolId: getSchoolId()
      };
      console.log("student sent: ", obj);
      axios.post('/api/students/addStudent', obj)
          .then(window.location.href = '/indexStudent');
      
      this.setState({
          name: '', classrm: '',mobile: '',address : '',busNumber: '',query:''
      }); 
    })
      .catch(function(error){
        console.log(error);
      });   
  }
  handleClick(e){
    e.preventDefault();
    console.log("File being uploaded to server")
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    axios.post("/api/uploads/uploadStudent/"+getSchoolId(), data, { 
      // receive two    parameter endpoint url ,form data
  }).then(res => { // then print response status
    console.log(res.statusText, res.data)
  })
  }
 
  
  render() {
    return (
      <div className = "container" style={{ marginTop: 1 , padding:1}}>
       <Header/>
        <SchoolHeader/>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBgG9can04sw-SCdWIcWTgnD_rlUoiZaIk&libraries=places"
          onLoad={this.handleScriptLoad}
        />
          <div className = "row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
                <div><h6>Add New Student </h6> 
                   <div id = "studentName" > Enter Student Name : 
                          <input id = "name" type="text" 
                          className={`form-control ${this.state.nameError ? 'is-invalid' : ''}`}
                          value={this.state.name}
                          onChange={this.onChangeName}
                          onBlur={this.validateName}/>
                          <div className='invalid-feedback'>{this.state.nameError}</div>
                    </div>      
                    <div id = "classRoom" >   Add Class :
                            <input type = 'text' 
                            className = 'form-control' 
                            value = {this.state.classrm} 
                            onChange={this.onChangeClassrm}/>
                    </div>
                    <div id = "contactNumber">Add Contact Number: 
                    <small id="addressHelp" className="form-text text-muted">Pl provide contact Number of Parent</small>
                            <input type = 'text' 
                             className = {`form-control ${this.state.mobileError ? 'is-invalid' : ''}`} 
                             value = {this.state.mobile} 
                             onChange={this.onChangeMobile}
                             onBlur={this.validateMobile}/>
                            <div className='invalid-feedback'>{this.state.mobileError}</div> 
                    </div>

                    <div id = "homeAddress"> Add Home/Building:  
                    <small id="addressHelp" className="form-text text-muted">Write Home number or building name</small>                     
                           <input id = "address" type = 'text' 
                                            className = {`form-control ${this.state.addressError ? 'is-invalid' : ''}`}
                                            value = {this.state.address} 
                                            onChange={this.onChangeAddress} 
                                            onBlur={this.validateAddress}/>
                                 <div className='invalid-feedback'>{this.state.addressError}</div>
                    </div> 
                    <div id = "street">   Select Street:  
                    <small id="addressHelp" className="form-text text-muted">Only select Street from suggestions shown. Please do not write address by yourself </small>
                         <input id="autocomplete"
                                className = 'form-control'   
                                value={this.state.query} 
                                onChange={this.onChangeQuery}/>
                    </div>
                    <div id = "bus">   Select Bus :                                                   
                   
                    <select id="busses" className="select form-control" 
                    value = {this.state.value} 
                    onChange = {this.onChangeBusNumber} 
                     >
                            {this.state.busses.map(item => (
                              <option key={item.id} value={item.id}>
                                  {item.busNumber}
                        </option>
                  ))}
                    </select>
                
                </div>
                </div>
                <br/>
                <div className="form-group">
                    <input type="submit" value="Register Student" className="btn btn-primary "/> 
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