'use client';

import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
}

const getModalSize = (size: string = 'small') => {
    const sizes = {
        small: 'max-w-lg',
        medium: 'max-w-2xl',
        large: 'max-w-4xl',
    };
    return sizes[size as keyof typeof sizes] || sizes.small;
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    size = 'small'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
            <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    aria-hidden="true"
                    onClick={onClose}
                />

                <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div className={`inline-block w-full text-left align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle ${getModalSize(size)} relative`}>
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
