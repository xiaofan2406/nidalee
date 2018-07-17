/* @flow */
import * as React from 'react';
import { css, cx } from 'react-emotion';
import { defaultFont } from './styles';
import { ENTER, ESC, warning, isBoolean } from './helpers';

const cssInlineEdit = css`
  ${defaultFont};
  position: relative;
  overflow: hidden;
  outline: none;

  &.isEditing {
    display: inline-flex;
    & > .value {
      opacity: 0;
    }
  }
  & > .value {
    &:empty::before {
      user-select: none;
      content: '*empty*';
      font-style: italic;
    }
  }

  & > input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: inline-flex;
  }
`;

const cssInlineEditInput = css`
  ${defaultFont};
  border: 0;
  background-color: transparent;
  outline: none;
`;

class InlineEdit extends React.Component<InlineEditProps, InlineEditState> {
  inputRef = React.createRef();

  static defaultProps = {
    autoTrim: false,
    blurAction: 'save',
    escAction: 'cancel',
    inputProps: {},
  };

  state = {
    isEditing: isBoolean(this.props.editing) ? this.props.editing : false,
  };

  componentDidMount() {
    this.validateProps();
  }

  componentDidUpdate() {
    this.validateProps();
    this.focusInput();
  }

  get isControlled(): boolean {
    return isBoolean(this.props.editing);
  }

  get input(): HTMLInputElement {
    return ((this.inputRef.current: any): HTMLInputElement);
  }

  get valueToSave(): string {
    return this.props.autoTrim ? this.input.value.trim() : this.input.value;
  }

  static getDerivedStateFromProps(nextProps: InlineEditProps) {
    return isBoolean(nextProps.editing)
      ? { isEditing: nextProps.editing }
      : null;
  }

  validateProps = () => {
    const { blurAction, escAction, toggleEditing, editing } = this.props;

    warning(
      'InlineEdit',
      escAction === 'cancel' && blurAction === 'cancel',
      'At least one of [`escAction`, `blurAction`] should be `save`.'
    );

    warning(
      'InlineEdit',
      isBoolean(editing) && !toggleEditing,
      '`toggleEditing` is recommended when editing state is controlled'
    );
  };

  focusInput = () => {
    if (this.state.isEditing) {
      this.input.setSelectionRange(0, 0);
      this.input.focus();
    }
  };

  toggleIsEditing = (isEditing: boolean) => {
    const { toggleEditing } = this.props;

    if (isEditing !== this.state.isEditing) {
      if (!this.isControlled) {
        this.setState({ isEditing });
      } else if (this.isControlled && toggleEditing) {
        toggleEditing(isEditing);
      }
    }
  };

  // handleSave & handleCancel should only respond while is editing
  handleSave = () => {
    const { onSave } = this.props;

    if (this.state.isEditing) {
      this.toggleIsEditing(false);
      onSave(this.valueToSave);
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;

    if (this.state.isEditing) {
      this.toggleIsEditing(false);
      if (onCancel) onCancel();
    }
  };

  handleSpanDoubleClick = (event: SyntheticMouseEvent<HTMLSpanElement>) => {
    const { onDoubleClick } = this.props;
    this.toggleIsEditing(true);
    if (onDoubleClick) onDoubleClick(event);
  };

  handleSpanKeyDown = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { onKeyDown } = this.props;

    event.stopPropagation();
    if (event.which === ENTER) {
      this.toggleIsEditing(true);
    }

    if (onKeyDown) onKeyDown(event);
  };

  handleInputKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { escAction } = this.props;

    if (event.which === ENTER) {
      this.handleSave();
    }

    if (event.which === ESC) {
      this.handleAction(escAction);
    }
  };

  handleInputBlur = (event: SyntheticFocusEvent<HTMLSpanElement>) => {
    const { blurAction } = this.props;

    event.stopPropagation();
    this.handleAction(blurAction);
  };

  handleAction = (action: EditableAction) =>
    action === 'save' ? this.handleSave() : this.handleCancel();

  render() {
    const {
      defaultValue,
      onSave,
      onCancel,

      editing,
      toggleEditing,

      render,
      autoTrim,
      blurAction,
      escAction,
      inputProps,

      className,
      onDoubleClick,
      onKeyDown,
      ...rest
    } = this.props;
    const { isEditing } = this.state;

    return (
      <span
        tabIndex={0}
        role="textbox"
        {...rest}
        className={cx([cssInlineEdit, { isEditing }, className])}
        onDoubleClick={this.handleSpanDoubleClick}
        onKeyDown={this.handleSpanKeyDown}
      >
        <span className="value">
          {render ? render(defaultValue) : defaultValue}
        </span>
        {isEditing ? (
          <input
            ref={this.inputRef}
            {...inputProps}
            defaultValue={defaultValue}
            className={cx([cssInlineEditInput, inputProps.className])}
            onKeyDown={this.handleInputKeyDown}
            onBlur={this.handleInputBlur}
          />
        ) : null}
      </span>
    );
  }
}

export default InlineEdit;
