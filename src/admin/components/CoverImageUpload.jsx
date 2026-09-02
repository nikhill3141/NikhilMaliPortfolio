import { useRef, useState } from "react";
import { ImagePlus, Loader2, RefreshCw, Trash2 } from "lucide-react";

import { uploadBlogCoverImg } from "../api/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const CoverImageUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const hasImage = Boolean(value?.url);

  const handleFile = async (file) => {
    if (!file) return;

    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    try {
      setUploading(true);

      const response = await uploadBlogCoverImg(file);

      const imageData = response?.data;

      if (!imageData?.url || !imageData?.publicId) {
        throw new Error("Invalid image response from server.");
      }

      onChange({
        url: imageData.url,
        publicId: imageData.publicId,
      });
    } catch (err) {
      console.error("Cover image upload failed:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to upload image.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    e.target.value = "";
  };

  const handleRemove = () => {
    onChange({
      url: "",
      publicId: "",
    });

    setError("");
  };

  return (
    <div className="mt-8">
      <div className="mb-3">
        <p className="text-sm font-medium text-zinc-700">Cover image</p>

        <p className="mt-1 text-xs text-zinc-400">
          JPG, PNG or WebP · Maximum 5 MB
        </p>
      </div>

      {hasImage ? (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
          <img
            src={value.url}
            alt="Blog cover preview"
            className="aspect-video w-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-4 pt-12 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={15} />
              Replace
            </button>

            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 size={15} />
              Remove
            </button>
          </div>

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm">
                <Loader2 size={16} className="animate-spin" />
                Uploading...
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="group flex aspect-video w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="animate-spin text-zinc-400" />

              <span className="mt-3 text-sm font-medium text-zinc-600">
                Uploading image...
              </span>
            </>
          ) : (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-500 shadow-sm ring-1 ring-zinc-200 transition group-hover:scale-105">
                <ImagePlus size={20} />
              </div>

              <span className="mt-3 text-sm font-medium text-zinc-700">
                Add cover image
              </span>

              <span className="mt-1 text-xs text-zinc-400">
                Click to choose an image
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CoverImageUpload;
