import { Component } from 'react';

class Position extends Component{
    render(){
        return {lat:this.props.obj.latitude, lng:this.props.obj.latitude}
    }
}

export default Position;