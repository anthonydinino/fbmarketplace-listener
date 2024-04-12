const Input = ({ fieldName, state, setState }) => {
  const fieldNameText =
    fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace("-", " ");
  return (
    <div>
      <label htmlFor={fieldName}>{fieldNameText}</label>
      <input
        id={fieldName}
        className="mb-5 w-full border-solid border-2 p-2"
        placeholder="Enter location"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};

export default Input;
