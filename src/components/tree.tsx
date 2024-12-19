import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { TreeNode } from "primereact/treenode";
import { Dispatch, SetStateAction } from "react";
import { Tree } from "primereact/tree";

export default function CTree({
  data,
  selectedKey,
  setSelectedKey,
  selectedItem,
}: {
  data: TreeNode[];
  selectedKey: string | null;
  setSelectedKey: Dispatch<SetStateAction<string | null>>;
  selectedItem: Dispatch<SetStateAction<TreeNode | undefined>>;
}) {
  return (
    <Tree
      className="w-full md:w-30rem"
      value={data}
      selectionMode="single"
      filter
      filterMode="lenient"
      filterPlaceholder="Lenient Filter"
      selectionKeys={selectedKey}
      onSelectionChange={(e) => setSelectedKey(e.value as string)}
      onSelect={(e) => selectedItem(e.node)}
    />
  );
}
