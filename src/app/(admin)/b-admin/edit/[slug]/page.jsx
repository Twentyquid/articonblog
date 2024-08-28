"use server";
import { Suspense } from "react";
import "@mdxeditor/editor/style.css";
import dynamic from "next/dynamic";

const EditorComp = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

async function getPost(params) {
  try {
    const client = await clientPromise;
    const postCollection = client.db("BlogDatabase").collection("sample");
    let postData = await postCollection.findOne({ slug: params.slug });
    console.log("inside get posts function");
    console.log(postData);
    if (postData) {
      return { postData };
    } else {
      return { error: "Not found" };
    }
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

export default async function EditPost({ params }) {
  const { postData, error } = await getPost(params);
  let markdown = "";
  if (error) notFound();
  else {
    markdown = postData["content"];
  }
  return (
    <div>
      <article className="w-[876px] mx-auto  rounded-t-xl">
        <div className="py-10 px-6 bg-[#171717]">
          <textarea
            // onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="w-full text-5xl font-[800] h-[62px] outline-none appearance-none resize-none bg-[#171717] text-white"
            autoFocus
            id="title"
            placeholder="Post title here...."
          ></textarea>
        </div>
        <Suspense fallback={null}>
          <EditorComp markdown={markdown} />
        </Suspense>
      </article>
    </div>
  );
}
