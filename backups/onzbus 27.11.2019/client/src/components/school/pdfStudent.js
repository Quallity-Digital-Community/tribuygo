import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Barcode from 'react-barcode';

class pdfStudent extends Component {

    componentDidMount(){
        console.log(this.props.obj);
    }
    render() {
    return (
        <div className = "container">
            <div className = "row" style ={{marginTop: 10}}>
                <div className="card col-md-6" >
                    <div className="card-body" >
                        <h2 className="card-title"> Name : {this.props.obj.name}</h2>
                        <h4 className="card-text">Bus Number :  {this.props.obj.busId}</h4>
                        <h4 className="card-text">Address :{this.props.obj.address}</h4>
                        <p className="card-text"><Barcode value = {this.props.obj.scanId}/></p>
                        <small id="AppLink" className="form-text text-muted">  Please download Onzbus Application from App Store and scan this Id.  </small>                     
                    </div>
                </div>
            </div>    
        </div>    

    );
    }
}

export default pdfStudent;