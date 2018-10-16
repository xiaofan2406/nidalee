import * as React from 'react';
import { css, cx } from 'react-emotion';
import { fontSizes, theme } from '../styles';

// TODO extends React.HTMLAttributes<HTMLSpanElement>, but skip docz
export interface SpanProps {
  tooltip: string;
  children: React.ReactNode;
  tooltipPosition?: 'top' | 'left' | 'right' | 'bottom';
  className?: string;
}

const cssTooltipLeft = css`
  ::before {
    left: 0%;
    top: 50%;
    margin-left: -12px;
    transform: translateY(-50%) rotate(-90deg);
  }

  ::after {
    left: 0%;
    top: 50%;
    margin-left: -8px;
    transform: translateX(-100%) translateY(-50%);
  }
`;

const cssTooltipTop = css`
  ::before {
    left: 50%;
  }
  ::after {
    left: 50%;
  }
`;

const cssTooltipBottom = css`
  ::before {
    top: 100%;
    margin-top: 8px;
    transform: translateX(-50%) translateY(-100%) rotate(-180deg);
  }
  ::after {
    top: 100%;
    margin-top: 8px;
    transform: translateX(-50%) translateY(0%);
  }
`;

const cssTooltipRight = css`
  ::before {
    left: 100%;
    top: 50%;
    margin-left: 1px;
    transform: translateY(-50%) rotate(90deg);
  }
  ::after {
    left: 100%;
    top: 50%;
    margin-left: 8px;
    transform: translateX(0%) translateY(-50%);
  }
`;

const cssTooltip = css`
  position: relative;
  display: inline-block;
  cursor: help;

  ::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px 6px 0 6px;
    border-style: solid;
    border-color: ${theme.eleBgColor} transparent transparent transparent;
    /* TODO z-index */
    z-index: 100;
    opacity: 0;
  }

  ::after {
    content: attr(aria-label);
    background: ${theme.eleBgColor};
    font-size: ${fontSizes.small}px;
    color: ${theme.textColorInverse};
    line-height: 1.4;
    text-align: center;

    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%) translateY(-100%);

    border-radius: 2px;
    pointer-events: none;
    padding: 6px 12px;
    white-space: nowrap;
    /* TODO z-index */
    z-index: 99;
    opacity: 0;
  }

  :hover::before,
  :hover::after {
    opacity: 1;
  }
`;

const getPositionCss = (position: SpanProps['tooltipPosition']) => {
  switch (position) {
    case 'top':
      return cssTooltipTop;
    case 'bottom':
      return cssTooltipBottom;
    case 'left':
      return cssTooltipLeft;
    case 'right':
      return cssTooltipRight;
  }
};

const Span: React.SFC<SpanProps> = ({
  tooltip,
  tooltipPosition,
  children,
  className,
  ...rest
}) => {
  const hasTooltip = tooltip != null;
  const tooltipProps = hasTooltip
    ? {
        'data-nidalee-ttp': tooltipPosition,
        'aria-label': tooltip,
      }
    : {};

  return (
    <span
      {...tooltipProps}
      {...rest}
      className={cx(
        { [cssTooltip]: hasTooltip },
        hasTooltip ? getPositionCss(tooltipPosition) : '',
        className
      )}
    >
      {children}
    </span>
  );
};

Span.defaultProps = {
  tooltipPosition: 'top',
};

export default Span;
