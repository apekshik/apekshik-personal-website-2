// app/vishva/page.tsx

import React from "react";
import { Textarea, Button } from "@nextui-org/react";
import CustomSearchInput from "./CustomSearchInput";

const VishvaSearch = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center p-16">
        <Textarea
          label="Description"
          placeholder="Enter your description"
          variant="flat"
          className="max-w-2xl"
        />
      </div>
    </div>
  );
};

export default VishvaSearch;
