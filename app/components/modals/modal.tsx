'use client';

import React, { useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    onSubmit?: () => void;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    footer,
    actionLabel,
    disabled = false,
    secondaryAction,
    secondaryLabel,
}: ModalProps) => {
    const [showModal, setShowModal] = useState<boolean>(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;

        setShowModal(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        onSubmit?.();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled) return;

        secondaryAction?.();
    }, [disabled, secondaryAction]);

    if (!isOpen && !showModal) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                {title && <h2 className="mb-4 text-xl font-bold">{title}</h2>}

                <div className="text-gray-600">{children}</div>

                {footer ?? (
                    <div className="mt-6 flex justify-end gap-3">
                        {secondaryAction && (
                            <button
                                type="button"
                                disabled={disabled}
                                onClick={handleSecondaryAction}
                                className="rounded-lg border px-4 py-2"
                            >
                                {secondaryLabel ?? "Cancel"}
                            </button>
                        )}

                        <button
                            type="button"
                            disabled={disabled}
                            onClick={handleSubmit}
                            className="rounded-lg bg-rose-500 px-4 py-2 text-white"
                        >
                            {actionLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;