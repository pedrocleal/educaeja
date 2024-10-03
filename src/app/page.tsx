"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import { apps } from "@/app/database/apps.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookText, DownloadCloud, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterPopover } from "@/components/filter-popover";
import { useState } from "react";

export default function Home() {
  const [languagesFiltered, setLanguagesFiltered] = useState<string[]>([]);
  const [platformsFiltered, setPlatformsFiltered] = useState<string[]>([]);
  const [categoriesFiltered, setCategoriesFiltered] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const filteredApps = apps.filter((app) => {
    return (
      (languagesFiltered.length === 0 || languagesFiltered.some((lang) => app.language.includes(lang))) &&
      (platformsFiltered.length === 0 ||
        platformsFiltered.some((platform) => app.platform.includes(platform))) &&
      (categoriesFiltered.length === 0 || categoriesFiltered.some((category) => app.category === category)) &&
      (search === "" || app.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const languages = apps.reduce<string[]>((acc, app) => {
    return Array.from(new Set([...acc, ...app.language]));
  }, []);

  const platforms = apps.reduce<string[]>((acc, app) => {
    return Array.from(new Set([...acc, ...app.platform]));
  }, []);

  const categories = apps.reduce<string[]>((acc, app) => {
    return Array.from(new Set([...acc, app.category]));
  }, []);

  console.log({ languages, platforms, categories });

  return (
    <div className="h-screen flex flex-col m-auto max-w-screen-lg p-12">
      <div className="p-4 flex gap-8 items-center">
        <Image src={logo} alt="logo" className="w-32" />
        <ul className="flex gap-4">
          <li className="text-blue-500 font-medium cursor-pointer hover:underline">Catálogo</li>
          <li className="text-gray-600 font-normal cursor-pointer hover:underline">Como usar</li>
        </ul>
      </div>

      <div className="flex flex-col mt-12">
        <h1 className="text-3xl font-bold text-blue-500">Catálogo</h1>

        <div className="mt-4 flex items-center gap-2">
          <h4 className="text-sm font-inter text-zinc-800">Filtros:</h4>
          <div className="relative w-max">
            <Search className="absolute top-2 left-2 text-zinc-400" size={16} />
            <Input
              className="pl-8"
              placeholder="Pesquise um aplicativo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <FilterPopover
            title="Idioma"
            handleSelectOption={(value) => {
              setLanguagesFiltered((prev) =>
                prev.includes(value) ? prev.filter((lang) => lang !== value) : [...prev, value]
              );
            }}
            optionsFiltered={languagesFiltered}
            optionsList={languages.map((lang) => ({ value: lang, label: lang }))}
          />

          <FilterPopover
            title="Plataforma"
            handleSelectOption={(value) => {
              setPlatformsFiltered((prev) =>
                prev.includes(value) ? prev.filter((platform) => platform !== value) : [...prev, value]
              );
            }}
            optionsFiltered={platformsFiltered}
            optionsList={platforms.map((platform) => ({ value: platform, label: platform }))}
          />

          <FilterPopover
            title="Categoria"
            handleSelectOption={(value) => {
              setCategoriesFiltered((prev) =>
                prev.includes(value) ? prev.filter((category) => category !== value) : [...prev, value]
              );
            }}
            optionsFiltered={categoriesFiltered}
            optionsList={categories.map((category) => ({ value: category, label: category }))}
          />
        </div>
      </div>

      <div className="flex flex-col items-start w-full gap-4 my-8 overflow-auto">
        {filteredApps.length === 0 && (
          <div>
            <span>lista vazia..</span>
          </div>
        )}

        {filteredApps.length > 0 &&
          filteredApps?.map((app) => (
            <div key={app.id} className="flex gap-12 w-full border rounded-md border-zinc-300">
              <Image src={logo} alt="App logo" className="object-cover" width={200} height={200} />
              <div className="mt-4 gap-8 w-full flex items-start justify-between pr-4 pb-4">
                <div>
                  <h2 className="font-bold text-blue-500">{app.name}</h2>

                  <div className="flex items-center gap-1 my-1">
                    <Badge variant={"outline"}>
                      <span>{app.category}</span>
                    </Badge>
                    <span className="text-gray-400">|</span>
                    {app.language.map((lang) => (
                      <Badge variant={"outline"} key={lang}>
                        <span>{lang}</span>
                      </Badge>
                    ))}
                    <span className="text-gray-400">|</span>
                    {app.platform.map((platform) => (
                      <Badge variant={"outline"} key={platform}>
                        <span>{platform}</span>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-zinc-400 mt-4">{app.description}</p>
                </div>

                <div className="flex flex-col gap-1">
                  <Button variant={"ghost"} size={"icon"}>
                    <DownloadCloud className="text-blue-500" size={20} />
                  </Button>

                  <Button variant={"ghost"} size={"icon"}>
                    <BookText className="text-blue-500" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
