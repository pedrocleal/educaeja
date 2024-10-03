import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex gap-8 items-center ">
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="logo" className="w-12" />
          <h1 className="text-lg font-bold text-blue-500">EducaEJA</h1>
        </div>
        <ul className="flex gap-4">
          <li className="text-gray-600 font-medium cursor-pointer hover:underline">Catálogo</li>
          <li className="text-gray-600 font-medium cursor-pointer hover:underline">Como usar</li>
        </ul>
      </div>

      <Avatar>
        <AvatarImage src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </div>
  );
}
