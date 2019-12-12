import React from 'react';
import {BrowserRouter as Router, Switch, Route,withRouter} from 'react-router-dom'
import Header from "./components/Layout/header.js"
import schoolHome from './components/school/schoolHome'
import registerSchool from './components/Layout/Register'
import BusList from './components/school/indexBusRoute'
import SupervisorList from './components/school/indexSupervisor.component'
import ParentList from './components/school/indexParent.component'

function App() {
  return (
    <Router>   
      <Switch>     
          <Route exact path="/" component = {Header}/>
          <Route exact path="/school/schoolHome" component = {schoolHome}/>          
          <Route exact path="/register" component = {registerSchool}/>            
          <Route exact path="/indexSupervisor" component={withRouter(SupervisorList)}/>
          <Route exact path="/indexBusRoute" component = {withRouter(BusList)}/>
          <Route exact path="/indexParent" component = {ParentList}/>
      </Switch>    
    </Router>
  );
  
}

export default App;
