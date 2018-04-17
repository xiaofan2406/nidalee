/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import Icon from './Icon';

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

  static getDerivedStateFromProps(
    nextProps: DualPanelProps,
    prevState: DualPanelState
  ) {
    return prevState.show !== nextProps.initialPanel
      ? { show: nextProps.initialPanel }
      : null;
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

  makeToggleHandler = (index: DualPanelIndex) => () => {
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
    const {
      children,
      direction,
      initialPanel,
      className,
      ...rest
    } = this.props;
    const { show } = this.state;
    const [first, last] = React.Children.toArray(children);
    return (
      <div {...rest} className={cx([cssDualPanel, show, direction, className])}>
        <div className="first-panel">{first}</div>
        <div className="toggles">
          <Icon
            type="solid"
            name={this.firstIcon}
            className="first"
            onClick={this.makeToggleHandler('first')}
          />
          <Icon
            type="solid"
            name={this.lastIcon}
            className="last"
            onClick={this.makeToggleHandler('last')}
          />
        </div>
        <div className="last-panel">{last}</div>
      </div>
    );
  }
}

export default DualPanel;
