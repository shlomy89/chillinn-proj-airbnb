import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { StayFilter } from './stay-filter.jsx'
import Badge from '@mui/material/Badge'
import { grey } from '@mui/material/colors'
import filterSvg from '../assets/img/icons/filter-icon.svg'

const style = {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    height: '90vh',
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
        <React.Fragment>
            <Badge
                color="primary"
                badgeContent={props.counter}
                className={props.counter ? 'filter-active' : ''}>
                <button className={`${props.counter ? 'active' : ''} open-filter-btn flex align-center`}
                    onClick={handleOpen}>
                    <div className='flex justify-center align-center'>
                        <img src={filterSvg} className="filter-icon" />&nbsp;
                        Filters
                    </div>
                </button>
            </Badge>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        className="filter-modal"
                        sx={style}>
                        <StayFilter {...props} handleClose={handleClose} />
                    </Box>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}
