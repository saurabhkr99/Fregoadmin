import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import PropTypes from 'prop-types';
import './reportcard.css'

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: "80%",
//   height: "50%",
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function ReportCard({ postId, open, setOpen }) {

  const [reportData, setReportData] = React.useState(null);
  // const [apiStatus,setApiStatus] = React.useState({
  //   loading: false,
  //   error: '',
  // });
  function isImage(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }
  function isVideo(url) {
    return /\.(mp4|3gp)$/.test(url);
  }
  
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    console.log("USEEFFECT IN REPORTCARD", postId);
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    };
    if (postId) {
      axios.get(`http://64.227.174.255:3300/api/posts/get/post/by/${postId}`, config).then((res) => {
        console.log("POST DATA RESPONSE:-", res.data.data);
        setReportData(res.data.data)

      })
        .catch(e => console.log("ERROR FETCHING POST:-", e))
    }
  }, [postId])

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      {reportData && <Modal
        open={open}
        onClose={handleClose}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}

        <div className='card_container'>
          <div className='post'>
          {isImage(reportData.postURL) && <img src={reportData.postURL} alt="image" />}  
          {isVideo(reportData.postURL) && <video src={reportData.postURL} alt="image" />}  
          </div>
          <div className='card_alldetail'>
            <h1>Report Users Details</h1>
            <div className='d1'>Post Type:-{reportData.postType}</div>
            <div className='d2'>User Name:{reportData.user.firstName} {reportData.user.lastName}</div>
            <div className='d2'>Email id-:{reportData.user.email}</div>
            <div className='d2'>Mobile Number-:{reportData.user.mobileNumber}</div>
            <div className='d2'>detail2</div>
            <button>Delete post</button>
            <button>Block User</button>
            <button>warning</button>
          </div>
        </div>
      </Modal>}
    </div>
  );
}

// ReportCard.propTypes = {
//   postId: PropTypes.string,
// }
