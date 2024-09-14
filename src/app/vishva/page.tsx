// app/vishva/page.tsx

import React from "react";
import { Textarea, Button, Tooltip } from "@nextui-org/react";

const VishvaSearch = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6">
        {/* Title */}
        <h1 className="text-center font-bebas text-8xl font-bold text-white">
          VISHVA
        </h1>

        {/* Textarea and Button Container */}
        <div className="w-1/2">
          <Textarea
            placeholder="Search through the vishva (Universe)..."
            minRows={1}
            maxRows={15}
            variant="bordered"
            description=""
            size="lg"
            className="w-full"
          />

          {/* Buttons - Left Aligned and Spaced */}
          <div className="mt-4 flex w-full gap-2">
            <Button radius="sm" color="warning" size="sm" variant="flat">
              Search
            </Button>
            <Tooltip
              showArrow={true}
              content="Ask like it's ChatGPT (Coming soon)"
              placement="bottom"
            >
              <Button radius="sm" color="danger" size="sm" variant="flat">
                Chat
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VishvaSearch;
