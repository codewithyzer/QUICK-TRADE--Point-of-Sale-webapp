import { useState } from "react";

export default function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
      setFile(selectedFile);
      onImageSelect && onImageSelect(selectedFile); // Call parent handler if provided
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="text-primary text-sm font-medium">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm"
      />

      {preview && (
        <div className="mt-3">
          <p className="text-xs text-gray-600">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="mt-1 h-40 w-40 rounded border object-cover shadow-md"
          />
        </div>
      )}
    </div>
  );
}
