import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Constants from '../../constants';
import Screens from '../../constants/screens';
import Strings from '../../constants/strings';
import Loading from "../Loading";
import Swal from 'sweetalert2';
import PostsTable from '../../components/PostsTable';

//elelment
import { Pagination, Box, Container, Grid, Tooltip, Fab, Typography, Button, Drawer } from "@mui/material";
import { Add } from "@mui/icons-material";
import {
    storeZoningList
} from "../../store/slice/zoning.slice";
import {
    storePostList
} from "../../store/slice/post.slice";
import {
    storeStatusList
} from "../../store/slice/status.slice";
//function
import ZoningService from "../../services/zoning.service";
import StatusService from "../../services/status.service";
import PostService from "../../services/post.service";

const zoningService = new ZoningService();
const statusService = new StatusService();
const postService = new PostService();


function Post() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [state, setState] = React.useState(false);

    const [changePage, setChangePage] = React.useState(true);

    const [pagingState, setPagingState] = React.useState({
        pageSize: 5,
        currentPage: 1,
        totalPages: undefined
    });

    const updatePagingState = (newState) => {
        setPagingState((prevState) => ({
            ...prevState,
            ...newState
        }))
    }

    const { postList } = useSelector(
        (state) => state.post
    );
    const { statusList } = useSelector(
        (state) => state.status
    );

    const getPostList = async () => {
        try {
            var result = await postService.getAll(pagingState.currentPage - 1, pagingState.pageSize);
            setChangePage(false);
            if (pagingState.pageSize) {
                updatePagingState({
                    currentPage: pagingState.currentPage || 1,
                    totalPages: Math.ceil(result.data.count / pagingState.pageSize),
                })
            }
            dispatch(storePostList(result.data.rows));
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

    React.useEffect(() => {
        const initData = async () => {
            try {
                getPostList();
            } catch (error) {
                console.log(error);
            }
        }
        initData();
        if (postList[0] === undefined) {
            getPostList();
        }
        if (statusList[0] === undefined) {
            getStatusList();
        }
        if (location.state) {
            console.log(location.state);
            setChangePage(location.state.changePage)
        }
    }, [changePage])

    const onPageChange = async (event, page) => {
        updatePagingState({ currentPage: page });
        setChangePage(true);
    }
    return (
        <Container >
            <Grid container sx={{ boxShadow: Constants.Styles.BOX_SHADOW, padding: 2, borderRadius: 1 }}>
                <Grid item xs={12} mt={2}>
                    <Typography style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>Quản lý bài đăng</Typography>
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
                                    <PostsTable
                                        limitEntry={pagingState.pageSize}
                                        page={pagingState.currentPage}
                                        allPosts={postList}
                                        isPosts={true}
                                        status={statusList}
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
                        bottom: { xs: 5, sm: 10, md: 20 },
                        right: { xs: 20, sm: 30, md: 50 },
                        backgroundColor: Constants.Styles.OCEAN_BLUE_COLOR,
                        color: Constants.Styles.WHITE_COLOR,
                    }}
                    onClick={() => setState(true)}
                // onClick={() => navigate({ pathname: Screens.HANDLE_ACCOUNT })}
                >
                    <Add />
                </Fab>
            </Tooltip>
            <Drawer
                anchor='bottom'
                open={state}
                onClose={() => setState(false)}
            >
                <Button variant="outlined" size="large" onClick={() => navigate({ pathname: Screens.HANDLE_ZONING })} >Thêm một bài đăng</Button>
                <Button variant="outlined" size="large" color="secondary" >Thêm nhiều bài đăng</Button>
            </Drawer>
        </Container >
    )
}

export default Post