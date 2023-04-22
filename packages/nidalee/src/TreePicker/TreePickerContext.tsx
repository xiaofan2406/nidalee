import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {TreePickerNodeNode} from './TreePickerNode';

type ReducerState = {
  paths: TreePickerNodeNode[];
  nodes: TreePickerNodeNode[];
  search: string;
  treeRef: TreeRef;
};

export interface TreePickerContextValue {
  state: ReducerState;
  backTo: (nodeId: string) => void;
  goTo: (nodes: TreePickerNodeNode[], node?: TreePickerNodeNode) => void;
  searchTo: (nodes?: TreePickerNodeNode[], search?: string) => void;
  expandIdRef: React.MutableRefObject<string | undefined>;
  renderNode: (node: TreePickerNodeNode, index: number) => React.ReactNode;
}

const TreePickerContext = createContext({} as TreePickerContextValue);

export const useTreePicker = () => useContext(TreePickerContext);

export const getPathKey = (paths: TreePickerNodeNode[]) =>
  paths.map((entry) => entry.id).join('_');

type TreeRef = React.MutableRefObject<Map<string, TreePickerNodeNode[]>>;

const createInitState = (treeRef: TreeRef): ReducerState => {
  treeRef.current = new Map();
  return {paths: [], nodes: [], treeRef, search: ''};
};

type ActionType =
  | {type: 'backTo'; nodeId: TreePickerNodeNode['id']}
  | {type: 'goTo'; nodes: TreePickerNodeNode[]; node?: TreePickerNodeNode}
  | {type: 'search'; nodes?: TreePickerNodeNode[]; search?: string};

const reducer = (state: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    // breadcrumb navigate back to a node
    case 'backTo': {
      const newPaths = action.nodeId
        ? state.paths.slice(
            0,
            state.paths.findIndex((entry) => entry.id === action.nodeId) + 1
          )
        : [];

      const pathKey = getPathKey(newPaths);
      const nodes = state.treeRef.current.get(pathKey);

      if (!nodes) {
        console.error('unexpected node id: ', action.nodeId);
        return state;
      }

      return {
        ...state,
        paths: newPaths,
        nodes,
      };
    }

    // expand new node & init root
    case 'goTo': {
      const newPaths = action.node
        ? [...state.paths, action.node]
        : state.paths;
      const pathKey = getPathKey(newPaths);
      state.treeRef.current.set(pathKey, action.nodes);

      return {
        ...state,
        paths: newPaths,
        nodes: action.nodes,
      };
    }

    case 'search': {
      if (action.search && action.nodes) {
        return {
          ...state,
          search: action.search,
          nodes: action.nodes,
        };
      }

      const pathKey = getPathKey(state.paths);
      const nodes = state.treeRef.current.get(pathKey);

      if (!nodes) {
        console.error('unexpected error when clearing search:');
        return state;
      }

      return {...state, search: '', nodes};
    }

    default:
      return state;
  }
};

export interface TreePickerContextProviderProps {
  children: React.ReactNode;
  renderNode: (node: TreePickerNodeNode, index: number) => React.ReactNode;
}

export const TreePickerContextProvider = ({
  children,
  renderNode,
}: TreePickerContextProviderProps) => {
  // [stringPath]: nodes keep track which paths map to which nodes
  const treeRef = useRef<Map<string, TreePickerNodeNode[]>>(new Map());
  // keep tracking the latest expanding node
  const expandIdRef = useRef<string>();
  const [state, dispatch] = useReducer(reducer, treeRef, createInitState);

  const backTo = useCallback((nodeId: string) => {
    dispatch({type: 'backTo', nodeId});
  }, []);

  const goTo = useCallback(
    (nodes: TreePickerNodeNode[], node?: TreePickerNodeNode) => {
      dispatch({type: 'goTo', nodes, node});
    },
    []
  );

  const searchTo = useCallback(
    (nodes?: TreePickerNodeNode[], search?: string) => {
      dispatch({type: 'search', nodes, search});
    },
    []
  );

  const value = useMemo(
    () => ({state, backTo, goTo, searchTo, expandIdRef, renderNode}),
    [state, backTo, goTo, searchTo, renderNode]
  );

  return (
    <TreePickerContext.Provider value={value}>
      {children}
    </TreePickerContext.Provider>
  );
};
