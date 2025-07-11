"use client";

import * as React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface Project {
  name: string;
  description: string;
  link: string;
}

interface WorkDropDownMenuProps {
  projects: Project[];
}

export default function WorkDropDownMenu({ projects }: WorkDropDownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group inline-flex items-center text-2xl text-white outline-none transition-colors hover:text-white/80">
          Work
          <ChevronDown
            className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[300px] bg-black/90 text-white backdrop-blur-lg"
        align="start"
      >
        {projects.map((project, index) => (
          <React.Fragment key={project.name}>
            {index > 0 && <DropdownMenuSeparator className="bg-white/20" />}
            <DropdownMenuItem className="focus:bg-white/10" asChild>
              <Link
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                rel={
                  project.link.startsWith("http") ? "noopener noreferrer" : ""
                }
                className="flex flex-col space-y-1 p-3"
              >
                <span className="font-medium">{project.name}</span>
                <span className="text-sm text-gray-300">
                  {project.description}
                </span>
              </Link>
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
