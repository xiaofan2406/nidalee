import React from 'react';
import {render, screen} from '@testing-library/react';

import {Menu, getNextIndex, getPrevIndex} from './Menu';

it('renders a vertical menu by default ', () => {});

it('adds additional class', () => {});

it('takes html div props', () => {});

test('getNextIndex', () => {
  expect(getNextIndex(-3, [1, 2, 3].length)).toBe(0);
  expect(getNextIndex(-1, [1, 2, 3].length)).toBe(0);
  expect(getNextIndex(0, [1, 2, 3].length)).toBe(1);
  expect(getNextIndex(1, [1, 2, 3].length)).toBe(2);
  expect(getNextIndex(2, [1, 2, 3].length)).toBe(0);
  expect(getNextIndex(3, [1, 2, 3].length)).toBe(0);
  expect(getNextIndex(4, [1, 2, 3].length)).toBe(0);
});

test('getPrevIndex', () => {
  expect(getPrevIndex(-3, [1, 2, 3].length)).toBe(2);
  expect(getPrevIndex(-1, [1, 2, 3].length)).toBe(2);
  expect(getPrevIndex(0, [1, 2, 3].length)).toBe(2);
  expect(getPrevIndex(1, [1, 2, 3].length)).toBe(0);
  expect(getPrevIndex(2, [1, 2, 3].length)).toBe(1);
  expect(getPrevIndex(3, [1, 2, 3].length)).toBe(2);
  expect(getPrevIndex(5, [1, 2, 3].length)).toBe(2);
});
