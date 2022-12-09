import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize, Box, Grid, Button, Paper, FormControl, InputLabel, Select, MenuItem, Modal, TextField, Typography, ImageListItem, ImageList } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Constants from '../../constants';
import Swal from 'sweetalert2';
import Strings from '../../constants/strings';
import { useNavigate } from "react-router-dom";
import Screens from '../../constants/screens';
import { MapContainer, TileLayer, Polygon, Polyline, FeatureGroup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import {
    storeStatusList
} from "../../store/slice/status.slice";
import {
    storeProvinceList
} from "../../store/slice/province.slice";
import {
    storeDistrictList
} from "../../store/slice/district.slice";
import {
    storeWardList
} from "../../store/slice/ward.slice";
import Helpers from '../../commons/helpers';
import UserService from "../../services/user.service";
import ZoningService from "../../services/zoning.service";
import PostService from "../../services/post.service";
import StatusService from "../../services/status.service";
import ImageService from "../../services/images.service";

const userService = new UserService();
const zoningService = new ZoningService();
const postService = new PostService();
const statusService = new StatusService();
const imageService = new ImageService();

const theme = createTheme();
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "74vw",
    height: "80vh",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
};

function HandlePost() {
    const [editableFG, setEditableFG] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [isUpdate, setIsUpdate] = React.useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);

    const { statusList } = useSelector(
        (state) => state.status
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

    const [post, setPost] = React.useState({
        id: "",
        title: "",
        purpose: "",
        area: "",
        width: "",
        length: "",
        address: "",
        geometry: [],
        ispolygon: true,
        discription: "",
        dataImage: [],
        status_id: "",
        user_id: "",
        typeof_post_id: "",
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

    const [errorPost, setErrorPost] = React.useState({
        errorName: false,
        errorAddress: false,
        errorPurpose: false,
        errorStatus: false,
        errorProvince: false,
        errorDistrict: false,
        errorWard: false,
        errorNameMsg: null,
        errorPhoneMsg: null,
        errorStatusMsg: null
    });
    const updateErrorPost = (newState) => {
        setErrorPost((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const handleChangeStatus = (event) => {
        updatePost({ status_id: event.target.value });
    };

    const handleChangeProvince = (province_id) => {
        updatePost({ province_id: province_id });
        getDistrictList(province_id);
    };
    const handleChangeDistrict = (province_id, district_id) => {
        updatePost({ district_id: district_id });
        getWardList(province_id, district_id)
    };
    const handleChangeWard = (ward_id) => {
        updatePost({ ward_id: ward_id });
    };

    const getImageByPost = async (post_id) => {
        try {
            var result = await imageService.get_by_post_id(post_id);
            updatePost({ dataImage: result.data });
        } catch (err) {
            console.log(err);
        }
    }

    const handleGeometry = (geometry) => {
        updatePost({ geometry: geometry.coordinates[0] });
    }

    const getPostByID = async (post_id) => {
        try {
            var result = await postService.get_by_id(post_id);
            console.log(result.data[0].json_build_object.features[0])
            const postData = result.data[0].json_build_object.features[0];
            updatePost({
                id: postData.properties.id,
                title: postData.properties.title,
                address: postData.properties.address,
                bedroom: postData.properties.bedroom,
                toilet: postData.properties.toilet,
                width: postData.properties.width,
                length: postData.properties.length,
                area: postData.properties.area,
                description: postData.properties.description,
                province_id: postData.properties.province_id ? postData.properties.province_id : 0,
                district_id: postData.properties.district_id ? postData.properties.district_id : 0,
                ward_id: postData.properties.ward_id ? postData.properties.ward_id : 0,
                user_id: postData.properties.user_id,
                status_id: postData.properties.status_id,
                ispolygon: postData.properties.ispolygon
            });
            if (postData.properties.province_id) {
                handleChangeProvince(postData.properties.province_id);
            }
            if (postData.properties.district_id) {
                handleChangeDistrict(postData.properties.province_id, postData.properties.district_id);
                console.log(postData.properties.province_id);
            }
            if (postData.properties.ward_id) {
                handleChangeWard(postData.properties.ward_id);
            }
            getImageByPost(postData.properties.id);
            handleGeometry(postData.properties.geometry);
        } catch (err) {
            console.log(err);
        }
    }

    const getStatusList = async () => {
        try {
            var result = await statusService.getAll();
            dispatch(storeStatusList(result.data));
        } catch (err) {
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

    React.useEffect(() => {
        if (location.state) {
            console.log(location.state)
            let post_id = location.state.post_id;
            let tempIsUpdate = location.state.isUpdate;
            setIsUpdate(tempIsUpdate);
            getPostByID(post_id);
        }
        if (statusList[0] === undefined) {
            getStatusList();
        }
        if (provinceList[0] === undefined) {
            getProvinceList();
        }
        if (districtList[0] === undefined) {
            getDistrictList(post.province_id);
        }
        if (wardList[0] === undefined) {
            getWardList(post.province_id, post.district_id);
        }
    }, [])
    const handleSubmit = async () => { }
    const handleUpdate = async () => {
        if (Helpers.isNullOrEmpty(post.status_id)) {
            updateErrorPost({ errorStatus: true });
        } else {
            updateErrorPost({ errorStatus: false });
        }

        if (Helpers.isNullOrEmpty(post.status_id) === false) {
            try {
                var result = await postService.update_status(post.id, post.status_id);
                console.log(result.code);
                if (result.code === 200)
                    Swal.fire({
                        title: Strings.ALert.SUCCESS,
                        text: result.data.message,
                        icon: Strings.ALert.SUCCESS,
                        timer: 2000,
                        confirmButtonText: 'OK'
                    })
                navigate("/post", { replace: true });
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

    const onCreated = e => {
        console.log(e);
        console.log(editableFG);
        const drawnItems = editableFG.leafletElement._layers;
        console.log(drawnItems);
        if (Object.keys(drawnItems).length > 1) {
            Object.keys(drawnItems).forEach((layerid, index) => {
                if (index > 0) return;
                const layer = drawnItems[layerid];
                editableFG.leafletElement.removeLayer(layer);
            });
            console.log(drawnItems);
        }
    };
    const onFeatureGroupReady = reactFGref => {
        // store the ref for future access to content
        setEditableFG(reactFGref);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" justifyContent={"center"}>
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
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
                                {isUpdate ? "Duyệt" : "Tạo mới"} bài đăng
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        required
                                        error={errorPost.errorName}
                                        value={post.title}
                                        label={Strings.Post.TITLE}
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onChange={(event) => updatePost({ name: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        required
                                        value={post.address}
                                        label={Strings.Post.ADDRESS}
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                        variant="standard"
                                        onChange={(event) => updatePost({ purpose: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        value={post.address}
                                        label={Strings.Post.ADDRESS}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Status.NAME}</InputLabel>
                                        <Select
                                            required
                                            error={errorPost.errorStatus}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={post.status_id}
                                            label={Strings.Status.NAME}
                                            onChange={handleChangeStatus}
                                        >
                                            {statusList.length > 0 && statusList.map((status, ind) =>
                                                <MenuItem key={ind} value={status.id}>{status.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Province.TITLE}</InputLabel>
                                        <Select
                                            disabled={isUpdate}

                                            error={errorPost.errorProvince}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={post.province_id}
                                            label={Strings.Province.TITLE}
                                            onChange={(e) => handleChangeProvince(e.target.value)}
                                        >
                                            <MenuItem value={0}>Chọn Tỉnh</MenuItem>
                                            {provinceList.length > 0 && provinceList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.District.TITLE}</InputLabel>
                                        <Select
                                            disabled={isUpdate}

                                            error={errorPost.errorDistrict}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={post.district_id}
                                            label={Strings.District.TITLE}
                                            onChange={(e) => handleChangeDistrict(post.province_id, e.target.value)}
                                        >
                                            <MenuItem value={0}>Chọn Quận/huyện</MenuItem>
                                            {districtList.length > 0 && districtList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel required id="demo-simple-select-label">{Strings.Ward.TITLE}</InputLabel>
                                        <Select
                                            disabled={isUpdate}
                                            error={errorPost.errorWard}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={post.ward_id}
                                            label={Strings.Ward.TITLE}
                                            onChange={(e) => handleChangeWard(e.target.value)}
                                        >
                                            <MenuItem value={0}>Chọn Xã/Phường</MenuItem>
                                            {wardList.length > 0 && wardList.map((role, ind) =>
                                                <MenuItem key={ind} value={role.id}>{role.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextareaAutosize
                                        disabled={isUpdate}
                                        value={post.description}
                                        label={Strings.Post.DESCRIPTION}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                        style={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        disabled={isUpdate}
                                        value={post.area}
                                        label={Strings.Post.AREA}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                    />
                                </Grid>
                                {!isUpdate && <>
                                    <Grid item xs={12} >
                                        <Button onClick={handleOpenCreate}>Xác định tọa độ trên bản đồ</Button>
                                        <Button fullWidth variant="contained" component="label">
                                            Upload fileGeojson
                                            <input hidden accept="image/*" multiple type="file" />
                                        </Button>
                                        <Modal
                                            open={openCreate}
                                            onClose={handleCloseCreate}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Text in a modal
                                                </Typography>
                                                <MapContainer
                                                    center={[37.8189, -122.4786]}
                                                    zoom={13}
                                                    style={{ width: 100 + "%", height: 100 + "%" }}>
                                                    <TileLayer
                                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                                    />
                                                    <FeatureGroup
                                                        ref={featureGroupRef => {
                                                            onFeatureGroupReady(featureGroupRef);
                                                        }}>
                                                        <EditControl
                                                            position="topright"
                                                            onCreated={onCreated}
                                                            draw={{
                                                                marker: false,
                                                                circle: false,
                                                                rectangle: false,
                                                            }}
                                                        />
                                                    </FeatureGroup>
                                                </MapContainer>
                                            </Box>
                                        </Modal>
                                    </Grid>
                                    {post.dataImage.length > 0 && <Grid item xs={12}>
                                        <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={164}>
                                            {post.dataImage.length > 0 && post.dataImage.map((item) => (
                                                <ImageListItem key={item.name}>
                                                    <img
                                                        src={`${Constants.Api.BASE_IMAGES}/${item.name}`}
                                                        loading="lazy"
                                                        style={{ margin: 5 }}
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Grid>}
                                </>}
                                {isUpdate && <>
                                    <Grid item xs={12} >
                                        <Button onClick={handleOpen}>Xem trên bản đồ</Button>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Text in a modal
                                                </Typography>
                                                <MapContainer
                                                    style={{ width: 100 + "%", height: 100 + "%" }}
                                                    bounds={post.geometry}
                                                    boundsOptions={{ padding: [1, 1] }}
                                                    scrollWheelZoom={true}
                                                >
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    {post.ispolygon &&
                                                        <Polygon positions={post.geometry} />
                                                    }
                                                    {!post.ispolygon &&
                                                        <Polyline positions={post.geometry} />
                                                    }
                                                </MapContainer>
                                            </Box>
                                        </Modal>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={164}>
                                            {post.dataImage.length > 0 && post.dataImage.map((item) => (
                                                <ImageListItem key={item.name}>
                                                    <img
                                                        src={`${Constants.Api.BASE_IMAGES}/${item.name}`}
                                                        loading="lazy"
                                                        style={{ margin: 5 }}
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </Grid>
                                </>}
                                <Grid item xs={12}>
                                    {!isUpdate &&
                                        <>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 1, mb: 1 }}
                                                style={{ backgroundColor: Constants.Styles.COLOR_CHETWODE_BLUE }}
                                            >
                                                {Strings.Common.CONFIRM}
                                            </Button>
                                        </>}
                                    {isUpdate && <Button
                                        fullWidth
                                        onClick={() => { handleUpdate() }}
                                        variant="contained"
                                        sx={{ mt: 1, mb: 1 }}
                                        style={{ backgroundColor: Constants.Styles.COLOR_CHETWODE_BLUE }}
                                    >
                                        Cập nhật
                                    </Button>}
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mt: 1, mb: 1 }}
                                        onClick={() => {
                                            navigate({ pathname: Screens.ZONING })
                                        }}>Hủy</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    )
}

export default HandlePost