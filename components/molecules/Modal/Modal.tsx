import React from 'react'
import Modal from 'react-modal'

import {zIndex, media, spaces} from 'styles'
import CloseButton from './CloseButton'
import Content from './Content'
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock'

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
        <Modal
            className="modal"
            overlayClassName="modal-overlay"
            overlayRef={node => {
                isOpen ? disableBodyScroll(node) : enableBodyScroll(node)
            }}
            isOpen={isOpen}
            {...rest}
        >
            {children}
        </Modal>

        <style jsx>{`
            :global(.modal) {
                position: relative;
                min-height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                outline: none;
                z-index: ${zIndex.HIGH};
            }

            @media ${media.up('small')} {
                :global(.modal) {
                    margin: ${spaces.s30} auto;
                    width: calc(100% - ${spaces.s36});
                    max-width: 730px;
                    min-height: calc(100% - ${spaces.s60});
                }
            }

            :global(.modal-overlay) {
                position: fixed;
                overflow-y: auto;
                overflow-x: hidden;
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
