import {IconButton} from '../IconButton';
import {cbx, cx} from '../utils';
import './Tag.css';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  onActivate?: () => void;
  onRemove?: () => void;
}

export const Tag = (props: TagProps) => {
  const {
    children,
    className,
    onClick,
    onKeyDown,
    onActivate,
    onRemove,
    ...rest
  } = props;

  const interactive = onActivate || onRemove;

  return (
    <div
      {...rest}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : -1}
      className={cx('ndl-tag', interactive && 'interactive', className)}
      onClick={cbx(onClick, onActivate && (() => onActivate()))}
      onKeyDown={cbx(onKeyDown, (event) => {
        switch (event.key) {
          case ' ':
          case 'Enter': {
            onActivate?.();
            return;
          }
          case 'Backspace':
          case 'Delete': {
            onRemove?.();
            return;
          }
        }
      })}
    >
      {children}
      {onRemove ? (
        <IconButton
          className="ndl-tag-remove"
          label="Remove"
          name="x"
          size={18}
          tabIndex={-1}
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        />
      ) : null}
    </div>
  );
};
