"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import UserProfile from "./usero-profile";

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

        <UserProfile />
      </div>
    </header>
  );
}
