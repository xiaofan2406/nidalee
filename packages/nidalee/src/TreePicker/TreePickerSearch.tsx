import {useState, useRef} from 'react';

import {useIsUnmountedRef} from '../hooks';
import {Input} from '../Input';

import {useTreePicker} from './TreePickerContext';
import {InputField} from '../InputField';
import {Loader, Search} from 'react-feather';
import {TreePickerNodeNode} from './TreePickerNode';

export interface TreePickerSearchProps {
  resolveNodes: (
    searchText: string,
    activeNode: TreePickerNodeNode
  ) => Promise<TreePickerNodeNode[]>;
}

export const TreePickerSearch = ({
  resolveNodes,
  ...rest
}: TreePickerSearchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {searchTo, state} = useTreePicker();
  const textRef = useRef('');

  const isUnmountedRef = useIsUnmountedRef();

  return (
    <InputField
      {...rest}
      start={isLoading ? <Loader /> : null}
      end={<Search />}
      input={
        <Input
          onChange={async (event) => {
            const searchText = event.currentTarget.value;
            if (!searchText) return searchTo();

            textRef.current = searchText;
            setIsLoading(true);
            try {
              const nodes = await resolveNodes(
                searchText,
                state.paths[state.paths.length - 1] || {}
              );

              // ignore falsy nodes
              // or if search itself is unmounted
              // or when user types in quick succession
              // ignore the old search results
              if (
                !nodes ||
                textRef.current !== searchText ||
                isUnmountedRef.current
              )
                return;

              searchTo(nodes, searchText);
            } catch (error) {
              console.error('search', error);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      }
    />
  );
};
