import React from 'react';
//import Header from './header.js'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import ls from 'local-storage'
import Header from './header'


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

    const [email, SetEmail] = React.useState('');    
    const [password, SetPassword] = React.useState(''); 
    
    function loginClick(e){
        e.preventDefault();
        console.log(email);
        console.log(password);
        const obj = {
            email : email,
            password: password
        }
        //console.log(process.env.baseUrl);
        
        axios.post('/api/users/signIn',obj).then(
            usr => { 
                if(usr["status"] === 200){
                    console.log(usr.statusText)
                    const roles = usr.data.roleId;
                    if (roles === 4 ){
                        console.log("Super Admin logged in");
                        window.location.href = '/administrator/school/list';
                        
                    } 
                    else if(roles === 3)
                    {
                        console.log(" user d: ", usr.data)
                        //console.log("School id: ", usr.data.schoolId)
                        ls.set('schoolId', usr.data.schoolId)
                          
                        window.location.href = '../school/schoolHome'
                    }
                }
                else if(usr["status"] === 401){
                    console.log(usr.data.msg);
                }
            }
            )
    }
    
    
    const classes = useStyles();
  
  return (
    <div>
    <Header/>
    <Container component="main" maxWidth="xs">
        
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Sign in
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
            onChange = {e => SetEmail(e.target.value)}
            value = {email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value = {password}
            onChange = {e => SetPassword(e.target.value)}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {loginClick}
            
          >
            Sign In
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