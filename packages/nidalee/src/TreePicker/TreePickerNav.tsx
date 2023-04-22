import {useTreePicker} from './TreePickerContext';

export interface TreePickerNavProps {
  rootLabel?: string;
}

export const TreePickerNav = ({rootLabel = 'All'}: TreePickerNavProps) => {
  const {state, backTo} = useTreePicker();

  const rootNode = {id: '__all__', label: rootLabel};

  return (
    <div>
      <pre>{JSON.stringify(state.paths)}</pre>
      {/* <Breadcrumb
        className="test"
        rootNode={rootNode}
        nodes={state.paths}
        onClick={(pathId) => {
          if (pathId === rootNode.id) return backTo();
          backTo(pathId);
        }}
      /> */}
    </div>
  );
};
