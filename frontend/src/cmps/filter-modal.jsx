import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StayFilter } from './stay-filter.jsx'
import { ReactComponent as CloseIcon } from '../assets/img/icons/close-icon.svg'
import Divider from '@mui/material/Divider'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: '90vh',
    overflowY: 'scroll',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
}

export default function FilterModal(props) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div className="filter-modal">
            <Button
                className="open-filter-btn"
                variant="outlined"
                onClick={handleOpen}>
                Filters
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Button onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                        <Typography id="transition-modal-title" variant="h5" component="div" textAlign='center'>
                            Filters
                        </Typography>
                        <Divider className="divider" />
                        <StayFilter {...props} handleClose={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </div >
    )
}
