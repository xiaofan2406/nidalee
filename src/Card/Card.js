/* @flow */
import * as React from 'react';
import { css } from 'react-emotion';
import { theme, fontSizes } from '../styles';

const cssCard = css`
  display: flex;
  flex-direction: column;
  background-color: ${theme.boxBgColor};
  border: 1px solid ${theme.borderColor};
`;

const cssCardHeading = css`
  border-bottom: 1px solid ${theme.borderColor};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const cssCardTitle = css`
  font-size: ${fontSizes.large}px;
  font-weight: bold;
`;

const cssCardCotent = css`
  padding: 12px 16px;
`;

type CardProps = {
  +children: React.Node,
  +title: string,
};

const Card = ({ children, title }: CardProps) => (
  <div className={cssCard}>
    <div className={cssCardHeading}>
      {typeof title === 'string' ? (
        <span className={cssCardTitle}>{title}</span>
      ) : (
        title
      )}
    </div>
    <div className={cssCardCotent}>{children}</div>
  </div>
);

export default Card;
