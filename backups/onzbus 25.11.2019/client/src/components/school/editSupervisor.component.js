import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fileUpload.css';
import axios from 'axios';

export default class editSupervisor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        name: '', email: '', password: '', mobile : '',
      }
  }
  onChangeName(e){this.setState({name : e.target.value});}
  onChangeEmail(e){this.setState({email : e.target.value});}
  onChangePassword(e){this.setState({password: e.target.value});}
  onChangeMobile(e){this.setState({mobile : e.target.value});}
  

  componentDidMount() {
    //console.log('In component Did Mount ', this.props.match.params.id);
    axios.get('/api/supervisors/editUser/'+this.props.match.params.id)
        .then(response => {
            this.setState({ 
                name : response.data.name,
                email : response.data.email,
                password : response.data.password,
                mobile : response.data.phone
         }); 
         
         //console.log("Data recieved is: ", response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
  }
  
  onSubmit(e) {
    e.preventDefault();
    //console.log( "Chcek tets",this.state.name, this.state.classrm, this.state.mobile, this.state.address, this.state.busNumber);
    const obj = {
        name : this.state.name,
        email : this.state.email,
        password : this.state.password,
        mobile : this.state.mobile
    };
    console.log(obj);
    axios.post('/api/supervisors/updateUser/'+this.props.match.params.id, obj)
    .then(window.location.href = '/indexSupervisor');   
    this.setState({
        name: '', email: '', password: '', mobile : '',
    })
  }
  
  
  render() {
    return (
        <div className = "container" style={{ marginTop: 1 , padding:5}}>
          <div className = "row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmit}>
                <div><h6>Add New Supervisor </h6> 
                Change Name : 
                <input  type="text" 
                        className="form-control" 
                        value={this.state.name} 
                        onChange={this.onChangeName}
                />
                Change Email:
                <input  type = 'text' 
                        className = 'form-control' 
                        value = {this.state.email} 
                        onChange={this.onChangeEmail}
                />
                Change Password:
                <input  type = 'text' 
                        className = 'form-control' 
                        value = {this.state.password} 
                        onChange={this.onChangePassword}
                />
                Change Contact Number :
                <input  type = 'text' 
                        className = 'form-control' 
                        value = {this.state.mobile} 
                        onChange={this.onChangeMobile}
                />
                </div>

                <div className="form-group">
                    <input type="submit" value="Change Supervisor" className="btn btn-primary "/> 
                </div>                
            </form>
            </div>
        </div>
      </div>
    )
  }
}
