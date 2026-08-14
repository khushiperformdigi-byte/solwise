import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { api, compressImage } from "../api/client";

const API_KEY =
  import.meta.env.VITE_TINYMCE_API_KEY ||
  "qm7iaftc1qyyzq7rldggcwem1sz0p9pauactmuubqzpalldl";

export default function TinyEditor({ value, onChange, height = 480 }) {
  const editorRef = useRef(null);

  async function uploadImage(blobInfo) {
    const blob = blobInfo.blob();
    const file = new File([blob], blobInfo.filename() || "image.jpg", {
      type: blob.type || "image/jpeg",
    });
    const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.8 });
    const form = new FormData();
    form.append("image", compressed);
    const data = await api("/api/blogs/upload-image", { method: "POST", body: form });
    return data.url;
  }

  return (
    <Editor
      apiKey={API_KEY}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
      }}
      value={value}
      onEditorChange={(content) => onChange?.(content)}
      init={{
        height,
        menubar: "file edit view insert format tools table",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough | forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
          "link image media table | removeformat | code fullscreen | help",
        content_style:
          "body { font-family: Lora, Georgia, serif; font-size: 16px; line-height: 1.7; color: #3A342C; }",
        branding: false,
        promotion: false,
        image_caption: true,
        automatic_uploads: true,
        images_upload_handler: uploadImage,
        paste_data_images: true,
        file_picker_types: "image",
      }}
    />
  );
}
