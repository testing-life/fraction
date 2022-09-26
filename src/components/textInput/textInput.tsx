import React, { ChangeEvent, FC, useEffect, useRef } from 'react';
import './textInput.css';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  id: string;
}

const TextInput: FC<Props> = ({ onChange, placeholder, label, id }) => {
  return (
    <div className="textInput">
      <label className="textInput__label" htmlFor={id}>
        {label}
      </label>
      <input className="textInput__input" type="text" id={id} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default TextInput;
