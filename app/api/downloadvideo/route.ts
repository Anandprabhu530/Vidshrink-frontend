import {db} from "@/app/libs/firebase";
import {NextRequest} from "next/server";
import {doc, getDoc} from "firebase/firestore";

export async function GET(request: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {fileName}: any = request.json();
  //need to add good way to obtain (probably admin)
  const video_collections = doc(db, "videos", fileName);
  const video_details = (await getDoc(video_collections)).data();
  if (video_details?.status === "processed") {
    //need to process the downloadable url
    return Response.json({Downloadstring: video_details.fileName});
  } else {
    return Response.json({Downloadstring: ""});
  }
}
