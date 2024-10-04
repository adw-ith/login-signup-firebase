"use client";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/config/firebaseconfig";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const types = ["image/png", "image/jpeg", "application/pdf"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? e.target.files[0] : null;
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid file (png, jpeg, pdf)");
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Handle progress
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("File uploaded and available at:", url);
          });
        }
      );
    }
  };

  return (
    <form className="bg-slate-900 flex flex-col p-8 justify-center text-white items-center">
      <input
        type="file"
        onChange={handleChange}
        className="border-2 border-white w-full"
      />
      <button
        type="button"
        className="bg-blue-500 px-4 p-2 rounded-md hover:bg-blue-900 duration-300 mt-4"
        onClick={handleUpload}
      >
        Upload
      </button>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
};

export default UploadForm;
