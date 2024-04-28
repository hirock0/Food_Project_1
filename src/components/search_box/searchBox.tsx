"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Search_Box() {
  const searchparamas = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const SearcData = (data: any) => {
    const newParams = new URLSearchParams(searchparamas);
    if (!data) {
      newParams.delete("q");
    } else {
      newParams.set("q", data);
    }
    replace(`${pathname}?${newParams}`);
  };

  return (
    <div className=" w-full">
      <input
        onChange={(e: any) => SearcData(e.target.value)}
        placeholder="Search..."
        type="text"
        name="search"
        className=" w-full h-8 pl-2 rounded-full text-black"
      />
    </div>
  );
}
