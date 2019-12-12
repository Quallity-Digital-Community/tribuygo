import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import { browserHistory } from 'react-router';
//import ShowMap from './components/showMap.component';   
import ls from 'local-storage'
import Header from './schoolHeader.js';
//import Login from './login'

class schoolHome extends Component {  
  constructor(props){
    super(props);
    console.log(ls.get('schoolId'));
  }  
  render() { 
    
    return (
        <Router>
          <Fragment>
            <Header/>
            
           </Fragment>
                
      </Router>
    );
  }
}

export default schoolHome;
