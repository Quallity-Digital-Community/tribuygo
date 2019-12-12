import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Logo from './logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Login from './login';

const useStyles = makeStyles(theme => ({
  background : '#AF3024',
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const headerStyle = {
  background:'#AF3024',
  IconButton :{
    height: 80,
  },
}

export default function ButtonAppBar() {
  const classes = useStyles();

  return (

    <Router>
        <div className={classes.root}>
          <AppBar position="static" style = {headerStyle} title={<img src={Logo} alt="logo pic" />}>
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Link to = "/"><img src ={Logo} style = {headerStyle.IconButton} alt = "logo"/></Link>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                
              </Typography>
                <Link to = "/login">
                    <Button variant="contained" color="primary" className={classes.button}>
                    Login 
                    </Button>
                  </Link>
            </Toolbar>
          </AppBar>
        </div>
        <Route exact path="/login" component={Login} />            
    </Router>
  );
}