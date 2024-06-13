import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {useFnRef} from '../hooks';
import {cx} from '../utils';

interface SelectContextState {
  isOpen: boolean;
  openRef: React.MutableRefObject<() => void>;

  search: string;
  changeSearchRef: React.MutableRefObject<(value: string) => void>;

  highlighted: string;
  // highlightRef: React.MutableRefObject<() => void>;
  optionsRef: React.MutableRefObject<Map<string, unknown>>;
  optionsOrderRef: React.MutableRefObject<string[]>;

  selected: unknown;
  handleSelectRef: React.MutableRefObject<
    (value: string, data: unknown) => void
  >;
}

const SelectContext = createContext({} as SelectContextState);

export interface SelectProviderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  selected: unknown;
  onSelect: (value: string, data?: unknown) => void;
}

export const SelectProvider = ({
  children,
  className,
  onKeyDown,
  onBlur,

  selected,
  onSelect,
  ...rest
}: SelectProviderProps) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  // require a state to keep track of highlighted
  // because input need to maintain focus while highlight changes
  const [highlighted, setHighlighted] = useState<string>('');
  const optionsRef = useRef<Map<string, unknown>>(new Map());
  const optionsOrderRef = useRef<string[]>([]);

  const highlightNext = () => {
    const index = optionsOrderRef.current.indexOf(highlighted);
    const newIndex =
      index === optionsOrderRef.current.length - 1 ? 0 : index + 1;
    setHighlighted(optionsOrderRef.current[newIndex]);
  };

  const highlightPrev = () => {
    const index = optionsOrderRef.current.indexOf(highlighted);
    const newIndex =
      index === 0 ? optionsOrderRef.current.length - 1 : index - 1;
    setHighlighted(optionsOrderRef.current[newIndex]);
  };

  // const highlight = (value: string) => {
  //   if (!isOpen) return;
  //   return setHighlighted(value);
  // };

  // const setHighlighted = useFnRef(highlight);

  const handelSelect = (value: string, data: unknown) => {
    onSelect(value, data);
    setIsOpen(false);
  };

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };
  const changesSearch = async (newSearch: string) => {
    setSearch(newSearch);
  };

  const openRef = useFnRef(open);
  const changeSearchRef = useFnRef(changesSearch);
  const handleSelectRef = useFnRef(handelSelect);

  const ctxValue = useMemo(() => {
    return {
      isOpen,
      openRef,

      search,
      changeSearchRef,

      optionsRef,
      optionsOrderRef,

      highlighted,
      setHighlighted,

      selected,
      handleSelectRef,
    } as SelectContextState;
  }, [
    isOpen,
    openRef,
    search,
    changeSearchRef,
    highlighted,
    selected,
    handleSelectRef,
  ]);

  useLayoutEffect(() => {
    let map = optionsRef.current;
    let order = optionsOrderRef.current;
    return () => {
      map.clear();
      order.length = 0;
      setHighlighted('');
    };
  }, [isOpen, search]);

  useEffect(() => {
    if (!isOpen) return;

    if (highlighted) return;
    const firstValue = optionsOrderRef.current[0];
    return setHighlighted(firstValue);
  }, [isOpen, search, highlighted]);

  console.log('[SelectContext.Provider]');

  return (
    <SelectContext.Provider value={ctxValue}>
      <div
        {...rest}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          switch (event.key) {
            case 'ArrowUp': {
              event.preventDefault();
              highlightPrev();
              break;
            }
            case 'ArrowDown': {
              event.preventDefault();
              if (isOpen) {
                highlightNext();
              } else {
                setIsOpen(true);
              }
              break;
            }

            case 'Enter': {
              event.preventDefault();
              if (!optionsRef.current.has(highlighted)) {
                console.error('expecting optionsRef to contain', highlighted);
                return;
              }
              handelSelect(highlighted, optionsRef.current.get(highlighted));
              break;
            }
            case 'Escape':
              event.preventDefault();
              if (isOpen) {
                close();
              } else {
                onSelect('');
              }
              break;

            default:
              break;
          }
        }}
        onBlur={(event) => {
          onBlur?.(event);
          close();
        }}
        className={cx('ndl-select', className)}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export const useSelectContext = () => {
  return useContext(SelectContext);
};
