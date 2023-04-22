import {useState, useEffect} from 'react';

import {useIsUnmountedRef} from '../hooks';
import {useTreePicker} from './TreePickerContext';
import './TreePickerTree.css';
import {TreePickerNodeNode} from './TreePickerNode';

export interface TreePickerTreeProps {
  placeholder: React.ReactNode;
  resolveNodes: () => Promise<TreePickerNodeNode[]>;
}

export const TreePickerTree = ({
  placeholder,
  resolveNodes,
}: TreePickerTreeProps) => {
  const {state, goTo, renderNode} = useTreePicker();
  const [isLoading, setIsLoading] = useState(false);
  const isUnmountedRef = useIsUnmountedRef();

  useEffect(() => {
    const resolve = async () => {
      setIsLoading(true);
      try {
        const nodes = await resolveNodes();

        // ignore falsy nodes
        // or if the tree itself is unmounted
        if (!nodes || isUnmountedRef.current) return;

        goTo(nodes);
      } catch (error) {
        console.error('tree', error);
      } finally {
        setIsLoading(false);
      }
    };

    resolve();

    // can ignore this as the resolveNodes will only be needed for initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ndl-tree-picker-tree">
      {isLoading ? placeholder : state.nodes.map(renderNode)}
    </div>
  );
};
