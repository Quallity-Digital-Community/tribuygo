import React, {Component} from 'react';
import Header from '../../components/Layout/header'

import ls from 'local-storage'
import SchoolHeader from './schoolHeader.js';
import Map from './activeMap'

class schoolHome extends Component {  
  constructor(props){
    super(props);
    console.log(ls.get('schoolId'));
  }  
  render() { 
    
    return (
      <div>      
      <Header/>
      <SchoolHeader/>
      <Map/>
      </div>      
      
                
      
    );
  }
}

export default schoolHome;
