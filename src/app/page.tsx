"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TreeNode } from "primereact/treenode";
import CTree from "@/components/tree";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [selectedKey, setSelectedKey] = useState<string | null>("");
  const [selectedMenu, setSelectedMenu] = useState<TreeNode | undefined>();
  const [menuName, setMenuName] = useState("");
  const [data, setData] = useState<TreeNode[]>([
    {
      id: "0",
      label: "Systems",
      children: [
        {
          label: "Menu",
          selectable: true,
        },
      ],
    },
  ]);

  const handleFetchData = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/menu");
    const data = await response.json();
    setData(data);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent_id: selectedMenu?.id,
        name: menuName,
        description: "-",
      }),
    });
    await response.json();

    void handleFetchData();
  };

  const handleClearForm = () => {
    setSelectedKey(null);
    setSelectedMenu(undefined);
    setMenuName("");
  };

  useEffect(() => {
    void handleFetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      <CTree
        data={data}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        selectedItem={setSelectedMenu}
      />
      <form onSubmit={handleSubmitForm} className="p-4 flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="menu_id">Menu ID</Label>
          <Input
            type="text"
            id="menu_id"
            placeholder="Menu ID"
            value={selectedMenu?.id || ""}
            disabled
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="parent_label">Parent Data</Label>
          <Input
            type="text"
            id="parent_label"
            placeholder="Parent Label"
            value={selectedMenu?.label || ""}
            disabled
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button type="button" variant="outline" onClick={handleClearForm}>
            Clear
          </Button>
          <Button type="submit">Create Menu</Button>
        </div>
      </form>
    </div>
  );
}
