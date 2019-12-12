import React, { Component } from 'react';

class buslist extends Component{
    
    render(){
        return (
            
            <option value = {this.props.obj.id}>{this.props.obj.busNumber}</option>
            
        );
    }
}

export default buslist;