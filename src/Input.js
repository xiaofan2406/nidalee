/* @flow */
import styled from 'react-emotion';
import { theme, defaultFont } from './styles';

const Input = styled.input`
  ${defaultFont};

  padding: 8px 12px;
  max-height: 36px;
  color: ${theme.color};

  outline: none;
  &:focus,
  &:active {
    border-color: ${theme.primaryColor};
  }
  border-radius: 2px;
  border: 1px solid ${theme.borderColor};
`;

export default Input;
