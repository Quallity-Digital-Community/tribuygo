import React from 'react';
//import Header from './header.js'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import Header from './header';



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


export default function Forgotpasswordrequest() {

    const [items, setItems] = React.useState({});    
    const [message, setMessage] = React.useState('');   
     
    const handleInputChange = event => {
      const {name, value} = event.target;
      setItems({...items, [name]: value});
    }

    
    function loginClick(e){
        e.preventDefault();
        
        axios.post('/api/users/forgot_password_request',items).then(
            usr => { 
                //console.log(usr);
                if(usr.status === 200) {
                  setMessage('If you registered user then, you will received password change request.')
                  setItems({});
                  
                }
                
            }
            )
    }
    
    
    const classes = useStyles();
  
  return (
    <div>
    <Header />
    {message !== '' ? (<div className = "alert alert-success">{message}</div>) : (<div></div>)}
    <Container component="main" maxWidth="xs">
        
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
         Request new password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange = {handleInputChange}
            value = {items.email || ''}
            autoFocus
          />
          
         

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {loginClick}
            
          >
            send
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
}