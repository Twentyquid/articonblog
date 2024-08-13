import PostCard from "@/components/PostCard";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Articon Blogs Page",
  description: "blogs page of the articon club",
};

async function BlogsPage() {
  async function getAllBlogs() {
    try {
      const client = await clientPromise;
      const filter = {};
      const projection = {
        slug: 1,
        description: 1,
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
  // async function fetchData() {
  //   try {
  //     let response = await fetch("http://localhost:3000/api/posts/");
  //     let posts = await response.json();
  //     console.log(posts);
  //     return posts;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const { result, error } = await getAllBlogs();
  if (error) notFound();
  return (
    <>
      <div className="pt-20">
        <main className="lg:max-w-[1170px] bg-gray-50 mx-auto">
          <h1 className="text-2xl font-medium mb-10">Latest Blogs</h1>
          <div className="w-full inline-flex gap-[2%] gap-y-[22px] justify-between flex-wrap">
            {result?.map((item, index) => {
              return <PostCard key={index} card={item} />;
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default BlogsPage;
