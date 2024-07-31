import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";

export default function WorkDropDownMenu() {

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Work
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          key="new"
          description="Create a new file"
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="Copy the file link"
        >
          Copy link
        </DropdownItem>
        <DropdownItem
          key="edit"
          showDivider
          description="Allows you to edit the file"
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the file"
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
