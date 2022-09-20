import '../../assets/styles/cmps/_modal.scss'
import Modal from 'react-modal'
import OutsideClickHandler from 'react-outside-click-handler'

export const GenericModal = ({ isOpen, onClose, children }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }
    return (
        <div className='modal-container'>
            <OutsideClickHandler
                onOutsideClick={() => {
                    console.log('ts')
                }}
            >
                <Modal
                    isOpen={isOpen}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel='Example Modal'
                >
                    <button onClick={onClose}>close</button>
                    {children}
                    {/* <button onClick={onClose}>close</button>
                <div>I am a modal</div>
                <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
              </form> */}
                </Modal>
            </OutsideClickHandler>
        </div>
    )
}
