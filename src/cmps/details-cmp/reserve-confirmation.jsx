// import React from 'react'
// const ReserveConfirmationModal = (props) => {
//     return (
//         <div className='reservation-modal'>
//             <div className='modal-content'>
//                 <div className='modal-header'>
//                     <h4 className='modal-title'>Modal title</h4>
//                 </div>
//                 <div className='modal-body'>This is the modal content</div>
//             </div>
//             <div className='modal-footer'>
//                 <button className='button'>Close</button>
//             </div>
//         </div>
//     )
// }

// export default ReserveConfirmationModal

import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4
}

export function ReserveConfirmationModal({ open, handleClose }) {
    // const [open, setOpen] = React.useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)

    return (
        <div>
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id='transition-modal-title'
                            variant='h6'
                            component='h2'
                        >
                            <h1>Order Confirmed</h1>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
