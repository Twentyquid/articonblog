import Image from "next/image";
import Link from "next/link";

function PostCard({ card }) {
  return (
    <>
      <div className="basis-full md:basis-[49%] lg:basis-[32%] px-5 pb-5">
        <Link href={`/blog/${card.slug}/`}>
          <div className="h-[184px] overflow-hidden relative rounded-md">
            <Image
              alt="post image"
              className="object-cover w-full h-full relative"
              src={card["cover-url"]}
              fill
              priority
            />
          </div>
        </Link>
        <div className="mt-5">
          <Link href={`/blog/${card.slug}/`}>
            <h3 className="text-xl font-medium">{card.title}</h3>
          </Link>
          <p className="mt-6 text-[#42526E] font-light">{card.description}</p>
          <div className="flex mt-6">
            <p className="border-r border-black pr-3">
              by{" "}
              <Link href="#">
                <strong>{card["author"]}</strong>
              </Link>
            </p>
            <p className="px-3">
              {new Date(card["created-at"]).toLocaleDateString("en-us", {
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;
