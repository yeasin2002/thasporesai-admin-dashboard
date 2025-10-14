"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 z-30 h-16 border-b">
      <div className="flex h-full items-center justify-between px-4 lg:justify-end lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground lg:hidden"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-foreground text-sm font-medium">Liam Anderson</p>
            <p className="text-muted-foreground hidden text-xs sm:block">@liamand</p>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/yeasin2002.png" alt="Liam Anderson" />
            <AvatarFallback>LA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
