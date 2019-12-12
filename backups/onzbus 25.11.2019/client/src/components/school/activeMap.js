import React, { Component } from 'react';
import { Map,  Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import {getSchoolId} from '../helper'

const mapStyles = {
    width: '100%',
    height: '90%',  
  };
  
class ShowMap extends Component {

    constructor(props){
        super(props);
        this.state = {trips: [],
            showingInfoWindow: false,  
            activeMarker: {},          
            selectedPlace: {}   
        }
    }
        
    componentDidMount(){
        console.log("Map Loaded"); 
        axios.get('/api/busses/getActiveTrips/'+getSchoolId())
        .then(response => {
          this.setState({ trips: response.data });
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        }) 
    }
    
    displayMarkers = () => {
        return this.state.trips.map((trip, index) => {
          return <Marker key={index} id={index} position={{
           lat: trip.latitude,
           lng: trip.longitude
         }} 
         onClick={this.onMarkerClick}
         name={trip.busNumber+" with : "+ trip.supervisorName} />
        })
      }
      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
      onClose = props => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          });
        }
      };
       
    render() {
        return (
    
            <div className = "busMap">
                <Map google={this.props.google} zoom={13} style={mapStyles} initialCenter={{ lat: 24.4333399, lng: 54.467061}}>
                {this.displayMarkers()}
                <InfoWindow         
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}  
                >
                    <div>{this.state.selectedPlace.name} </div>
                </InfoWindow>
                </Map>
        </div>
        
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBgG9can04sw-SCdWIcWTgnD_rlUoiZaIk'
  })(ShowMap);
  
  

