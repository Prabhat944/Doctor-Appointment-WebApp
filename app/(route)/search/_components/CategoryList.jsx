"use client";
import React, { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import GlobalApi from "@/app/_utils/GlobalApi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const params = usePathname()?.split('/')[2];

  const fetchCategory = () => {
    GlobalApi.getCategory()
      .then((response) => {
        setCategoryList(response.data.data || []);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="h-screen mt-5">
      <Command >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index + item?.attributes?.name}>
                  <Link
                    href={"/search/" + item?.attributes?.name}
                    className={`p-2 w-full  flex text-[14px] rounded-md  items-center gap-2 ${params === item?.attributes?.name && 'bg-orange-100'}`}
                  >
                    <Image
                      src={item?.attributes?.icon?.data?.attributes?.url}
                      alt="icons"
                      width={25}
                      height={25}
                    />
                    <label className="text-primary cursor-pointer">
                      {item?.attributes?.name}
                    </label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem >Profile</CommandItem>
            <CommandItem >Billing</CommandItem>
            <CommandItem >Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
