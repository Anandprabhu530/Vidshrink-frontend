import {db} from "@/app/libs/firebase";
import {NextRequest} from "next/server";
import {doc, Firestore, getDoc} from "firebase/firestore";
import {getFunctions, httpsCallable} from "firebase/functions";

const functions = getFunctions();

const generateDownloadURL = httpsCallable(functions, "generateDownloadURL");

export async function POST(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {fileName}: any = request.json();
  //need to add good way to obtain (probably admin)
  const video_collections = doc(db, "videos", fileName);
  const video_details = await getDoc(video_collections);

  if (video_details.exists()) {
    const video = video_details.data();
    //need to process the downloadable url
    //make a fetch to bucket to make the video downloadable else make the bucket public-(not a good option)
    //process here or create a firebase function to fetch the url
    //firebase function is better for security
    //processing locally need to add more permissions
    if (video.status === "processed") {
      const url = await generateDownloadURL(fileName);
      console.log("Processed");
      console.log(url);
      return Response.json({Downloadstring: url});
    } else {
      return Response.json({Downloadstring: ""});
    }
  } else {
    return Response.json({Downloadstring: ""});
  }
}
