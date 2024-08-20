"use client";
import search from '@/assets/icons/innerSearch.svg'

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (query) {
//         const newUrl = formUrlQuery({
//           searchParams: searchParams.toString(),
//           key: "query",
//           value: query,
//         });

//         router.push(newUrl, { scroll: false });
//       } else {
//         const newUrl = removeKeysFromQuery({
//           searchParams: searchParams.toString(),
//           keysToRemove: ["query"],
//         });

//         router.push(newUrl, { scroll: false });
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [router, searchParams, query]);

  return (
    <div className="relative">
        <input
            type="text"
            placeholder="Hello User !"
            className="pl-8 pr-4 py-2 rounded-full bg-slate-900 focus:outline-none w-full text-gray-300"
        />
        <svg
            className="absolute left-2 top-3 h-4 w-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.41-1.41l4.58 4.58a1 1 0 01-1.41 1.41l-4.58-4.58zm-2.9 0a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
            />
        </svg>
    </div>
    // <div className="search">
    //     <div className='flex'>
    //         <Input
    //             className="search-field"
    //             placeholder="Search"
    //             onChange={(e) => setQuery(e.target.value)}
    //         />

    //         <Image
    //             src={search}
    //             alt="search"
    //             width={24}
    //             height={24}
    //         />
    //     </div>
    // </div>
  );
};