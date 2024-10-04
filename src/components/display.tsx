"use client";
import { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseconfig";

interface FileInfo {
  name: string;
  url: string;
  type: string;
}

const DisplayFiles = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      const storageRef = ref(storage, "uploads/");

      try {
        const result = await listAll(storageRef);
        const filePromises = result.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => {
            const fileType = itemRef.name.split(".").pop()?.toLowerCase();
            return {
              name: itemRef.name,
              url,
              type:
                fileType === "png" || fileType === "jpeg" || fileType === "jpg"
                  ? "image"
                  : "pdf",
            };
          })
        );
        const filesList = await Promise.all(filePromises);
        setFiles(filesList);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchFiles();
  }, []);

  const renderPreview = (file: FileInfo) => {
    if (file.type === "image") {
      return (
        <img
          src={file.url}
          alt={file.name}
          style={{ width: "100px", height: "auto" }}
        />
      );
    } else if (file.type === "pdf") {
      return (
        <img
          src="/pdf-icon.png"
          alt={file.name}
          style={{ width: "100px", height: "auto" }}
        />
      );
    } else {
      return <span>No preview available</span>;
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <div>
              {renderPreview(file)}
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayFiles;
