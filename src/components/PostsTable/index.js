import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2';
import DataTable from "../DataTable";
import Constants from "../../constants";
import { Edit, Delete } from '@mui/icons-material';
import { Button } from "@mui/material";
import Strings from "../../constants/strings";
import { useNavigate } from "react-router-dom";
import Screens from "../../constants/screens";
import { red } from "@mui/material/colors";

import ZoningService from "../../services/zoning.service";
import PostService from "../../services/post.service";
const zoningService = new ZoningService();
const postService = new PostService();

const PostsTable = (props) => {
    const navigate = useNavigate();
    const rows = props.allPosts?.map((post, index) => {
        return {
            index: (props.limitEntry * (props.page - 1)) + (index + 1),
            id: post.id,
            name: post.name || post.title,
            // phonenumber: post.phonenumber,
            // address: post.address,
            status: ({ name: props.status?.find((item) => item.id === post.status_id)?.name, id: props.status?.find((item) => item.id === post.status_id)?.id }),
            // role: props.role?.find((item) => item.id === post.role_id)?.name,
        };
    }) || [];

    const renderImage = (params) => {
        return (
            <img
                src={params.formattedValue ? `${Constants.Api.BASE_IMAGES}/${params.formattedValue}` : `${Constants.Api.BASE_IMAGES}/user.png`}
                style={{ width: "60px", height: "60px", margin: "7px" }}
            />
        )
    };

    const renderStatus = (params) => {
        const colorArray = ["blue", "green", "red"]
        return (
            <p style={{ color: colorArray[params.value.id - 1] }}>{params.value.name}</p>
        )
    };
    const renderTitle = (params) => {
        return (
            <p style={{ fontWeight: "bold" }}>{params.value}</p>
        )
    };

    const columns = [
        {
            field: "index",
            headerName: "#",
            width: 10
        },
        {
            field: "name",
            headerName: "Ti??u ?????",
            width: 650,
            renderCell: renderTitle
        },
        // {
        //     field: "phonenumber",
        //     headerName: "S??? ??i???n tho???i",
        //     width: 130
        // },
        // {
        //     field: "role",
        //     headerName: "Vai tr??",
        //     width: 150
        // },
        // {
        //     field: "address",
        //     headerName: "?????a ch???",
        //     width: 210
        // },
        {
            field: "status",
            headerName: "Tr???ng th??i",
            width: 150,
            renderCell: renderStatus
        },
        {
            field: "col5", headerName: "", width: 150, renderCell: (params) => [
                <Button onClick={() => handleUpdate(params.id)} ><Edit sx={{ color: Constants.Styles.COLOR_CHETWODE_BLUE }} /></Button>,
                <Button onClick={() => handleDelete(params.id)}><Delete sx={{ color: Constants.Styles.COLOR_AMBER }} /></Button>
            ]
        }
    ];

    const handleUpdate = (e) => {
        if (props.isPosts) {
            navigate(Screens.HANDLE_POST, {
                state: {
                    post_id: e,
                    isUpdate: true
                }
            });
        } else {
            navigate(Screens.HANDLE_ZONING, {
                state: {
                    zoning_id: e,
                    isUpdate: true
                }
            });
        }
    }


    const handleDelete = (e) => {
        Swal.fire({
            title: Strings.ALert.WARNING_SURE_DELETE,
            text: "B???n s??? kh??ng th??? ho??n t??c!",
            icon: Strings.ALert.WARNING,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'V??ng, x??a n??!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (props.isPosts) {
                        const result = await postService.delete(e);
                        Swal.fire(
                            '???? x??a!',
                            result.data.message,
                            'success'
                        )
                        navigate(Screens.POST, {
                            state: {
                                changePage: false,
                            }
                        })
                    } else {
                        const result = await zoningService.delete(e);
                        Swal.fire(
                            '???? x??a!',
                            result.data.message,
                            'success'
                        )
                        navigate(Screens.ZONING, {
                            state: {
                                changePage: true,
                            }
                        })
                    }
                } catch (err) {
                    Swal.fire(
                        'X??a Kh??ng th??nh c??ng!',
                        err.data.message,
                        Strings.ALert.WARNING
                    )
                }
            }
        })
    }

    return (
        <DataTable
            key={rows.id}
            rowsPerPageOptions={[5]}
            rows={rows}
            columns={columns}
            rowHeight={82}
            hideFooter
        />
    );
};

export default PostsTable;