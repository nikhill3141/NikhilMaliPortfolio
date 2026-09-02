import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import EditorToolbar from "./EditorToolbar";

const BlogEditor = ({ onChange, content }) => {
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

    /*
     * Load the existing content directly into the editor.
     *
     * This makes CreatePost and EditPost use the
     * exact same editor structure.
     */
    content: content || {
      type: "doc",
      content: [
        {
          type: "paragraph",
        },
      ],
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },

    editorProps: {
      attributes: {
        class: "tiptap min-h-[700px] pb-32 outline-none",
      },
    },
  });

  /*
   * When editing an existing post, the API data arrives
   * after the editor has already been created.
   *
   * Set that data inside the same editor field.
   *
   * emitUpdate:false prevents setContent() from triggering
   * onUpdate and causing an unnecessary state update.
   */
  useEffect(() => {
    if (!editor || !content) return;

    const currentContent = editor.getJSON();

    const current = JSON.stringify(currentContent);
    const incoming = JSON.stringify(content);

    if (current !== incoming) {
      editor.commands.setContent(content, {
        emitUpdate: false,
      });
    }
  }, [editor, content]);

  return (
    <div className="relative w-full">
      {/* ============================================== */}
      {/* Writing Area */}
      {/* ============================================== */}

      <EditorContent editor={editor} />

      {/* ============================================== */}
      {/* Fixed Bottom Toolbar */}
      {/* ============================================== */}

      <div
        className="
          fixed
          bottom-6
          left-1/2
          z-50
          flex
          -translate-x-1/2
          items-center
          gap-1
          rounded-2xl
          border
          border-zinc-200
          bg-white/95
          p-2
          shadow-lg
          shadow-zinc-900/10
          backdrop-blur-md
        "
      >
        <EditorToolbar editor={editor} />
      </div>
    </div>
  );
};

export default BlogEditor;
