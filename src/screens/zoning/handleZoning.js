import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Grid, Button, Paper, FormControl, InputLabel, Select, MenuItem, Modal, TextField, Typography, ImageListItem, ImageList } from '@mui/material';
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
import StatusService from "../../services/status.service";
import ImageService from "../../services/images.service";

const userService = new UserService();
const zoningService = new ZoningService();
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

function HandleZoning() {
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

    const [zoning, setZoning] = React.useState({
        id: "",
        name: "",
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
        typeof_zoning_id: "",
        province_id: "",
        district_id: "",
        ward_id: "",
    });
    const updateZoning = (newState) => {
        setZoning((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const [errorZoning, setErrorZoning] = React.useState({
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
    const updateErrorZoning = (newState) => {
        setErrorZoning((prevState) => ({
            ...prevState,
            ...newState,
        }));
    };

    const handleChangeStatus = (event) => {
        updateZoning({ status_id: event.target.value });
    };

    const handleChangeProvince = (province_id) => {
        updateZoning({ province_id: province_id });
        getDistrictList(province_id);
    };
    const handleChangeDistrict = (province_id, district_id) => {
        updateZoning({ district_id: district_id });
        getWardList(province_id, district_id)
    };
    const handleChangeWard = (ward_id) => {
        updateZoning({ ward_id: ward_id });
    };

    const getImageByZoning = async (zoning_id) => {
        try {
            var result = await imageService.get_by_zoning_id(zoning_id);
            updateZoning({ dataImage: result.data });
        } catch (err) {
            console.log(err);
        }
    }

    const handleGeometry = (geometry) => {
        updateZoning({ geometry: geometry.coordinates[0].map((row) => [row[1], row[0]]) });
    }

    const getZoningByID = async (zoning_id) => {
        try {
            var result = await zoningService.get_by_id(zoning_id);
            updateZoning({
                id: result.data[0].id,
                name: result.data[0].name,
                address: result.data[0].address,
                purpose: result.data[0].purpose,
                width: result.data[0].width,
                length: result.data[0].length,
                area: result.data[0].area,
                description: result.data[0].description,
                province_id: result.data[0].province_id ? result.data[0].province_id : 0,
                district_id: result.data[0].district_id ? result.data[0].district_id : 0,
                ward_id: result.data[0].ward_id ? result.data[0].ward_id : 0,
                user_id: result.data[0].user_id,
                status_id: result.data[0].status_id,
                ispolygon: result.data[0].ispolygon
            });
            if (result.data[0].province_id) {
                handleChangeProvince(result.data[0].province_id);
            }
            if (result.data[0].district_id) {
                handleChangeDistrict(result.data[0].province_id, result.data[0].district_id);
                console.log(result.data[0].province_id);
            }
            if (result.data[0].ward_id) {
                handleChangeWard(result.data[0].ward_id);
            }
            getImageByZoning(result.data[0].id);
            handleGeometry(result.data[0].geometry);
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
            let zoning_id = location.state.zoning_id;
            let tempIsUpdate = location.state.isUpdate;
            setIsUpdate(tempIsUpdate);
            getZoningByID(zoning_id);
        }
        if (statusList[0] === undefined) {
            getStatusList();
        }
        if (provinceList[0] === undefined) {
            getProvinceList();
        }
        if (districtList[0] === undefined) {
            getDistrictList(zoning.province_id);
        }
        if (wardList[0] === undefined) {
            getWardList(zoning.province_id, zoning.district_id);
        }
    }, [])
    const handleSubmit = async () => { }
    const handleUpdate = async () => {
        if (Helpers.isNullOrEmpty(zoning.status_id)) {
            updateErrorZoning({ errorStatus: true });
        } else {
            updateErrorZoning({ errorStatus: false });
        }

        if (Helpers.isNullOrEmpty(zoning.status_id) === false) {
            try {
                var result = await zoningService.update_status(zoning.id, zoning.status_id);
                console.log(result.code);
                if (result.code === 200)
                    Swal.fire({
                        title: Strings.ALert.SUCCESS,
                        text: result.data.message,
                        icon: Strings.ALert.SUCCESS,
                        timer: 2000,
                        confirmButtonText: 'OK'
                    })
                navigate("/zoning", { replace: true });
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
                                {isUpdate ? "Duyệt" : "Tạo mới"} quy hoạch
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{ readOnly: isUpdate, disableUnderline: true }}
                                        required
                                        error={errorZoning.errorName}
                                        value={zoning.name}
                                        label={Strings.Zoning.NAME}
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                        onChange={(event) => updateZoning({ name: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{ readOnly: isUpdate, disableUnderline: true }}
                                        required
                                        value={zoning.purpose}
                                        label={Strings.Zoning.PURPOSE}
                                        fullWidth
                                        autoComplete="shipping address-line1"
                                        variant="standard"
                                        onChange={(event) => updateZoning({ purpose: event.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{ readOnly: isUpdate, disableUnderline: true }}
                                        value={zoning.address}
                                        label={Strings.Zoning.ADDRESS}
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
                                            error={errorZoning.errorStatus}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={zoning.status_id}
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
                                            error={errorZoning.errorProvince}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={zoning.province_id}
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
                                            error={errorZoning.errorDistrict}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={zoning.district_id}
                                            label={Strings.District.TITLE}
                                            onChange={(e) => handleChangeDistrict(zoning.province_id, e.target.value)}
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
                                            error={errorZoning.errorWard}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={zoning.ward_id}
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
                                    <TextField
                                        InputProps={{ readOnly: isUpdate, disableUnderline: true }}
                                        value={zoning.width}
                                        label={Strings.Zoning.WIDTH}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{ readOnly: isUpdate, disableUnderline: true }}
                                        value={zoning.length}
                                        label={Strings.Zoning.LENGTH}
                                        fullWidth
                                        autoComplete="shipping address-line2"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputProps={{ readOnly: isUpdate, disableUnderline: true }}
                                        value={zoning.area}
                                        label={Strings.Zoning.AREA}
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
                                    {zoning.dataImage.length > 0 && <Grid item xs={12}>
                                        <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={164}>
                                            {zoning.dataImage.length > 0 && zoning.dataImage.map((item) => (
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
                                                    bounds={zoning.geometry}
                                                    boundsOptions={{ padding: [1, 1] }}
                                                    scrollWheelZoom={true}
                                                >
                                                    <TileLayer
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    {zoning.ispolygon &&
                                                        <Polygon positions={zoning.geometry} />
                                                    }
                                                    {!zoning.ispolygon &&
                                                        <Polyline positions={zoning.geometry} />
                                                    }
                                                </MapContainer>
                                            </Box>
                                        </Modal>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ImageList sx={{ width: "100%", height: 450 }} cols={2} rowHeight={164}>
                                            {zoning.dataImage.length > 0 && zoning.dataImage.map((item) => (
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

export default HandleZoning