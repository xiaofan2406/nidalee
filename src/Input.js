/* @flow */
import styled from 'react-emotion';
import { theme, defaultText } from './styles';

const Input = styled.input`
  ${defaultText};

  padding: 6px 12px;
  height: 34px;
  color: ${theme.textColor};
  background-color: ${theme.eleBgColor};

  outline: none;
  &:focus,
  &:active {
    border-color: ${theme.primaryColor};
  }
  border-radius: 2px;
  border: 1px solid ${theme.borderColor};
`;

export default Input;
