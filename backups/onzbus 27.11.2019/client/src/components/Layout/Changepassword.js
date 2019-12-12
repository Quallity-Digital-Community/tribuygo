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
import { withRouter } from 'react-router-dom';

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

function App(props) {

    const [items, setItems] = React.useState({});    
    const [message, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState({});

    
    const handleInputChange = event => {
    	const {name, value} = event.target;
    	setItems({...items, [name]: value});
    }

    
    function register(e){
        e.preventDefault();     
        items.email = props.match.params.email;
        console.log(items);

        axios.post('/api/users/change_password', items).then(
            usr => { 
            
                if(usr.status === 200) {
                	setMessage('Password changed sucessfully.')
                	setItems({});
                	
                }
              console.log(usr);
            }
            ).catch(error => {
              setErrors(error.response.data)
            })
   

    }
    
    
    const classes = useStyles();
  
  return (
    <div>
    

    <Header />
	
    <Container component="main" maxWidth="xs">
       {errors.password && <div className = "alert alert-danger">{errors.password}</div>}
        {errors.confirm_password && <div className = "alert alert-danger">{errors.confirm_password}</div>}

        {message && <div className = "alert alert-success">{message}</div>}

      <div className={classes.paper}>
        

        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
       
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"           
            fullWidth
            id="password"
            label="Password"
            name="password"
            onChange = {handleInputChange}
            value = {items.password || ''}
             required
          />
         
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="text"
            id="password"
            value = {items.confirm_password || ''}
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
            Submit
          </Button>

          

        </form>
      </div>
    </Container>
    </div>
  );
}


export default withRouter(App);