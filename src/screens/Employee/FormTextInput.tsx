import React from "react";

interface Props {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
}

const FormTextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  const [value, setValue] = useState('')
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput877" className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleFormControlInput877"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value, term)}
      />
    </div>
  );
};

export default FormTextInput;
