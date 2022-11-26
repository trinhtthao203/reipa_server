import * as React from 'react';
import Swal from 'sweetalert2';
import Strings from '../../constants/strings';
import Constants from '../../constants';
import Helper from '../../commons/helpers';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
//element
import {
    InputAdornment, IconButton, Checkbox, FormControlLabel,
    TextField, CssBaseline, Button, Avatar, Link, Paper, Box, Grid, Typography
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

//function
import {
    storeUserInfo
} from "../../store/slice/user.slice";
import { setUserSession } from "../../components/useLocalStorage";
import UserService from "../../services/user.service";
const userService = new UserService();

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [phonenumber, setPhoneNumber] = React.useState();
    const [password, setPassword] = React.useState();
    const [isRemember, setIsRemember] = React.useState(false);

    const [errorUser, setErrorUser] = React.useState({
        errorPN: false,
        errorPW: false,
        errorPasswordMsg: "",
        errorPhoneNumberMsg: "",
    });

    const updateErrorUser = (newState) => {
        setErrorUser((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let PN, PW = true;
        if (Helper.isNullOrEmpty(phonenumber)) {
            PN = false;
            updateErrorUser({
                errorPN: true,
                errorPhoneNumberMsg: Strings.Auth.PHONE_NUMBER_REQUIRED_MESSAGE
            })
        } else if (Constants.RegExp.PHONE_NUMBER.test(phonenumber) === false) {
            PN = false;
            updateErrorUser({
                errorPN: true,
                errorPhoneNumberMsg: Strings.Auth.PHONE_NUMBER_INVALID_MESSAGE
            })
        } else {
            PN = true;
            updateErrorUser({
                errorPN: false,
                errorPhoneNumberMsg: ""
            })
        }

        if (Helper.isNullOrEmpty(password)) {
            PW = false;
            updateErrorUser({
                errorPW: true,
                errorPasswordMsg: Strings.Auth.PASSWORD_REQUIRED_MESSAGE
            })
        } else {
            PW = true;
            updateErrorUser({
                errorPW: false,
                errorPasswordMsg: ""
            })
        }

        if (PN && PW) {
            try {
                const result = await userService.Login(phonenumber, password);
                console.log(result.data.userInfo.message)
                if (result.code !== 200) {
                    Swal.fire({
                        title: Strings.ALert.ERROR_TITLE,
                        text: result.data.userInfo.message,
                        icon: Strings.ALert.ERROR,
                        confirmButtonText: 'OK',
                        timer: 2000
                    })
                }
                if (result.code === 200) {
                    Swal.fire({
                        title: Strings.ALert.SUCCESS_TITLE,
                        text: result.data.userInfo.message,
                        icon: Strings.ALert.SUCCESS,
                        confirmButtonText: 'OK',
                        timer: 2000
                    })
                    if (result.data.userInfo.role_id === 3) {
                        Swal.fire({
                            title: Strings.ALert.ERROR_TITLE,
                            text: "Bạn không có quyền truy cập vào Server",
                            icon: Strings.ALert.ERROR,
                            confirmButtonText: 'OK',
                            timer: 2500
                        })
                    } else {
                        const tempUser = {
                            id: result.data.userInfo.id,
                            fullname: result.data.userInfo.fullname,
                            avatar: result.data.userInfo.avatar,
                            address: result.data.userInfo.address,
                            role_id: result.data.userInfo.role_id,
                            phonenumber: result.data.userInfo.phonenumber,
                            province_name: result.data.userInfo.province_name,
                            district_name: result.data.userInfo.district_name,
                            ward_name: result.data.userInfo.ward_name,
                            street_name: result.data.userInfo.street_name,
                            createdAt: result.data.userInfo.createdAt,
                            updatedAt: result.data.userInfo.updatedAt,
                        }
                        setUserSession(result.data.accessToken, result.data.userInfo);
                        dispatch(storeUserInfo(tempUser));
                        navigate("/", { replace: true });
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${Constants.Api.BASE_IMAGES}/house.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
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
                        <Avatar sx={{ m: 1, bgcolor: Constants.Styles.COLOR_CHETWODE_BLUE, height: Constants.Styles.AVATAR_SIZE, width: Constants.Styles.AVATAR_SIZE }}>
                            <img src={`${Constants.Api.BASE_IMAGES}/logo.png`} style={{ width: 50, height: 50 }} />
                        </Avatar>
                        <Typography component="h1" variant="h5" m={1} style={{ color: Constants.Styles.COLOR_CHETWODE_BLUE, fontWeight: "600" }}>
                            {Strings.App.TITLE}
                        </Typography>
                        <Typography component="h1" variant="h6">
                            {Strings.Auth.LOGIN}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                error={errorUser.errorPN}
                                helperText={errorUser.errorPN ? errorUser.errorPhoneNumberMsg : ""}
                                margin="normal"
                                required
                                fullWidth
                                id="phonenumber"
                                label={Strings.Auth.PHONE_NUMBER}
                                name={Strings.Auth.PHONE_NUMBER}
                                autoComplete="phonenumber"
                                autoFocus
                                onChange={(e) => { setPhoneNumber(e.target.value) }}
                            />
                            <TextField
                                id="password"
                                error={errorUser.errorPW}
                                helperText={errorUser.errorPW ? errorUser.errorPasswordMsg : ""}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={Strings.Auth.PASSWORD}
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" onChange={() => { setIsRemember(!isRemember) }} />}
                                label={Strings.Auth.REMEMBER_ME}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: Constants.Styles.COLOR_CHETWODE_BLUE }}
                            >
                                {Strings.Auth.LOGIN}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        {Strings.Auth.FORGOT_PASSWORD}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}