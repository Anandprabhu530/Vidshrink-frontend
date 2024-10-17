import { Storage } from "@google-cloud/storage";

const storage = new Storage();

const org_video_bucket_name = process.env.GCP_BUCKET_NAME!;

export async function generateV4UploadSignedUrl(fileName: string) {
  const [url] = await storage
    .bucket(org_video_bucket_name)
    .file(fileName)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType: "application/octet-stream",
    });

  console.log(url);
  return url;
}
