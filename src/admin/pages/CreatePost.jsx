import { useState } from "react";

import { createPost, getPostbySlug, publishedPost } from "../api/post";
import { getCategories } from "../api/category";
import { useGetCategories } from "../hooks/useGetCategories";
import BlogEditor from "../components/editor/BlogEditor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [newPost, setNewPost] = useState(null);
  const [content, setContent] = useState({
    type: "doc",
    content: [
      {
        type: "paragraph",
      },
    ],
  });

const {data, isLoading, isError} = useGetCategories()
  
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-zinc-500">Loading categories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm font-medium text-red-700">
          Failed to load categories.
        </p>

        <p className="mt-1 text-sm text-red-600">{error?.message}</p>
      </div>
    );
  }
  const catData = data?.categories ?? [];
 if(catData.length > 0 && categories.length === 0){
  setCategories(catData)
  console.log("Categories:", categories);
 }  
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDtata = {
      title,
      slug,
      excerpt,
      categoryId,
      content,
    };
    const data = await createPost(postDtata);
    CONSOLE.log("Post created:", data);
    setNewPost(data?.post?._id);
    
  };
  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handlePublish = async () => {
    if (!newPost) {
    await publishedPost(newPost);
  }
}

  return (
    <div className="mx-auto max-w-5xl pb-32">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-zinc-500">Blog</p>

        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
          Create post
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Write and publish a new article.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              setSlug(generateSlug(value));
            }}
            placeholder="Enter your post title..."
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-2xl font-semibold outline-none transition placeholder:text-zinc-300 focus:border-zinc-400"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Slug
          </label>

          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="my-awesome-blog-post"
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
          />

          <p className="mt-1.5 text-xs text-zinc-500">
            Used in your public URL.
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Excerpt
          </label>

          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="A short description of your article..."
            className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Category
          </label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-400"
          >
            <option value="">Select category</option>

            {/* We'll replace these with API data */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Editor */}
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-800">
            Content
          </label>

          <BlogEditor onChange={setContent} />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
          <button
            type="button"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Save draft
            </button>

            <button
              type="button"
              className="rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
