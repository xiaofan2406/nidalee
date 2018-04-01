/* @flow */
import styled from 'react-emotion';
import { defaultFont, focusableElement } from './styles';

const Input = styled.input`
  ${defaultFont};
  ${focusableElement};
  border-radius: 2px;
  padding: 8px 12px;
  height: 38px;
`;

export default Input;
