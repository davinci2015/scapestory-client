import React from 'react'
import Modal from 'react-modal'

import {zIndex, media} from 'styles'
import CloseButton from './CloseButton'
import Content from './Content'

interface Props extends ReactModal.Props {
    children: React.ReactNode
}

type ModalType = React.FunctionComponent<Props> & {
    CloseButton: typeof CloseButton
    Content: typeof Content
}

Modal.setAppElement('#__next')

const CustomModal: ModalType = ({children, isOpen, ...rest}) => (
    <>
        <Modal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} {...rest}>
            {children}
        </Modal>

        <style jsx>{`
            :global(.modal) {
                position: absolute;
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                outline: none;
                z-index: ${zIndex.HIGH};
            }

            @media ${media.up('small')} {
                :global(.modal) {
                }
            }

            :global(.modal-overlay) {
                -webkit-overflow-scrolling: touch;
                position: fixed;
                top: 0px;
                left: 0px;
                right: 0px;
                bottom: 0px;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: ${zIndex.HIGH};
            }
        `}</style>
    </>
)

CustomModal.CloseButton = CloseButton
CustomModal.Content = Content

export default CustomModal
