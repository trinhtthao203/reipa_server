import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2';
import DataTable from "../DataTable";
import Constants from "../../constants";
import { Edit, Delete } from '@mui/icons-material';
import { Button } from "@mui/material";
import Strings from "../../constants/strings";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import Screens from "../../constants/screens";
import Helper from "../../commons/helpers"
const userService = new UserService();

const AccountTable = (props) => {
    const navigate = useNavigate();
    const rows = props.allAccount?.map((account, index) => {
        return {
            index: (props.limitEntry * (props.page - 1)) + (index + 1),
            id: account.id,
            fullname: account.fullname,
            phonenumber: account.phonenumber,
            address: account.address,
            avatar: account.avatar,
            createdAt: Helper.formatDateForInput(account.createdAt),
            role: props.role?.find((item) => item.id === account.role_id)?.name,
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

    const columns = [
        {
            field: "index",
            headerName: "#",
            width: 10
        },
        {
            field: "fullname",
            headerName: "Họ tên",
            width: 170
        },
        {
            field: "phonenumber",
            headerName: "Số điện thoại",
            width: 110
        },
        {
            field: "role",
            headerName: "Vai trò",
            width: 150
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 210
        },
        {
            field: "avatar",
            headerName: "Avatar",
            width: 100,
            renderCell: renderImage
        },
        {
            field: "createdAt",
            headerName: "Ngày tham gia",
            width: 130,
        },
        {
            field: "col5", headerName: "", width: 150, renderCell: (params) => [
                <Button onClick={() => handleUpdate(params.id)} ><Edit sx={{ color: Constants.Styles.COLOR_CHETWODE_BLUE }} /></Button>,
                <Button onClick={() => handleDelete(params.id)}><Delete sx={{ color: Constants.Styles.COLOR_AMBER }} /></Button>
            ]
        }
    ];

    const handleUpdate = (e) => {
        navigate(Screens.HANDLE_ACCOUNT, {
            state: {
                user_id: e,
                isUpdate: true
            }
        });
    }

    const handleDelete = (e) => {
        Swal.fire({
            title: Strings.ALert.WARNING_SURE_DELETE,
            text: "Bạn sẽ không thể hoàn tác!",
            icon: Strings.ALert.WARNING,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xóa nó!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await userService.delete(e);
                    Swal.fire(
                        'Đã xóa!',
                        result.data.message,
                        'success'
                    )
                } catch (err) {
                    Swal.fire(
                        'Xóa Không thành công!',
                        err.data.message,
                        Strings.ALert.WARNING
                    )
                }
            }
        })
    }

    return (
        <DataTable
            rowsPerPageOptions={[5]}
            rows={rows}
            columns={columns}
            rowHeight={82}
            hideFooter
        />
    );
};

export default AccountTable;