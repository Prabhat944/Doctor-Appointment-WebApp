import Image from "next/image";
import React from "react";
import { Menu } from "./Constant";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
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
      <Button>Get started</Button>
    </div>
    </div>
  );
};

export default Header;
