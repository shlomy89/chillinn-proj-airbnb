import '../../assets/styles/cmps/_air-cover-modal.scss'
import Modal from 'react-modal'
import OutsideClickHandler from 'react-outside-click-handler'

export const GenericModal = ({ isOpen, onClose, children }) => {
    return (
        <div className='modal-container'>
            <OutsideClickHandler
                onOutsideClick={() => {
                    console.log('ts')
                }}
            >
                <Modal
                    isOpen={isOpen}
                    style={require('../../assets/styles/cmps/_air-cover-modal.scss')}
                    contentLabel='Example Modal'
                >
                    <button onClick={onClose}>x</button>
                    {children}
                </Modal>
            </OutsideClickHandler>
        </div>
    )
}
