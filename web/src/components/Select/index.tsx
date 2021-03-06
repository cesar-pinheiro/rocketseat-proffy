import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  optionMessage?: string;
}

const Select: React.FunctionComponent<SelectProps> = ({ name, label, options, optionMessage, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} value={ optionMessage ? "optionDefault" : undefined } {...rest}>
        { optionMessage && <option value="optionDefault" disabled hidden>{optionMessage}</option> }

        {options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  );
}

export default Select;