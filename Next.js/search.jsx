//--------------------searct.jsx--------------------//

"use client";
// have to install--------- npm i use-debounce@9.0.4
// and use as like that -------useDebouncedCallback((e)=>{},300)

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e) => {    // uses 'useDebouncedCallback' due to prevent user's abusive interavtivitis
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 400);

  return (
    <div className="flex gap-1 items-center w-60 bg-[var(--bgHover)] rounded-lg px-3 py-2">
      <MdSearch size={18} />
      <input
        type="text"
        placeholder={placeholder}
        className=""
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;


//--------------------fetcher.js--------------------//

import { connectDB } from "./connection";
import { User } from "./models";

export const fetchUsers = async (q) => {
  const regex = new RegExp(q, "i");

  try {
    connectDB();
    const users = await User.find({ username: { $regex: regex } });
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};


//--------------------userPage.jsx--------------------//

import { fetchUsers } from "@/app/lib/fetcher";

const UserPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  //const q = searchParams.get("q") || 1;           // another way to get searchParams
  const users = await fetchUsers(q);

  return (
    <div>
      {users.map((user) => (
        <div>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
      )      
    </div>
  )
