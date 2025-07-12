"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function Navbar() {
  const router = useRouter();

  const works = [
    { name: "Euso AI", href: "#" },
    { name: "Bouje", href: "#" },
    { name: "Vishva", href: "/vishva" },
    { name: "Sheet Weaver", href: "#" },
    { name: "Grok Code CLI", href: "#" },
  ];

  const fun = [
    { name: "Knowledge Graph", href: "/knowledge-graph" },
    { name: "Iron Man Weapons System", href: "/iron-man-weapons-system" },
    { name: "Physics Animated", href: "/physics-animated" },
    { name: "Art I've Made", href: "/art-ive-made" },
  ];

  return (
    <div className="relative top-0 z-20 w-full px-8 py-6">
      <nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-8 py-4 shadow-lg backdrop-blur-lg">
        <h1 className="font-bebas text-2xl font-bold text-white">
          Apekshik Panigrahi
        </h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-lg border-2 border-black bg-white px-6 font-bebas text-xl text-black hover:bg-gray-100"
              >
                Past Work
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-lg border-2 border-black bg-white"
            >
              {works.map((work) => (
                <DropdownMenuItem
                  key={work.name}
                  className="cursor-pointer font-bebas text-lg text-black hover:bg-gray-100"
                >
                  <Link href={work.href} className="w-full">
                    {work.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-lg border-2 border-black bg-white px-6 font-bebas text-xl text-black hover:bg-gray-100"
              >
                Fun Projects
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-lg border-2 border-black bg-white"
            >
              {fun.map((fun) => (
                <DropdownMenuItem
                  key={fun.name}
                  className="cursor-pointer font-bebas text-lg text-black hover:bg-gray-100"
                >
                  <Link href={fun.href} className="w-full">
                    {fun.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="rounded-full border-2 border-black bg-white px-6 font-bebas text-xl text-black hover:bg-gray-100"
            onClick={() => router.push("/blog")}
          >
            Blog
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-2 border-black bg-white px-6 font-bebas text-xl text-black hover:bg-gray-100"
          >
            About
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-2 border-black bg-white px-6 font-bebas text-xl text-black hover:bg-gray-100"
          >
            Contact
          </Button>

          <Button
            variant="outline"
            className="rounded-full border-2 border-black bg-white px-6 font-bebas text-xl text-black hover:bg-gray-100"
          >
            Resume
          </Button>
        </div>
      </nav>
    </div>
  );
}
