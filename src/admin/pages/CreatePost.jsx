// CreatePost.jsx
import { useState, useEffect, useRef } from "react";
import CoverImageUpload from "../components/CoverImageUpload";

import { createPost, publishedPost } from "../api/post";
import { useGetCategories } from "../hooks/useGetCategories";
import BlogEditor from "../components/editor/BlogEditor";

const useAutosizeTextarea = (value) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return ref;
};

const generateSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [postId, setPostId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    type: "doc",
    content: [{ type: "paragraph" }],
  });
  const [coverImage, setCoverImage] = useState({
    url: "",
    publicId: "",
  });


  const { data, isLoading, isError, error } = useGetCategories();

  useEffect(() => {
    const catData = data?.categories ?? [];
    if (catData.length > 0) setCategories(catData);
  }, [data]);

  const titleRef = useAutosizeTextarea(title);
  const excerptRef = useAutosizeTextarea(excerpt);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (!slugTouched) setSlug(generateSlug(value));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
     const postData = {
       title,
       slug,
       excerpt,
       categoryId,
       content,
       coverImage: coverImage.url || undefined,
       coverImagePublicId: coverImage.publicId || undefined,
     };
      const res = await createPost(postData);
      setPostId(res?.post?.id);
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!postId) await handleSubmit();
    await publishedPost(postId);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-zinc-500">Loading categories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm font-medium text-red-700">
          Failed to load categories.
        </p>
        <p className="mt-1 text-sm text-red-600">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Slim top action bar — floats, doesn't box in the writing area */}
      <div className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <button
            type="button"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <span className="mr-1 text-xs text-zinc-400">
              {saving ? "Saving..." : postId ? "Draft saved" : ""}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="rounded-full bg-zinc-950 px-5 py-1.5 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* One continuous writing surface */}
      <div className="mx-auto max-w-3xl px-4 pb-40 pt-12">
        {/* Category — a quiet pill, not a form control */}
        <div className="mb-4">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="cursor-pointer rounded-full border border-zinc-200 bg-transparent px-3 py-1 text-xs font-medium text-zinc-500 outline-none transition hover:border-zinc-300 focus:border-zinc-400"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title — big, borderless, grows with content */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          rows={1}
          className="w-full resize-none overflow-hidden border-none bg-transparent font-serif text-4xl font-bold leading-tight text-zinc-950 outline-none placeholder:text-zinc-300 md:text-5xl"
        />

        {/* Subtitle / excerpt — flows right under the title */}
        <textarea
          ref={excerptRef}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Add a subtitle..."
          rows={1}
          className="mt-2 w-full resize-none overflow-hidden border-none bg-transparent text-lg text-zinc-400 outline-none placeholder:text-zinc-300"
        />

        {/* Slug — inline, editable, out of the way until you need it */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
          <span>yoursite.com/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="border-b border-transparent bg-transparent text-zinc-500 outline-none hover:border-zinc-200 focus:border-zinc-400"
          />
        </div>
        {/* Cover image */}
        <CoverImageUpload value={coverImage} onChange={setCoverImage} />

        {/* Editor — no card, no border, same page as everything above */}
        <div className="mt-10">
          <BlogEditor onChange={setContent} content={content} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
