import BlogItem from "@/components/BlogItem";
import clientPromise from "@/lib/mongodb";
async function getAllBlogs() {
  try {
    const client = await clientPromise;
    const filter = {};
    const projection = {
      slug: 1,
      "cover-url": 1,
      title: 1,
      "created-at": 1,
      author: 1,
    };
    const sort = {
      "created-at": -1,
    };
    const postCollection = client.db("BlogDatabase").collection("sample");
    let post = await postCollection.find(filter, { projection, sort });
    let result = await post.toArray();
    // console.log(result);
    if (result) {
      return { result: result };
    } else {
      return { error: "not able to fetch" };
    }
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export default async function PostItem() {
  const { result, error } = await getAllBlogs();
  if (error) return <div></div>;
  return (
    <>
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Posts</p>
        <button className="bg-white text-black px-5 py-3">New Post</button>
      </div>
      <div className="flex flex-col gap-2">
        {result?.map((item, index) => {
          return <BlogItem item={item} key={index} />;
        })}
      </div>
    </>
  );
}
