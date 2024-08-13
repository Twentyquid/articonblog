import Link from "next/link";

function SearchItems({ value, slug }) {
  if (value === "default") {
    return (
      <Link href={"/blog/"}>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-2xl">
              <i className="ri-compass-line"></i>
            </div>
            <p className="ml-3">Explore Topics</p>
          </div>
          <div className="text-2xl">
            <i className="ri-arrow-right-up-line"></i>
          </div>
        </div>
      </Link>
    );
  } else
    return (
      <Link href={`/blog/${slug}`}>
        <div>
          <p>{value}</p>
        </div>
      </Link>
    );
}

export default SearchItems;
