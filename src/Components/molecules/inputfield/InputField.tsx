import { InputFieldProps } from "./InputField.types";

const InputField = <TFormValues extends Record<string, unknown>>({
  label,
  name,
  register,
  required,
  type,
  error
}: InputFieldProps<TFormValues>) => (
  <div className="if-container">
    <label className="if-label">{label}</label>
    <input
      {...register(name, { required })}
      type={type}
      className="if-input"
    />
    {error && <p className="if-error">{error}</p>}
  </div>
);

export default InputField;
