import {User} from "firebase/auth";
import {getFunctions, httpsCallable} from "firebase/functions";

const functions = getFunctions();

const generateUploadURL = httpsCallable(functions, "generateUploadURL");

export async function uploadVideo(file: File, user: User) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any = await generateUploadURL({
    Extension: file.name.split(".").pop(),
    User: user.uid,
    contentType: file.type,
  });

  console.log(response);
  await fetch(response?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });
  return;
}
