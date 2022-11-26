import React from 'react';
import Constants from '../../constants';
import Screens from '../../constants/screens';
import Strings from '../../constants/strings';
import Loading from "../Loading";
//element
import { Pagination, Box, Container, Grid, Tooltip, Fab, Typography } from "@mui/material";
import PhotoTable from '../../components/AccountTable';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
//function
import {
    storeRoleList
} from "../../store/slice/role.slice";
import UserService from "../../services/user.service";
const userService = new UserService();
function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [changePage, setChangePage] = React.useState(true);
    const [pagingState, setPagingState] = React.useState({
        pageSize: 5,
        currentPage: 1,
        totalPages: undefined
    })
    const updatePagingState = (newState) => {
        setPagingState((prevState) => ({
            ...prevState,
            ...newState
        }))
    }

    const [userList, setUserList] = React.useState([]);
    const updateUserList = (newState) => {
        setUserList(() => [
            ...newState,
        ]);
    };

    const [roleList, setRoleList] = React.useState([]);
    const updateRoleList = (newState) => {
        setRoleList(() => [
            ...newState,
        ]);
    };

    const getAllRole = async () => {
        try {
            var result = await userService.AllRole();
            setRoleList(result.data);
            console.log(result.data);
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

    const getAllUser = async () => {
        try {
            var result = await userService.AllUser(pagingState.currentPage - 1, pagingState.pageSize);
            setChangePage(false);
            if (pagingState.pageSize) {
                updatePagingState({
                    currentPage: pagingState.currentPage || 1,
                    totalPages: Math.ceil(result.data.userInfo.count / pagingState.pageSize),
                })
            }
            updateUserList(result.data.userInfo.rows);
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getAllRole();
        const initData = async () => {
            try {
                getAllUser();
            } catch (error) {
                console.log(error);
            }
        }
        initData();
    }, [changePage])

    const onPageChange = async (event, page) => {
        updatePagingState({ currentPage: page });
        setChangePage(true);
    }
    return (
        <Container >
            <Grid container sx={{ boxShadow: Constants.Styles.BOX_SHADOW, padding: 2, borderRadius: 1 }}>
                <Grid item xs={12} mt={2}>
                    <Typography style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Danh sách người dùng</Typography>
                    <Box>
                        {(
                            pagingState.currentPage &&
                            pagingState.totalPages &&
                            pagingState.pageSize
                        ) ? (
                            <>
                                <Box style={{
                                    width: "100%",
                                    height: "55vh",
                                }}>
                                    <PhotoTable
                                        limitEntry={pagingState.pageSize}
                                        page={pagingState.currentPage}
                                        allAccount={userList}
                                        role={roleList}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "right", marginTop: "20px" }}>
                                    <Pagination
                                        className="mt-2"
                                        key={pagingState.currentPage}
                                        count={pagingState?.totalPages}
                                        page={pagingState?.currentPage}
                                        color="primary"
                                        variant="outlined"
                                        showFirstButton
                                        showLastButton
                                        onChange={onPageChange}
                                        shape="rounded"
                                    />
                                </Box>
                            </>
                        ) : (
                            <Loading color={Constants.Styles.OCEAN_BLUE_COLOR} />
                        )}
                    </Box>
                </Grid>
            </Grid>
            <Tooltip title={<span style={{ fontSize: Constants.Styles.FONT_SIZE_SMALL }}>{Strings.Common.ADD_NEW}</span>} placement="left">
                <Fab
                    aria-label="add"
                    color="primary"
                    sx={{
                        position: "fixed",
                        bottom: { xs: 20, sm: 30, md: 50 },
                        right: { xs: 20, sm: 30, md: 50 },
                        backgroundColor: Constants.Styles.OCEAN_BLUE_COLOR,
                        color: Constants.Styles.WHITE_COLOR,
                    }}
                    onClick={() => navigate({ pathname: Screens.HANDLE_ACCOUNT })}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
        </Container >
    )
}
export default Account