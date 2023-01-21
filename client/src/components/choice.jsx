import useToggle from "../hooks/useToggleState";

export default function Choice({
  text,
  defaultChecked = false,
  keyName,
  onChange,
}) {
  const [state, toggle] = useToggle(defaultChecked);
  const handleToggleChange = () => {
    toggle();
    onChange && onChange(!state);
  };
  return (
    <div className="form form__choice" key={keyName}>
      <div
        className={`form__choice--label choice-label-${state && "active"}`}
        onClick={handleToggleChange}
      />
      <h4 className="subtitle">{text}</h4>
    </div>
  );
}
