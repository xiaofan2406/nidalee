/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import Icon from './Icon';

type DualPanelIndex = 'first' | 'last' | 'both';
type DualPanelDirection = 'vertical' | 'horizontal';

type DualPanelProps = {
  children: React.Node,
  direction: DualPanelDirection,
  initialPanel?: DualPanelIndex,
  className?: string,
};

type DualPanelState = {
  show: DualPanelIndex,
};

const cssDualPanel = css`
  display: flex;

  &.vertical {
    flex-direction: column;
    & > .toggles {
      flex-direction: row;
      padding: 6px 0;
    }
  }
  &.horizontal {
    flex-direction: row;
    & > .toggles {
      flex-direction: column;
      padding: 0 6px;
    }
  }

  & > .first-panel,
  & > .last-panel {
    flex: 1;
  }

  & > .toggles {
    display: flex;
    justify-content: center;
    align-items: center;
    & > i {
      cursor: pointer;
    }
  }

  &.first {
    & > .last-panel,
    & > .toggles > .last {
      display: none;
    }
  }

  &.last {
    & > .first-panel,
    & > .toggles > .first {
      display: none;
    }
  }
`;

class DualPanel extends React.Component<DualPanelProps, DualPanelState> {
  static defaultProps = {
    initialPanel: 'first',
    direction: 'vertical',
  };
  static getDerivedStateFromProps(nextProps: DualPanelProps) {
    return {
      show: nextProps.initialPanel,
    };
  }

  state = {
    show: this.props.initialPanel || 'first',
  };

  get firstIcon(): string {
    return this.state.show !== 'both'
      ? 'genderless'
      : this.props.direction === 'vertical'
        ? 'angle-up'
        : 'angle-left';
  }

  get lastIcon(): string {
    return this.state.show !== 'both'
      ? 'genderless'
      : this.props.direction === 'vertical'
        ? 'angle-down'
        : 'angle-right';
  }

  getOppositeIndex = (index: DualPanelIndex) =>
    ({
      last: 'first',
      first: 'last',
      both: 'both',
    }[index]);

  makeToggle = (index: DualPanelIndex) => () => {
    const { show } = this.state;
    if (show === index) {
      this.setState({
        show: 'both',
      });
    } else if (show === 'both') {
      this.setState({
        show: this.getOppositeIndex(index),
      });
    }
  };

  render() {
    const { children, direction, className } = this.props;
    const { show } = this.state;
    const [first, last] = React.Children.toArray(children);
    return (
      <div className={cx([cssDualPanel, show, direction, className])}>
        <div className="first-panel">{first}</div>
        <div className="toggles">
          <Icon
            type="solid"
            name={this.firstIcon}
            className="first"
            onClick={this.makeToggle('first')}
          />
          <Icon
            type="solid"
            name={this.lastIcon}
            className="last"
            onClick={this.makeToggle('last')}
          />
        </div>
        <div className="last-panel">{last}</div>
      </div>
    );
  }
}

export default DualPanel;
