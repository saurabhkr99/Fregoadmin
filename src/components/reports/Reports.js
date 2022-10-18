import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './reports.scss'
import ReportCard from '../reportcard/ReportCard';
// import Avatar from '@mui/material/Avatar';
const columns = [
    {
        field: 'id',
        headerName: 'SL No.',
        filterable: false,
        renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    { field: 'message', headerName: 'MESSAGE', width: 300 },
    { field: 'userId', headerName: 'USER ID', width: 300 },
    { field: 'postId', headerName: 'POST ID', width: 300},
    {
        field: 'viewPost', headerName: 'VIEW POST', width: 300, filterable: false, renderCell: () => (
            <div className='report-post-btn' onClick={(id) => {
                // console.log("Clicked on Row post cell:-",id);
            }}>VIEW POST</div>)
    },


]

const Reports = () => {
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState([]);
    const [postId, setPostId] = useState("");

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => tableData.find((row) => row.id === id));
        // console.log(selectedRowsData);
    };

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        };
        axios.get("http://64.227.174.255:3300/api/report/getAll", config).then((res) => {
            console.log("Report res:-", res.data.Reports);
            const result = res.data.Reports.map((item) => {
                return {
                    ...item, id: item._id
                }
            })
            setTableData(result)
        }).catch(e => console.log("Error Fetching Reports:-", e))
    }, []);

    const handleOnCellClicked = (cellData) => {
        // console.log("Cell clicked:-",cellData);
        if (cellData.field == "viewPost") {
            // View Post Cell Clicked
            const postId = tableData.find((tableItem) => tableItem.id === cellData.row.id).postId;
            console.log("tableItem:-", postId);
            if(postId){
                setPostId(postId);
                setOpen(true);
            }

        }
    }
    console.log("TABLE DATA:-", tableData);
    // console.log(tableData)
    return (
        <>
            <div id='reports' style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={12}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    onCellClick={handleOnCellClicked}
                />
            </div>
            <ReportCard open={open}  setOpen={setOpen} postId={postId}/>
        </>
    )
}
export default Reports
