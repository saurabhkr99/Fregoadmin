import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
const columns = [
    
    {
        field: "profileImage",
        headerName: "Avatar",
        width: 80,
        renderCell: (params) => {
            console.log(params);
            return (
                <>
                    <Avatar src={params.value} />
                </>
            );
        }
    },
    { field: 'firstName', headerName: 'FIRST NAME', width: 100 },
    { field: 'lastName', headerName: 'LAST NAME', width: 100 },
    { field: 'mobileNumber', headerName: 'MOBILE NUMBER', width: 150 },
    { field: 'email', headerName: 'EMAIL ID', width: 250 },
    { field: 'loginType', headerName: 'LOGIN TYPE', width: 100 }
    


]

const AllUsersData = () => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        axios.get("http://64.227.174.255:3300/api/authentication/all/users?page=1&size=$").then((res) => {
            console.log("Res:-", res);
            const result = res.data.data.map((item) => {
                return {
                    ...item, id: item._id
                }
            })
            setTableData(result)
        })

    }, [])

    console.log(tableData)

    return (
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={12}
            />
        </div>
    )
}
export default AllUsersData
