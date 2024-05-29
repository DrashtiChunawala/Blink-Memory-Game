import React from 'react'
import { useImperativeHandle, forwardRef ,useRef} from 'react'
import './Modal.css'

const Modal = forwardRef(({children,handleEndGame,...props}, ref) => {
const modalRef = useRef();
    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                modalRef.current.showModal();
            },
            closeModal: () => {
                modalRef.current.close();
            }
        }
    })
    return (
        <dialog  ref={modalRef}>
            <div className='dialogModal'>
                <div className='dialogModal-message'>
                {children}
                </div>
                <div className='dialogModal-buttons'>
                    <button onClick={handleEndGame} >End Game</button>
                    {/* <button onClick={() => modalRef.current.closeModal()}>Play Again</button> */}
                </div>
            </div>

        </dialog>
    )
})

export default Modal
