import dynamic from "next/dynamic";
import { Suspense } from "react";
import "@mdxeditor/editor/style.css";

const EditorComp = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});
const markdown = "";

export default async function CreatePost(params) {
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
