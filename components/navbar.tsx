"use client";
import {
  CirclePlusIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Dialog, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import ThemeToggle from "./theme-toogle";
import useUser from "@/hooks/useUser";
import pb from "@/lib/pb";
import { redirect, usePathname, useRouter } from "next/navigation";

type NavbarLink = {
  id: number;
  name: string;
  route: string;
  icon?: React.ReactNode;
};
export default function Navbar() {
  const navLinks: NavbarLink[] = [
    {
      id: 1,
      name: "Explore",
      route: "/explore",
    },
  ];
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center min-w-full w-full fixed justify-center p-2 z-[50] mt-[2rem] ">
        <div className="flex justify-between flex-row-reverse md:flex-row max-w-3xl md:max-w-4xl mx-8 md:mx-12 w-full border  bg-opacity-50 dark:bg-opacity-20 relative backdrop-filter backdrop-blur-lg bg-white border-white border-opacity-20 rounded-xl p-2 shadow-lg min-h-16  ">
          <Dialog>
            <SheetTrigger className="md:hidden p-2 transition">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>fabrika.</SheetTitle>
                <SheetDescription>
                  Scale and launch products with expert developers, on-demand,
                  at a flat monthly fee
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-3 mt-[1rem] z-[99]">
                {navLinks.map((link) => (
                  <DialogClose asChild key={link.id}>
                    <Link href={link.route}>
                      <Button variant="outline" className="w-full">
                        {link.name}
                      </Button>
                    </Link>
                  </DialogClose>
                ))}

                <ThemeToggle />
              </div>
            </SheetContent>
          </Dialog>
          <NavigationMenu>
            <NavigationMenuList className=" ">
              <Link href="/" className="pl-2">
                <h1 className="font-bold">Pinterest</h1>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden md:flex items-center gap-2">
              <Link href={`/explore`} >
                <Button variant="ghost" className="flex items-center gap-2">
                  Explore
                </Button>
              </Link>
            {user ? (
              <>
              <Link href={`/profile/${user?.id}`} >
                <Button variant="ghost" className="flex items-center gap-2">
                  Profile
                </Button>
              </Link>
                <Button
                  onClick={() => {
                    pb.authStore.clear()
                    router.push('/sign-in')
                  }}
                  variant="ghost"
                  className="flex items-center gap-2 hover:bg-red-300"
                >
                  <LogOutIcon className="size-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <Link href={"/sign-in"}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User2Icon className="size-4" />
                  Sign In
                </Button>
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
      {pathname === "/new" || pathname === "/"  ? null : (
        <button
          onClick={() => router.push("/new")}
          className="fixed bottom-12 right-12 flex items-center p-4 bg-red-600 z-50 text-white rounded-full aspect-square"
        >
          <PlusIcon className="size-8" />
        </button>
      )}
    </>
  );
}
