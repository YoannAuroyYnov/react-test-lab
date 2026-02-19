export const TextInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  testId,
  errorTestId,
  errorText,
  required = false,
  requiredIndicator,
}) => {
  return (
    <div className="input-container">
      <label className="label" htmlFor={id}>
        {label} {required && requiredIndicator}
      </label>
      <input
        data-testid={testId}
        required={required}
        value={value}
        onChange={onChange}
        className="input"
        id={id}
        type={type}
      />
      <p data-testid={errorTestId} className="error-text">
        {errorText}
      </p>
    </div>
  );
};
