const Input = ({
  fieldName,
  placeholder,
  label,
  required,
  state,
  setState,
}) => {
  const fieldNameText =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replaceAll("-", " ");
  return (
    <div>
      <label htmlFor={fieldName}>{label || fieldNameText}</label>
      <input
        required={required ?? false}
        id={fieldName}
        className="input input-bordered w-full"
        placeholder={placeholder || `Enter ${fieldNameText}`}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
