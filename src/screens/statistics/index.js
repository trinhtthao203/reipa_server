import * as React from 'react';

import AccountOnDay from './accountOnDay';
import ZoningOnDay from './zoningOnDay';
import PostOnDay from './postOnDay';
import StatisticsZoningOnField from './statisticsZoningOnField';
import StatisticsPostOnField from './statisticsPostOnField';
import { Grid, Container, Paper, Typography, TextField, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from "react-redux";
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
    storeTypeofPostList
} from "../../store/slice/typeofPost.slice";
import {
    storeTypeofRealEstateList
} from "../../store/slice/typeofRealEstate.slice";
import UserService from "../../services/user.service";
import PostService from "../../services/post.service";
const postService = new PostService();
const userService = new UserService();

function preventDefault(event) {
    event.preventDefault();
}

export default function Statistics() {

    const dispatch = useDispatch();
    function getFirstDayPreviousMonth() {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    const [startDate, setStateDate] = React.useState(getFirstDayPreviousMonth());
    const [endDate, setEndDate] = React.useState(new Date());

    const { provinceList } = useSelector(
        (state) => state.province
    );
    const { districtList } = useSelector(
        (state) => state.district
    );
    const { wardList } = useSelector(
        (state) => state.ward
    );
    const { typeofPostList } = useSelector(
        (state) => state.typeofPost
    );
    const { typeofRealEstateList } = useSelector(
        (state) => state.typeofRealEstate
    );

    const [post, setPost] = React.useState({
        typeof_post_id: "",
        typeof_real_estate_id: "",
        province_id: "",
        district_id: "",
        ward_id: "",
    });
    const updatePost = (newState) => {
        setPost((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const getProvinceList = async () => {
        try {
            var result = await userService.getProvince();
            dispatch(storeProvinceList(result.data.provinces));
            getDistrictList(result.data.provinces[0].id)
            updatePost({ province_id: result.data.provinces[0].id });
        } catch (err) {
            console.log(err);
        }
    }

    const getDistrictList = async (province_id) => {
        try {
            var result = await userService.getDistrictByProvince(province_id);
            dispatch(storeDistrictList(result.data.district));
            getWardList(result.data.district[0].id)
            updatePost({ district_id: result.data.district[0].id });
        } catch (err) {
            console.log(err);
        }
    }
    const getWardList = async (district_id) => {
        try {
            var result = await userService.getWardByDistrict(district_id);
            dispatch(storeWardList(result.data));
            updatePost({ ward_id: result.data[0].id })
        } catch (err) {
            console.log(err);
        }
    }

    const getTypeOfPostList = async () => {
        try {
            var result = await postService.get_type_of_post();
            dispatch(storeTypeofPostList(result.data));
            updatePost({ typeof_post_id: result.data[0].id })
        } catch (err) {
            console.log(err);
        }
    }

    const getTypeOfRealEstateList = async () => {
        try {
            var result = await postService.get_type_of_real_estate();
            dispatch(storeTypeofRealEstateList(result.data));
            updatePost({ typeof_real_estate_id: result.data[0].id })
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getProvinceList();
        getTypeOfRealEstateList();
        getTypeOfPostList();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ paddingBottom: 6, paddingTop: 6 }} style={{ backgroundColor: "whitesmoke" }} >
            <Typography component="h1" variant="h5" color="firebrick" gutterBottom>
                Thống kê theo thời gian
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày bắt đầu"
                            value={startDate}
                            onChange={(newValue) => {
                                setStateDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày kết thúc"
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="DD/MM/YYYY"
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <AccountOnDay
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <ZoningOnDay
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 140,
                        }}
                    >
                        <PostOnDay
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" color="firebrick" gutterBottom>
                        Thống kê bài đăng
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={post.province_id}
                            label="Tỉnh"
                            onChange={(e) => {
                                updatePost({ province_id: e.target.value })
                                getDistrictList(e.target.value);
                            }}
                        >
                            {provinceList.length > 0 && provinceList.map((province, ind) =>
                                <MenuItem key={ind} value={province.id}>{province.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Quận Huyện</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={post.district_id}
                            label="Quận Huyện"
                            onChange={(e) => {
                                updatePost({ district_id: e.target.value });
                                getWardList(e.target.value);
                            }}
                        >
                            {districtList && districtList.map((item, ind) =>
                                <MenuItem key={ind} value={item.id}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Xã Phường</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={post.ward_id}
                            label="Xã Phường"
                            onChange={(e) => {
                                updatePost({ ward_id: e.target.value })
                            }}
                        >
                            {wardList && wardList.map((item, ind) =>
                                <MenuItem key={ind} value={item.id}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại bài đăng</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={post.typeof_post_id}
                            label="Loại bài đăng"
                            onChange={(e) => {
                                updatePost({ typeof_post_id: e.target.value })
                            }}
                        >
                            {typeofPostList && typeofPostList.map((item, ind) =>
                                <MenuItem key={ind} value={item.id}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại bất động sản</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={post.typeof_real_estate_id}
                            label="Loại bất động sản"
                            onChange={(e) => {
                                updatePost({ typeof_real_estate_id: e.target.value })
                            }}
                        >
                            {typeofRealEstateList && typeofRealEstateList.map((item, ind) =>
                                <MenuItem key={ind} value={item.id}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <StatisticsPostOnField
                            startDate={startDate}
                            endDate={endDate}
                            provinceID={post.province_id}
                            districtID={post.district_id}
                            wardID={post.ward_id}
                            typeofPostID={post.typeof_post_id}
                            typeofRealEstateID={post.typeof_real_estate_id}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5" color="firebrick" gutterBottom>
                        Thống kê quy hoạch
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <StatisticsZoningOnField
                            startDate={startDate}
                            endDate={endDate}
                            provinceList={provinceList}
                            districtList={districtList}
                            wardList={wardList}
                        />
                    </Paper>
                </Grid>

            </Grid>
        </Container>
    );
}