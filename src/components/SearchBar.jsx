import React from 'react';
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = () => {
  return (
    <>
        <form action="/">
        <div className="flex items-center rounded-md p-1 bg-[#E1E1E1]">
            <input
            type="text"
            placeholder="Search"
            name="search"
            className="flex-1 border-0 outline-none bg-[#E1E1E1]"
            />
            <button className=" border-0 cursor-pointer ml-1">
            <BiSearchAlt2 className="text-black "/>
            </button>
        </div>
        </form>
    </>
  )
}

export default SearchBar