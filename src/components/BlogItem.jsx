"use server";
export default async function BlogItem({ item }) {
  return (
    <a href={`/blog/${item.slug}`}>
      <div>
        <p>{item.title}</p>
        <div>
          <span>By</span> <span>{item.author}</span>
          <span>-</span>
          <span>
            {new Date(item["created-at"]).toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </a>
  );
}
