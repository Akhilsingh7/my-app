"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 border-b">
      {/* LEFT — LOGO */}
      <Link href="/" className="text-xl font-semibold">
        MyLogo
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* When LOGGED OUT */}
        <SignedOut>
          <div className="flex items-center gap-2">
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button size="sm">Sign Up</Button>
            </SignUpButton>
          </div>
        </SignedOut>

        {/* When LOGGED IN */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
