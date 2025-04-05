"use client";

import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";

export function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title") || "";

  useEffect(() => {
    setInputValue(currentTitle);
  }, [currentTitle]);

  const updateUrl = useCallback(
    debounce((newValue: string) => {
      const url = qs.stringifyUrl(
        {
          url: pathname,
          query: {
            categoryId: currentCategoryId,
            title: newValue,
          },
        },
        { skipNull: true, skipEmptyString: true }
      );
      router.push(url);
    }, 500),
    [pathname, currentCategoryId, router]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    updateUrl(newValue);
  };

  return (
    <div className="relative">
      <Search className="size-4 absolute top-2.5 left-3 text-slate-400" />
      <Input
        value={inputValue}
        onChange={handleChange}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search blogs by title..."
      />
    </div>
  );
}
