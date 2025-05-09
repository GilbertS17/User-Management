export interface CardProps {
  initial: string;
  name: string;
  email: string;
  status: string;
  dob: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
