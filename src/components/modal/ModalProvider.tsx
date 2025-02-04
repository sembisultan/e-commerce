'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {ModalStateProps, RootState} from '@/core/type';
import { closeModal } from '@/store/ModalStore';

import Modal from './Modal';

const ModalProvider = () => {
    const dispatch = useDispatch();
    const modals = useSelector((state: RootState) => state.modal.modals);

    const renderModal = React.useCallback(([id, modalProps]: [string, ModalStateProps]) => {
        const Content = modalProps.content;

        return (
            <Modal
                isOpen={modalProps.isOpen}
                onClose={() => dispatch(closeModal(id))}
                size={modalProps.size}
            >
                <Content {...modalProps.contentProps} modalId={id} />
            </Modal>
        );
    }, [dispatch]);

    return (
        <div className="modal-provider">
            {Object.entries(modals).map((entry, index) => (
                <React.Fragment key={entry[0]}>
                    {renderModal(entry)}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ModalProvider;
