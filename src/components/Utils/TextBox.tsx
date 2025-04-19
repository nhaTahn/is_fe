import React, { InputHTMLAttributes } from 'react';
import styles from './styles/TextBox.module.css';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  className,
  containerClassName,
  ...rest
}) => {
  return (
    <div className={`${styles.inputGroup} ${containerClassName || ''}`}>
      {label && <label>{label}</label>}
      <input className={className} {...rest} />
    </div>
  );
};

export default TextBox;