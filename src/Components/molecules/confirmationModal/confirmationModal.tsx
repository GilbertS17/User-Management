import { useEffect } from "react";
import { ConfirmationModalProps } from "./confirmationModal.types";

// src/components/molecules/confirmationModal/ConfirmationModal.tsx
export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message
}: ConfirmationModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="conf-outer-container">
            <div className="conf-inner-container">
                <h3 className="conf-title">{title}</h3>
                <p className="conf-message">{message}</p>
                <div className="conf-button-container">
                    <button
                        onClick={onClose}
                        className="conf-cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="conf-delete-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};