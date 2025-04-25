export interface ConfirmationModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    title: string;
    message: string;
}