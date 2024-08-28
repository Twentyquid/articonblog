"use client";

import {
  MDXEditor,
  headingsPlugin,
  frontmatterPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  tablePlugin,
  linkPlugin,
  linkDialogPlugin,
  listsPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  toolbarPlugin,
  KitchenSinkToolbar,
} from "@mdxeditor/editor";

import "@/lib/editorTheme.scss";

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

export default function Editor({ markdown, editorRef }) {
  return (
    <MDXEditor
      onChange={(e) => {
        console.log(e);
      }}
      placeholder="Type your ideas..."
      autoFocus={true}
      contentEditableClassName="custom-editor"
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        frontmatterPlugin(),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        tablePlugin(),
        quotePlugin(),
        listsPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            tsx: "TypeScript",
            c: "c",
            cpp: "c++",
            python: "Python",
            rust: "Rust",
            html: "HTML",
            sql: "SQL",
            "": "Unspecified",
          },
        }),
        markdownShortcutPlugin(),
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
      ]}
    />
  );
}
