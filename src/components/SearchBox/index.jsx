"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchItems from "../SearchItems";

function SearchBox() {
  const searchRef = useRef();
  const router = useRouter();
  const [searchValue, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  return (
    <>
      <div className="bg-[#F9F9F9] flex relative w-[50vw]">
        <div>
          <i className="ri-search-line"></i>
        </div>
        <textarea
          value={searchValue}
          onChange={async ({ target }) => {
            setSearch(target.value);
            let response = await fetch(`/api/search?title=${target.value}`);
            let data = await response.json();
            setSearchResults(data);
          }}
          onFocus={() => {
            searchRef.current.style.display = "block";
          }}
          onBlur={() => {
            searchRef.current.style.display = "none";
          }}
          rows={1}
          role="combobox"
          spellCheck={false}
          placeholder="Search"
          type="text"
          maxLength={200}
          className="overflow-hidden resize-none w-full"
        />
      </div>
      <div
        ref={searchRef}
        className="absolute z-[999] bg-slate-500 w-[50vw] text-white hidden"
      >
        <div
          onMouseDown={() => {
            console.log("clicked");
            router.push("/blog/test-blog");
            setSearch("test blog");
          }}
          className="flex flex-col"
        >
          <ul>
            {searchValue == "" ? (
              <SearchItems value={"default"} />
            ) : searchResults ? (
              searchResults.map((item) => {
                return (
                  <SearchItems
                    key={item.slug}
                    value={item.title}
                    slug={item.slug}
                  />
                );
              })
            ) : (
              <div></div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
