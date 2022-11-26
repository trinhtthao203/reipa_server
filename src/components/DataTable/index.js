import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material";

const StyledDataGrid = styled(DataGrid)({
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus": {
        outline: "none",
    },
})

const DataTable = (props) => {
    return (
        <StyledDataGrid
            {...props}
        />
    )
}

export default DataTable