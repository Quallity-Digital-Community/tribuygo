import React from 'react';
//import Header from './header.js'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {

    const [items, setItems] = React.useState({});    
    const [message, setMessage] = React.useState('');
    
    const handleInputChange = event => {
    	const {name, value} = event.target;
    	setItems({...items, [name]: value});
    }
    
    function register(e){
        e.preventDefault();
        items.roleId = "3";

        console.log(JSON.stringify(items));
        
        axios.post('/api/schools/registerSchool', items).then(
            usr => { 
            
                if(usr.status === 200) {
                	setMessage('School sucessfully registered.')
                	setItems({});
                	
                }
              console.log(usr);
            }
            )
   

    }
    
    
    const classes = useStyles();
  
  return (
    <div>
    

    
	{message !== '' ? (<div className = "alert alert-success">{message}</div>) : (<div></div>)}
    <Container component="main" maxWidth="xs">
      
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="school_name"
            label="School Name"
            name="schoolName"
            onChange = {handleInputChange}
            value = {items.schoolName || ''}
          />
         
           <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="address"
            label="Address"
            type="text"
            id="address"
            value = {items.address || ''}
            onChange = { handleInputChange }
            required
          />
          
         

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            value = {items.email || ''}
            onChange = { handleInputChange }
            required 
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value = {items.password || ''}
            onChange = { handleInputChange }
            required
          />
          
           <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="mobileNumber"
            label="Mobile No"
            type="text"
            id="mobile_no"
            value = {items.mobileNumber || ''}
            onChange = { handleInputChange }
            required
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="contactPerson"
            label="Contact Person"
            type="text"
            id="contact_person"
            value = {items.contactPerson || ''}
            onChange = { handleInputChange }
            required
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="contactNumber"
            label="School Phone Number"
            type="text"
            id="shcool_phone_number"
            value = {items.contactNumber || ''}
            onChange = { handleInputChange }
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {register}
            
          >
            Register New School
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </div>
  );
}