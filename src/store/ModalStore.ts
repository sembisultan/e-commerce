import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalProps, ModalState } from '@/core/type';

const initialState: ModalState = {
    modals: {},
};

const modalStore = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalProps>) => {
            state.modals[action.payload.id] = {
                ...action.payload,
                isOpen: true,
            };
        },
        closeModal: (state, action: PayloadAction<string>) => {
            const modal = state.modals[action.payload];
            if (modal?.onClose) {
                modal.onClose();
            }
            delete state.modals[action.payload];
        },
        closeAllModals: (state) => {
            Object.values(state.modals).forEach(modal => {
                if (modal.onClose) {
                    modal.onClose();
                }
            });
            state.modals = {};
        },
    },
});

export const { openModal, closeModal, closeAllModals } = modalStore.actions;
export default modalStore.reducer;
