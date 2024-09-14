// app/vishva/page.tsx

import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import CustomSearchInput from "./CustomSearchInput";

const VishvaSearch = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center p-16">
        <Textarea
          label="Description"
          placeholder="Enter your description"
          className="max-w-xs"
        />
      </div>
    </div>
  );
};

export default VishvaSearch;
