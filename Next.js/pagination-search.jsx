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
     params.set("page", 1);

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

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;
  
  try {
    connectDB();
    const count = await User.find({ username: { $regex: regex } }).count(); // this will count only the number of users
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

//--------------------userPage.jsx--------------------//

import Pagination from "@/app/components/dashboard/pagination";
import { fetchUsers } from "@/app/lib/fetcher";

const UserPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;          // another way to get searchParams

  const { count, users } = await fetchUsers(q, page);

  return (
    <div>
      {users.map((user) => (
        <div>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
      )
      // -----paginagion component-------//
      <Pagination count={count} />  
    </div>
  )


//--------------------pagination.jsx--------------------//
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const disable = "btn text-gray-400 bg-[var(--deactive)] cursor-not-allowed";
const anabale = "btn text-gray-700 bg-[var(--active)]";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  const ITEM_PER_PAGE = 2;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex justify-between mt-6 px-2">
      <button
        className={`${!hasPrev ? disable : anabale}`}
        onClick={() => handleChangePage("prev")}
      >
        &#8592; Prev
      </button>
      <button
        className={`${!hasNext ? disable : anabale}`}
        onClick={() => handleChangePage("next")}
      >
        Next &#8594;
      </button>
    </div>
  );
};

export default Pagination;
