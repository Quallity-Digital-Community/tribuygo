import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import IndexStudent from './indexStudent.component';


import IndexReport from './reports.js'
import pdfPage from './pdfPage.js';
import printOne from './printOne';

export default class Header extends Component{

  constructor(props)
  {
    super(props);
    this.state = {
      schoolId : this.props.schoolId
    }
  }
  
  render(){
        return(
            <Router>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                      <Link to={'/'} className="nav-link">Home</Link> 
                    </li>
                    <li><Link to={'/indexBusRoute'} className="nav-link">Bus Routes</Link></li>
                    <li><Link to={'/indexStudent'} className="nav-link">Students</Link></li>
                    <li><Link to={'/indexSupervisor'} className="nav-link">Supervisors</Link></li>
                    <li><Link to={'/indexParent'} className="nav-link">Parents</Link></li>
                    <li><Link to={'/indexReport'} className="nav-link">Reports</Link></li>
                  </ul>
                </div>
              </nav> <br/>
              </div>

                  <Route path='/indexStudent' component={ IndexStudent } />
                  <Route path='/indexReport' component={ IndexReport } />
                  <Route path = "/pdfGenerate" component = {pdfPage}/>
                  <Route path = "/printOne/:id" component = {printOne}/>
            </Router>
        );
    
    }
}