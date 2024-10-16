"use client";

import React, { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";

const VideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        setError("File rejected. Please ensure it's an MP4 file under 30MB.");
        setFile(null);
        return;
      }

      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        setError("");
        setFile(selectedFile);
      }
    },
    []
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
    },
    maxSize: 30 * 1024 * 1024,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log(file);
  };

  return (
    <div className="mt-10">
      <div
        {...getRootProps()}
        className="border-2 border-dashed flex items-center justify-center border-gray-500 rounded-lg p-4 text-center cursor-pointer w-[800px] h-[200px]"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the MP4 file here ...</p>
        ) : (
          <p>Drag & drop an MP4 file here, or Upload File</p>
        )}
      </div>
      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
          <button
            onClick={handleUpload}
            className="mt-2 px-4 py-2 text-lg font-normal    bg-black text-white rounded hover:bg-neutral-900 transition duration-200"
          >
            Upload
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default VideoUpload;
