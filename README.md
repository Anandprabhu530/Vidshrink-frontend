# Vids Shrink

A Dockerized Video Shrinker Application deployed on Google Cloud Run

This project provides a video shrinking application that can be easily deployed to Google Cloud Run. It leverages Docker to containerize the application, ensuring consistent behavior across different environments.

## Features

- Reduces video file sizes while maintaining quality.
- Supports various output formats (e.g., MP4, WebM).
- Easily deploy to Google Cloud Run for scalable and serverless hosting.
- Ensures consistent behavior across different environments.

## Frontend (Next.js):

- User interacts with the frontend and triggers the video upload process.
- Frontend sends a request to the Firebase Cloud Functions.

## Firebase Cloud Functions:

- Receives the request from the frontend.
- Generates a signed URL using Firebase Storage's getSignedUrl method.
- Returns the signed URL to the frontend.

## Frontend:

- Uses the signed URL to directly upload the video to the Firebase Storage bucket.

## Buckets

- Receives the video and stores it in the specified bucket.
- Triggers a Pub/Sub message upon successful upload.

## Pub/Sub:

- Receives the message from Firebase Storage.
- Publishes the message to a specific topic.

## Cloud Run:

- Receives the message triggered by the video upload.
- Fetches the video from the bucket.
- Processes and uploads the video to a different bucket.

## Firebase

- Create's new record for user authentication.
- Keeps track of video process to maintain idempotency.

Frontend receives the temporary download URL from firebase functions. The temporary download URL is configured to expire after 15 minutes. This url is returned to the user.

## Possible Improvements

- Video Editing: To Implement a basic video editing features like trimming, cropping.
- Video Transcoding: Support transcoding videos to different formats and resolutions to cater to various devices and platforms.

Cloud run code can be found [here](https://github.com/Anandprabhu530/vidshrink).
