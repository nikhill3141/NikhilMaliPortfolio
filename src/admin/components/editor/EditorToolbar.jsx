import {
  Bold,
  Italic,
  Code,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
} from "lucide-react";

const ToolbarButton = ({ onClick, active, children, title }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`
        flex h-9 w-9 items-center justify-center
        rounded-lg
        text-zinc-600
        transition
        hover:bg-zinc-100
        hover:text-zinc-950
        ${active ? "bg-zinc-100 text-zinc-950" : ""}
      `}
    >
      {children}
    </button>
  );
};

const Divider = () => <div className="mx-1 h-5 w-px bg-zinc-200" />;

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  return (
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
      {/* Paragraph */}

      <ToolbarButton
        title="Paragraph"
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Pilcrow size={17} />
      </ToolbarButton>

      {/* Headings */}

      <ToolbarButton
        title="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={18} />
      </ToolbarButton>

      <ToolbarButton
        title="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={18} />
      </ToolbarButton>

      <ToolbarButton
        title="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={18} />
      </ToolbarButton>

      <Divider />

      {/* Text */}

      <ToolbarButton
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={17} />
      </ToolbarButton>

      <ToolbarButton
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={17} />
      </ToolbarButton>

      <Divider />

      {/* Lists */}

      <ToolbarButton
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={18} />
      </ToolbarButton>

      <ToolbarButton
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={18} />
      </ToolbarButton>

      <Divider />

      {/* Quote / Code */}

      <ToolbarButton
        title="Blockquote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={17} />
      </ToolbarButton>

      <ToolbarButton
        title="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code size={17} />
      </ToolbarButton>

      <Divider />

      {/* Alignment */}

      <ToolbarButton
        title="Align left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft size={17} />
      </ToolbarButton>

      <ToolbarButton
        title="Align center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter size={17} />
      </ToolbarButton>

      <ToolbarButton
        title="Align right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight size={17} />
      </ToolbarButton>

      <ToolbarButton
        title="Justify"
        active={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify size={17} />
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
