import {createContext, useCallback, useContext, useMemo, useState} from 'react';

import {IconButton, IconButtonProps} from '../IconButton';
import {cx} from '../utils';
import {useIsUnmountedRef} from '../hooks';

import {useTreePicker} from './TreePickerContext';
import './TreePickerNode.css';

type TreePickerNodeContextValue = {
  node: TreePickerNodeNode;
  expand: (nodes: TreePickerNodeNode[]) => void;
  expanded: boolean;
  replace: (nodes: TreePickerNodeNode[]) => void;
  level: number;
};

const TreePickerNodeContext = createContext({
  level: 0,
} as TreePickerNodeContextValue);

export const useTreePickerNode = () => useContext(TreePickerNodeContext);

export type TreePickerNodeNode = {
  id: string;
  label: string;
  [key: string]: unknown;
};

export interface TreePickerNodeProps {
  children: React.ReactNode;
  node: TreePickerNodeNode;
}

export const TreePickerNode = ({children, node}: TreePickerNodeProps) => {
  const {goTo} = useTreePicker();
  const {level} = useTreePickerNode();
  const [subNodes, setSubNodes] = useState<TreePickerNodeNode[]>([]);
  const [expanded, setExpanded] = useState(false);

  const expand = useCallback(
    (nodes: TreePickerNodeNode[]) => {
      if (!expanded) {
        setSubNodes(nodes);
        setExpanded(true);
      } else {
        setSubNodes([]);
        setExpanded(false);
      }
    },
    [setExpanded, expanded, setSubNodes]
  );

  const replace = useCallback(
    (nodes: TreePickerNodeNode[]) => {
      goTo(nodes, node);
    },
    [goTo, node]
  );

  const value = useMemo(
    () => ({
      node,
      expand,
      expanded,
      replace,
      level: level + 1,
    }),
    [expand, expanded, replace, node, level]
  );

  return (
    <div className="tree-picker-node">
      <TreePickerNodeContext.Provider value={value}>
        <div className="tree-picker-node-item">{children}</div>
        {subNodes.length === 0 ? null : (
          <TreePickerNodeBranch nodes={subNodes} />
        )}
      </TreePickerNodeContext.Provider>
    </div>
  );
};

export interface TreePickerNodeBranchProps {
  nodes: TreePickerNodeNode[];
}

export const TreePickerNodeBranch = ({nodes}: TreePickerNodeBranchProps) => {
  const {renderNode} = useTreePicker();
  const {level} = useTreePickerNode();

  return (
    <div className="tree-picker-node-branch" style={{paddingLeft: level * 24}}>
      {nodes.map(renderNode)}
    </div>
  );
};

export interface TreePickerNodeContentProps {
  children: React.ReactNode;
  className: string;
}

const TreePickerNodeContent = ({
  children,
  className,
  ...rest
}: TreePickerNodeContentProps) => {
  return (
    <div {...rest} className={cx('tree-picker-node-content', className)}>
      {children}
    </div>
  );
};

export interface TreePickerNodeExpandProps
  extends Omit<IconButtonProps, 'type'> {
  type: 'replace' | 'expand';
  resolveNodes: () => Promise<TreePickerNodeNode[]>;
  className: string;
}

export const TreePickerNodeExpand = ({
  type,
  resolveNodes,
  className,
  onClick,
  ...rest
}: TreePickerNodeExpandProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {state, expandIdRef} = useTreePicker();
  const {node, expand, replace, expanded} = useTreePickerNode();
  const isUnmountedRef = useIsUnmountedRef();

  const expandIcon = expanded ? 'minimize-2' : 'maximize-2';

  return (
    <IconButton
      {...rest}
      label="Expand"
      name={isLoading ? 'loader' : expandIcon}
      onClick={async (event) => {
        if (!resolveNodes) return onClick?.(event);

        expandIdRef.current = node.id;
        const typeFunc = type === 'expand' ? expand : replace;
        const resultFunc = typeFunc || (state.search ? expand : replace);

        setIsLoading(true);
        try {
          const nodes = await resolveNodes();
          // ignore falsy nodes
          // or when user click 2 different expands, ignore the first click
          // or if node is unmounted
          if (
            !nodes ||
            expandIdRef.current !== node.id ||
            isUnmountedRef.current
          )
            return onClick?.(event);

          resultFunc(nodes);

          return onClick?.(event);
        } catch (error) {
          console.error('expand', error);
        } finally {
          setIsLoading(false);
        }
      }}
      className={cx('tree-picker-node-expand', className)}
    />
  );
};

export interface TreePickerNodeAddProps {
  className: string;
}

const TreePickerNodeAdd = ({className, ...rest}: TreePickerNodeAddProps) => {
  return (
    <IconButton
      name="plus"
      label="Add"
      {...rest}
      className={cx('tree-picker-node-add', className)}
    />
  );
};

TreePickerNode.Content = TreePickerNodeContent;
TreePickerNode.Expand = TreePickerNodeExpand;
TreePickerNode.Add = TreePickerNodeAdd;
