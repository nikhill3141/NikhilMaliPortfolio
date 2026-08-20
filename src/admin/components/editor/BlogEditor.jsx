import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import EditorToolbar from "./EditorToolbar";

const BlogEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),

      Placeholder.configure({
        placeholder: "Start writing your story...",
      }),
    ],

    content: "",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange(json);
    },

    editorProps: {
      attributes: {
        class: "tiptap min-h-[700px] pb-32 outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-2">
      <div className=" fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-zinc-200 bg-white/95 p-2 shadow-lg shadow-zinc-900/10 backdrop-blur-md ">
        <EditorToolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;
