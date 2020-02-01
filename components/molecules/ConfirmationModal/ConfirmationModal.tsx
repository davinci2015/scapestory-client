import React, {useState} from 'react'
import Modal from 'components/molecules/Modal'
import {Button} from 'components/atoms'
import {spaces} from 'styles'

interface RenderProps {
    open: VoidFunction
}

interface Props {
    title: React.ReactNode
    description: React.ReactNode
    onConfirm: VoidFunction
    render: (props: RenderProps) => React.ReactNode
}

const ConfirmationModal: React.FunctionComponent<Props> = ({
    description,
    onConfirm,
    render,
    title,
}) => {
    const [isOpen, setOpen] = useState(true)

    const open = () => setOpen(true)

    const close = () => setOpen(false)

    return (
        <>
            <Modal isOpen={isOpen} shouldCloseOnEsc>
                <Modal.Content isOpen={isOpen}>
                    <div className="confirmation-modal">
                        <Modal.CloseButton onClick={close} />
                        <div>
                            <div className="confirmation-modal__title">{title}</div>
                            <div className="confirmation-modal__description">{description}</div>
                        </div>
                        <div className="confirmation-modal__buttons">
                            <Button
                                onClick={onConfirm}
                                dimensions="small"
                                color="tertiary"
                                variant="outlined"
                            >
                                Yes
                            </Button>
                            <Button onClick={close} dimensions="small" color="primary">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
            {render({open})}
            <style jsx>{`
                .confirmation-modal {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .confirmation-modal__title {
                    margin: ${spaces.s24};
                    margin-right: ${spaces.s60};
                }

                .confirmation-modal__description {
                    margin: 0 ${spaces.s24};
                }

                .confirmation-modal__buttons {
                    display: flex;
                    margin: ${spaces.s36} ${spaces.s24} ${spaces.s24} ${spaces.s16};
                }

                .confirmation-modal__buttons :global(.${Button.classes.root}) {
                    margin: 0 ${spaces.s8};
                }
            `}</style>
        </>
    )
}

export default ConfirmationModal
