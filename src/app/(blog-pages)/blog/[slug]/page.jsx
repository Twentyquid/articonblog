"use server";

import clientPromise from "@/lib/mongodb";
import Avvvatars from "avvvatars-react";
import "@/lib/codeTheme.css";
import Image from "next/image";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import { sitemetadata } from "@/lib/siteMetadata";

export async function generateMetadata({ params }) {
  let { postData, error } = await getPost(params);
  if (postData) {
    return {
      title: postData.title,
      description: postData.description,
      openGraph: {
        title: postData.title,
        description: postData.description,
        url: "https://articon.unparallel.in/blog/" + postData.slug,
        siteName: sitemetadata.title,
        locale: "en_IN",
        type: "article",
        publishedTime: postData["created-at"],
        modifiedTime: postData["created-at"],
        images: [
          {
            url: postData["cover-url"],
            width: 800,
            height: 600,
          },
        ],
        authors: [postData["author"]],
      },
    };
  }
}

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

async function PostComponent({ params }) {
  // async function fetchData() {
  //   try {
  //     let response = await fetch(`http://localhost:3000/api/${params.slug}`);
  //     console.log(response.status);
  //     if (response.status === 404) {
  //       console.log("not found");
  //       return { error: "not found" };
  //     } else {
  //       let postData = await response.json();
  //       return { postData };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return { error };
  //   }
  // }
  const { postData, error } = await getPost(params);
  if (error) {
    notFound();
  }
  console.log("post data received is:");
  console.log(postData);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(postData["content"]);
  return (
    <>
      <div className="pt-20 bg-[#000000]">
        <article className="w-[876px] mx-auto  rounded-t-xl">
          <div className="w-[876px] h-[368px] rounded-t-xl overflow-hidden relative">
            <Image
              alt="Banner image for the blog"
              className="object-cover w-full h-full relative"
              fill
              src={postData["cover-url"]}
              priority
            />
          </div>
          <div className="px-14 bg-[#171717] text-white py-1">
            <div className="flex items-center my-4">
              <Avvvatars size={40} value={postData["author"]} />
              <div className="text-left ml-2 ">
                <div className="capitalize font-bold">{postData["author"]}</div>
                <p className="text-sm ">
                  Posted on{" "}
                  {new Date(postData["created-at"]).toLocaleDateString(
                    "en-us",
                    {
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
            <h1 className="text-5xl font-black capitalize  my-4">
              {postData["title"]}
            </h1>
            {/* rendered content from markdown 👇*/}
            <div
              className="prose prose-neutral prose-invert max-w-full"
              dangerouslySetInnerHTML={{ __html: String(file) }}
            />
          </div>
        </article>
      </div>
    </>
  );
}

export default PostComponent;
