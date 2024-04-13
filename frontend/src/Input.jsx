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
        className="mb-5 w-full border-solid border-2 p-2"
        placeholder={placeholder || `Enter ${fieldNameText}`}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
