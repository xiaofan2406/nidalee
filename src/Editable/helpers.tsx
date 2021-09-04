import * as React from 'react';
import {EditableAction} from './Editable';
import {warn} from '../utils';

export const useValidateProps = (
  escAction: EditableAction,
  blurAction: EditableAction
) => {
  React.useEffect(() => {
    warn(
      escAction === 'cancel' && blurAction === 'cancel',
      'Editable',
      'At least one of [`escAction`, `blurAction`] should be `save`.'
    );
  }, [escAction, blurAction]);
};

export const getValue = (
  ref: React.RefObject<HTMLDivElement>,
  autoTrim?: boolean
) => {
  const text = ref.current!.innerText || '';
  return autoTrim ? text.trim() : text;
};

export const ensureCursorAtTheEnd = (ref: React.RefObject<HTMLDivElement>) => {
  const range = document.createRange();
  range.selectNodeContents(ref.current!);
  range.collapse(false);
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

export const syncInnerHTML = (
  ref: React.RefObject<HTMLDivElement>,
  value: string
) => {
  const html = value
    .split(/\n\n|\n/)
    .map((line) => line || '<br />')
    .map((line) => `<div>${line}</div>`)
    .join('');
  ref.current!.innerHTML = html;
};
