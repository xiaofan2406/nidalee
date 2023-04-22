import {
  TreePickerContextProvider,
  TreePickerContextValue,
} from './TreePickerContext';
import {TreePickerTree} from './TreePickerTree';
import {TreePickerNode} from './TreePickerNode';
import {TreePickerNav} from './TreePickerNav';
import {TreePickerSearch} from './TreePickerSearch';

import './TreePicker.css';

export interface TreePickerProps {
  children: React.ReactNode;
  renderNode: TreePickerContextValue['renderNode'];
}

export const TreePicker = ({children, renderNode}: TreePickerProps) => {
  return (
    <TreePickerContextProvider renderNode={renderNode}>
      <div className="ndl-tree-picker">{children}</div>
    </TreePickerContextProvider>
  );
};

TreePicker.Tree = TreePickerTree;
TreePicker.Node = TreePickerNode;
TreePicker.Nav = TreePickerNav;
TreePicker.Search = TreePickerSearch;
