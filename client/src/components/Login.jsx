import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Link, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import axios from "axios";
import Swal from 'sweetalert2'
import { SERVER_URI } from "../config/keys";


export default function Login() {

    let navigate= useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const backendServer = `${SERVER_URI}/login`

	const handleSubmit = async (e) => {
		e.preventDefault();
        axios.post(backendServer, values)
        .then((response) => {
          console.log("response", response)
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            timer: 2500
          }).then(() => {
            localStorage.setItem("loggedInUser", values.email);
            localStorage.setItem("token", `${response.data.data.token}`) 
            navigate("/CreateBook");
             //window.location.reload()
          })
        })
        .catch((error) => {
          console.log("error", error.response.data.message)
          // alert(`Error: ${error.response.data.message}`)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
            text: error.response.data.message
          })
          //window.location.reload();
        })
	};

    function Register(e){
        e.preventDefault();
        navigate('/register')
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box container direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{bgcolor:'#ffffff' , mt:'100px',pb:'50px', boxShadow:10, borderRadius:'10px'}}>
                    <Stack
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <Typography sx={{ pt: '20px', ml: '30px' }}>
                            <h1>Login your Account</h1>
                        </Typography>

                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-phone_number">Email</InputLabel>
                            <Input
                                id="standard-adornment-email"
                                type='text'
                                value={values.email}
                                onChange={handleChange('email')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl onClick={handleSubmit}  sx={{ width: '50%', height: '40px', mt: '50px' }}>
                            <Button variant="contained" sx={{bgcolor:'green'}}>
                            Login
                            </Button>
                        </FormControl>
                        <div>
                            <a href='/register' onClick={Register} >
                                <Button variant="text" >
                                    Need An Account? SignUp.
                                </Button>
                            </a>
                            
                        </div>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    )
}