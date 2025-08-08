import './css/checkbox.css';

interface CheckboxProps {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  return (
    <label className="custom-checkbox">
      <input id="rememberMe"name="rememberMe" checked={checked} onChange={onChange} type="checkbox" />
      <span className="checkmark"></span>
    </label>
  );
}

export default Checkbox;
