"use client"
import Image from "next/image";
import React from "react";
import { Menu } from "./Constant";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RefreshCcw } from "lucide-react"
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



{/* <RegisterLink>Sign up</RegisterLink> */}
const Header = () => {
  const {
    // permissions,
    isLoading,
    user,
    // accessToken,
    // organization,
    // userOrganizations,
    // getPermission,
    // getBooleanFlag,
    // getIntegerFlag,
    // getFlag,
    // getStringFlag,
    // getClaim,
    // getAccessToken,
    // getToken,
    // getIdToken,
    // getOrganization,
    // getPermissions,
    // getUserOrganizations
} = useKindeBrowserClient();
  return (
    <div className="shadow-sm ">
    <div className="flex items-center justify-between p-4 max-w-[1216px] m-auto">
      <div className="flex items-center gap-10">
        <Image src={"/logo.svg"} alt="logo" width={180} height={80} />
        <ul className="md:flex gap-10 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path}>
              <li
                className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out"
                key={item.title + index}
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {isLoading ?
      <Button disabled>
        <RefreshCcw className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        Please wait
      </Button>
     :user ? <Popover>
        <PopoverTrigger>
          <Image src={user?.picture} alt='profile' width={50} height={50} className="rounded-full border-s-orange-300" />
        </PopoverTrigger>
        <PopoverContent className='w-[150px] '>
          <ul className="flex flex-col">
                <li className='w-full text-left hover:bg-orange-50 p-2 rounded-md cursor-pointer'>profile</li>
                <Link href={'/myBooking'}><li className='w-full text-left hover:bg-orange-50 p-2 rounded-md cursor-pointer'>My booking</li></Link>
              <LogoutLink>
                <li className='w-full text-left hover:bg-orange-50 p-2 rounded-md cursor-pointer'>Log out</li>
              </LogoutLink>
          </ul>
        </PopoverContent>
      </Popover>
      :<LoginLink>
      <Button>Get started</Button>
      </LoginLink>
      }  
    </div>
    </div>
  );
};

export default Header;
