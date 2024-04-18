import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import userService from '../../services/userService';

import Link from '@mui/material/Link';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Box, Grid, Typography, Paper } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


import { toast } from 'react-toastify';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handelInputVale = (e, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = e.target.value
        this.setState({ ...coppyState })

    }

    handleSubmit = async () => {
        try {
            let user = this.state
            let res = await userService.handelLogin(user);

            if (res && res.EC !== 0) {
                toast.error(res.EM)
            }
            if (res && res.EC === 0) {

                const { userLoginSuccess } = this.props;
                let token = res.data
                userLoginSuccess(token)

                // khi render component homeCreator vẫn get được state reudx 
                // reload lại thì state nhảy sang did-update nên phải href :  
                window.location.href = '/'
            }

        } catch (error) {
            console.log(error);
        }

    }


    render() {

        console.log(this.state);
        let { email, password } = this.state

        return (
            <Box>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid
                        item
                        xs={false} sm={4} md={7}
                        sx={{
                            backgroundImage: 'url(https://i.pinimg.com/736x/8c/17/37/8c1737ebaa56b4a5376fb6a6f4a9c50f.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <Box sx={{
                                mt: 1,
                                borderRadius: '50%'
                            }}>
                                <TextField
                                    color="info"
                                    className='input-login'
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => this.handelInputVale(e, 'email')}

                                />
                                <TextField
                                    color="info"
                                    className='input-login'
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => this.handelInputVale(e, 'password')}

                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    color="info"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => this.handleSubmit()}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account ? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (token) => dispatch(actions.userLoginSuccess(token)),
        // userLoginFail: () => dispatch(actions.userLoginSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
