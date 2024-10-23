"use client";

import {useEffect, useState, useCallback} from "react";
import {onStatechangedAuth, Signinwithgoogle} from "../libs/firebase";
import {User} from "firebase/auth";
import {useDropzone, FileRejection, DropzoneOptions} from "react-dropzone";
import {uploadVideo} from "../libs/functions";

const UploadVideo = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [download_url, setDownloadURL] = useState("");

  useEffect(() => {
    const Unsubscribe = onStatechangedAuth((user) => {
      setUser(user);
    });

    return () => Unsubscribe();
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        setError(
          "File rejected. Please ensure it's an MP4 or MOV file under 30MB."
        );
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
      "video/mov": [".mov"],
    },
    maxSize: 30 * 1024 * 1024,
  };
  const {getRootProps, getInputProps, isDragActive, open} =
    useDropzone(dropzoneOptions);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    if (!user) {
      return;
    }
    console.log(file);
    //file.filepath

    setLoading(true);
    try {
      const response = await uploadVideo(file, user);
      setLoading(false);
      console.log(response.fileName);
      //add state to process
      setProcess(true);
      //call to api

      setTimeout(async () => {
        const download_url = await fetch("/api/downloadvideo", {
          method: "POST",
          body: JSON.stringify({fileName: response.fileName}),
        }).then((res) => res.json());

        if (download_url.Downloadstring.length !== 0) {
          const link = document.createElement("a");
          link.href = download_url.Downloadstring.signedUrl;
          link.download = `processed_video_${file.name}.mp4`;
          link.click();
          setDownloadURL(download_url.Downloadstring);
          return;
        }
      }, 1000);

      console.log(download_url);
      setProcess(false);
    } catch (error) {
      setLoading(false);
      setProcess(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-16">
      <div className="w-[600px] flex items-center relative justify-center h-[180px]">
        <div
          className={`${user ? "" : "absolute inset-0 blur-lg bg-neutral-300"}`}
        />
        {user ? (
          <div className="mt-10">
            <div
              {...getRootProps()}
              className="border-2 border-dashed shadow-xl flex items-center justify-center border-gray-500 rounded-lg p-4 text-center cursor-pointer w-[600px] h-[200px]"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className="text-blue-500">Drop the file here ...</div>
              ) : (
                <div className="font-semibold text-lg">
                  Drag & drop video file here, or
                  <div>
                    <button
                      type="button"
                      className="text-blue-500 underline underline-offset-1"
                      onClick={open}
                    >
                      Upload File
                    </button>
                  </div>
                </div>
              )}
            </div>
            {file && (
              <div className="mt-4">
                <div className="text-sm text-gray-600">
                  Selected file: {file.name}
                </div>
                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={handleUpload}
                    className="mt-2 px-4 py-2 text-lg font-normal bg-black text-white rounded hover:bg-neutral-900 transition duration-200"
                  >
                    {loading ? "Uploading" : process ? "Processing" : "Convert"}
                  </button>
                </div>
              </div>
            )}
            {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
          </div>
        ) : (
          <div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <button
                onClick={Signinwithgoogle}
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadVideo;
