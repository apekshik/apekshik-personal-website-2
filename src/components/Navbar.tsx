"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export function Navbar() {
  const projects = [
    { name: "Bouje", href: "#" },
    { name: "Euso AI", href: "#" },
    { name: "Sheet Weaver", href: "#" },
    { name: "Grok Code CLI", href: "#" },
  ]

  return (
    <nav className="relative top-0 z-20 flex w-full items-center justify-between py-8 pl-8 pr-16 text-white">
      <h1 className="font-bebas text-2xl font-bold">Apekshik Panigrahi</h1>
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="/vishva">Try Vishva</Link>
        </Button>
        
        <Button
          variant="ghost"
          className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="/blog">Blog</Link>
        </Button>
        
        <Button
          variant="ghost"
          className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
          asChild
        >
          <Link href="/knowledge-graph">Knowledge Graph</Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
            >
              Projects
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.name}
                className="font-bebas text-lg cursor-pointer"
              >
                <Link href={project.href} className="w-full">
                  {project.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="ghost"
          className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
        >
          About
        </Button>
        
        <Button
          variant="ghost"
          className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
        >
          Contact
        </Button>
        
        <Button
          variant="ghost"
          className="font-bebas text-2xl text-white hover:bg-white/10 hover:text-white"
        >
          Resume
        </Button>
      </div>
    </nav>
  )
}