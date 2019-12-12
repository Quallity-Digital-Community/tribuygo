import React from 'react';
import {BrowserRouter as Router, Switch, Route,withRouter} from 'react-router-dom'
import Header from "./components/Layout/header.js"
import Forgotpasswordreqeust from './components/Layout/Forgotpasswordreqeust';
import Changepassword from './components/Layout/Changepassword';
import SchoolList from './components/school/Getallschool';
import schoolHome from './components/school/schoolHome'
import registerSchool from './components/Layout/Register'
import BusList from './components/school/indexBusRoute'
import SupervisorList from './components/school/indexSupervisor.component'
import ParentList from './components/school/indexParent.component'
import IndexStudent from './components/school/indexStudent.component'
import CreateBusRoute from './components/school/createBusRoute.component'
import pdfPage from './components/school/pdfPage';
import printOne from './components/school/printOne'
import CreateStudent from './components/school/createStudent.component'
import CreateSupervisor from './components/school/createSupervisor.component'  
import Login from './components/Layout/login'
import EditStudent from './components/school/editStudent.component'

function App() {
  return (
    <Router>   
      <Switch>     
          <Route exact path="/" component = {Header}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/school/schoolHome" component = {schoolHome}/>          
          <Route exact path="/register" component = {registerSchool}/>
          <Route path='/indexStudent' component={ IndexStudent } />            
          <Route exact path="/indexSupervisor" component={withRouter(SupervisorList)}/>
          <Route exact path="/indexBusRoute" component = {BusList}/>
          <Route exact path="/indexParent" component = {ParentList}/>
          <Route exact path="/forgotpasswordreqeust" component = {Forgotpasswordreqeust}/>
          <Route exact path="/change_password/:email" component = {Changepassword}/>
          <Route exact path="/administrator/school/list" component = {SchoolList}/>
          <Route path='/addSupervisor' component={ CreateSupervisor } />
          <Route exact path = "/createBusRoute" component={CreateBusRoute}/>
          <Route path='/editStudent/:id' component={ EditStudent } />
          <Route path = "/pdfGenerate/:schoolId" component = {pdfPage}/>
          <Route exact path='/addStudent' component={ CreateStudent } />
          <Route exact path = '/printOne/:id' component = {printOne}/>
      </Switch>    
    </Router>
  );
  
}

export default App;
