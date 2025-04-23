import { UseFormRegister, FieldValues, Path } from "react-hook-form";

export interface InputFieldProps<TFormValues extends FieldValues> {
  label: string;
  type: string;
  name: Path<TFormValues>;  
  required?: boolean;
  register: UseFormRegister<TFormValues>;
}
