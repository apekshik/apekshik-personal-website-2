import React, { useState } from "react";
import {
  Textarea,
  Button,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Link,
} from "@nextui-org/react";

interface VishvaCardProps {
  websiteName: string;
  url: string;
  title: string;
  snippet: string;
  imageUrl?: string; // Optional website logo/image
}

const VishvaCard: React.FC<VishvaCardProps> = ({
  websiteName,
  url,
  title,
  snippet,
  imageUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false); // State for hover

  const dummySummary = `This is a dummy summary that appears when you hover over the card. It expands the card to show more content dynamically. This is a dummy summary that appears when you hover over the card.`;

  return (
    <Card
      className={`transition-all duration-500 ease-in-out ${
        isHovered ? "max-h-[500px]" : "max-h-[220px]"
      } overflow-hidden`} // Smooth max-height transition
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Reset hover state on leave
    >
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <div>
          {/* Title of the link */}
          <p className="text-large font-bold text-blue-600">{title}</p>

          {/* Website name */}
          <p className="text-small font-medium text-gray-500">{websiteName}</p>

          {/* Website URL */}
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-small text-blue-500"
          >
            {url}
          </Link>

          {/* Display the snippet by default */}
          <p className="text-default">{snippet}</p>
        </div>
      </CardHeader>
      <CardBody>
        {/* Show summary only on hover */}
        <p>{isHovered ? dummySummary : ""}</p>
      </CardBody>
    </Card>
  );
};
