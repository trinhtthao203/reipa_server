import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Button, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Constants from '../../constants';
import Strings from '../../constants/strings';
import { useNavigate, useLocation } from "react-router-dom";
import {
    storeProvinceList
} from "../../store/slice/province.slice";
import {
    storeDistrictList
} from "../../store/slice/district.slice";
import {
    storeWardList
} from "../../store/slice/ward.slice";
import {
    storeStreetList
} from "../../store/slice/street.slice";
import {
    storeRoleList
} from "../../store/slice/role.slice";

import UserService from "../../services/user.service";
import Helpers from '../../commons/helpers';
const userService = new UserService();

const theme = createTheme();

export default function HandleAccount() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isUpdate, setIsUpdate] = React.useState();
    const [user, setUser] = React.useState({
        id: "",
        fullname: "",
        phonenumber: "",
        password: '123456789',
        address: "",
        avatar: "",
        role_id: "",
        province_id: "",
        district_id: "",
        ward_id: "",
        street_id: "",
    });
    const updateUser = (newState) => {
        setUser((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };
    const getUserByID = async (user_id) => {
        try {
            var result = await userService.userByID(user_id);
            updateUser({
                id: result.data[0].id,
                fullname: result.data[0].fullname,
                phonenumber: result.data[0].phonenumber,
                address: result.data[0].address,
                province_id: result.data[0].province_id,
                role_id: result.data[0].role_id,
            })
        } catch (err) {
            console.log(err);
        }
    }

    const { roleList } = useSelector(
        (state) => state.role
    );
    const { provinceList } = useSelector(
        (state) => state.province
    );
    const { districtList } = useSelector(
        (state) => state.district
    );
    const { wardList } = useSelector(
        (state) => state.ward
    );
    const { streetList } = useSelector(
        (state) => state.street
    );

    const [errorUser, setErrorUser] = React.useState({
        errorName: false,
        errorPhone: false,
        errorRole: false,
        errorProvince: false,
        errorDistrict: false,
        errorWard: false,
        errorStreet: false,
        errorNameMsg: null,
        errorPhoneMsg: null,
        errorRoleMsg: null
    });

    const updateErrorUser = (newState) => {
        setErrorUser((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Helpers.isNullOrEmpty(user.fullname)) {
            updateErrorUser({ errorName: true });
        } else {
            updateErrorUser({ errorName: false });
        }

        if (Helpers.isNullOrEmpty(user.phonenumber)) {
            updateErrorUser({ errorPhone: true });
        } else if (Constants.RegExp.PHONE_NUMBER.test(user.phonenumber) === false) {
            updateErrorUser({ errorPhone: true, errorPhoneMsg: "Số điện thoại không đúng định dạng" });
        } else {
            updateErrorUser({ errorPhone: false, errorPhoneMsg: "" });
        }

        if (Helpers.isNullOrEmpty(user.role_id)) {
            updateErrorUser({ errorRole: true });
        } else {
            updateErrorUser({ errorRole: false });
        }

        if (Helpers.isNullOrEmpty(user.province_id)) {
            updateErrorUser({ errorProvince: true });
        } else {
            updateErrorUser({ errorProvince: false });
        }

        if (Helpers.isNullOrEmpty(user.district_id)) {
            updateErrorUser({ errorDistrict: true });
        } else {
            updateErrorUser({ errorDistrict: false });
        }

        if (Helpers.isNullOrEmpty(user.ward_id)) {
            updateErrorUser({ errorWard: true });
        } else {
            updateErrorUser({ errorWard: false });
        }

        if (Helpers.isNullOrEmpty(user.street_id)) {
            updateErrorUser({ errorStreet: true });
        } else {
            updateErrorUser({ errorStreet: false });
        }

        if (Helpers.isNullOrEmpty(user.fullname) === false && Helpers.isNullOrEmpty(user.phonenumber) === false && Constants.RegExp.PHONE_NUMBER.test(user.phonenumber) === true && Helpers.isNullOrEmpty(user.role_id) === false) {
            try {
                var result = await userService.register(user.phonenumber, user.password, user.fullname, user.address, user.street_id, user.ward_id, user.role_id);
                if (result.code === 200)
                    Swal.fire({
                        title: Strings.ALert.SUCCESS,
                        text: result.data.message,
                        icon: Strings.ALert.SUCCESS,
                        timer: 2000,
                        confirmButtonText: 'OK'
                    })
                navigate("/account", { replace: true });
            } catch (err) {
                Swal.fire({
                    title: Strings.ALert.ERROR,
                    text: err.data.message,
                    icon: Strings.ALert.ERROR,
                    timer: 2000,
                    confirmButtonText: 'OK'
                })
                if (err.code === 403)
                    Swal.fire({
                        title: Strings.ALert.ERROR,
                        text: "Hết phiên đăng nhập vui lòng đăng nhập lại",
                        icon: Strings.ALert.ERROR,
                        confirmButtonText: 'OK'
                    })
                console.log(err);
            }
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        if (Helpers.isNullOrEmpty(user.role_id)) {
            updateErrorUser({ errorRole: true });
        } else {
            updateErrorUser({ errorRole: false });
        }

        if (Helpers.isNullOrEmpty(user.role_id) === false) {
            console.log(user);
            try {
                var result = await userService.update(user.id, user.role_id);
                console.log(result.code);
                if (result.code === 200)
                    Swal.fire({
                        title: Strings.ALert.SUCCESS,
                        text: result.data.message,
                        icon: Strings.ALert.SUCCESS,
                        timer: 2000,
                        confirmButtonText: 'OK'
                    })
                navigate("/account", { replace: true });
            } catch (err) {
                Swal.fire({
                    title: Strings.ALert.ERROR,
                    text: err.data.message,
                    icon: Strings.ALert.ERROR,
                    timer: 2000,
                    confirmButtonText: 'OK'
                })
                if (err.code === 403)
                    Swal.fire({
                        title: Strings.ALert.ERROR,
                        text: "Hết phiên đăng nhập vui lòng đăng nhập lại",
                        icon: Strings.ALert.ERROR,
                        confirmButtonText: 'OK'
                    })
                console.log(err);
            }
        }
    }

    const handleChangeRole = (event) => {
        updateUser({ role_id: event.target.value });
    };
    const handleChangeProvince = (event) => {
        updateUser({ province_id: event.target.value });
        getDistrictList(event.target.value);
    };
    const handleChangeDistrict = (event) => {
        updateUser({ district_id: event.target.value });
        getWardList(user.province_id, event.target.value)
        getStreetList(user.province_id, event.target.value)
    };
    const handleChangeWard = (event) => {
        updateUser({ ward_id: event.target.value });
    };
    const handleChangeStreet = (event) => {
        updateUser({ street_id: event.target.value });
    };

    const getAllRole = async () => {
        try {
            var result = await userService.AllRole();
            dispatch(storeRoleList(result.data));
        } catch (err) {
            if (err.code === 403)
                Swal.fire({
                    title: Strings.ALert.ERROR,
                    text: "Hết phiên đăng nhập vui lòng đăng nhập lại",
                    icon: Strings.ALert.ERROR,
                    confirmButtonText: 'OK'
                })
            console.log(err);
        }
    }

    const getProvinceList = async () => {
        try {
            var result = await userService.getProvince();
            dispatch(storeProvinceList(result.data.provinces));
        } catch (err) {
            console.log(err);
        }
    }

    const getDistrictList = async (province_id) => {
        try {
            var result = await userService.getDistrictByProvince(province_id);
            dispatch(storeDistrictList(result.data.district));
        } catch (err) {
            console.log(err);
        }
    }
    const getWardList = async (province_id, district_id) => {
        try {
            var result = await userService.getWardByProvinceDistrict(province_id, district_id);
            dispatch(storeWardList(result.data.ward));
        } catch (err) {
            console.log(err);
        }
    }
    const getStreetList = async (province_id, district_id) => {
        try {
            var result = await userService.getStreetByProvinceDistrict(province_id, district_id);
            dispatch(storeStreetList(result.data.streets));
        } catch (err) {
            console.log(err);
        }
    }
    React.useEffect(() => {
        if (location.state) {
            let user_id = location.state.user_id;
            let tempIsUpdate = location.state.isUpdate;
            setIsUpdate(tempIsUpdate);
            getUserByID(user_id);
        }
        if (roleList.length <= 0) {
            getAllRole();
        }
        getProvinceList();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" justifyContent={"center"}>
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Tạo người dùng mới
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        required
                                        error={errorUser.errorName}
                                        value={user.fullname}
                                        label={Strings.Account.FULLNAME}
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onChange={(event) => updateUser({ fullname: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        required
                                        error={errorUser.errorPhone}
                                        helperText={errorUser.errorPhone ? errorUser.errorPhoneMsg : null}
                                        type={"number"}
                                        value={user.phonenumber}
                                        label={Strings.Account.PHONENUMBER}
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                        variant="standard"
                                        onChange={(event) => updateUser({ phonenumber: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        value={user.address}
                                        label={Strings.Account.ADDRESS}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                        onChange={(event) => updateUser({ address: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Account.ROLE}</InputLabel>
                                        <Select
                                            required
                                            error={errorUser.errorRole}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user.role_id}
                                            label={Strings.Account.ROLE}
                                            onChange={handleChangeRole}
                                        >
                                            {roleList.length && roleList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {!isUpdate && <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Province.TITLE}</InputLabel>
                                        <Select
                                            error={errorUser.errorProvince}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user.province_id}
                                            label={Strings.Province.TITLE}
                                            onChange={handleChangeProvince}
                                        >
                                            {provinceList.length && provinceList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>}
                                {!isUpdate && <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.District.TITLE}</InputLabel>
                                        <Select
                                            error={errorUser.errorDistrict}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user.district_id}
                                            label={Strings.District.TITLE}
                                            onChange={handleChangeDistrict}
                                        >
                                            {districtList.length && districtList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>}
                                {!isUpdate && <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Ward.TITLE}</InputLabel>
                                        <Select
                                            error={errorUser.errorWard}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user.ward_id}
                                            label={Strings.Ward.TITLE}
                                            onChange={handleChangeWard}
                                        >
                                            {wardList.length && wardList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>}
                                {!isUpdate && <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Street.TITLE}</InputLabel>
                                        <Select
                                            error={errorUser.errorStreet}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user.street_id}
                                            label={Strings.Street.TITLE}
                                            onChange={handleChangeStreet}
                                        >
                                            {streetList.length && streetList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>}
                                <Grid item xs={12}>
                                    {!isUpdate && <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ backgroundColor: Constants.Styles.COLOR_CHETWODE_BLUE }}
                                    >
                                        {Strings.Common.CONFIRM}
                                    </Button>}
                                    {isUpdate && <Button
                                        fullWidth
                                        onClick={(e) => { handleUpdate(e) }}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{ backgroundColor: Constants.Styles.COLOR_CHETWODE_BLUE }}
                                    >
                                        Cập nhật
                                    </Button>}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}