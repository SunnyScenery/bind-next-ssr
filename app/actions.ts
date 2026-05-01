"use server";

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function readFromS3(): Promise<{ content?: string; error?: string }> {
  try {
    const bucket = process.env.BucketArn?.split(":::")[1];
    if (!bucket) return { error: "BucketArn env var not set" };

    const s3 = new S3Client({ region: "us-west-2" });
    const resp = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: "hello.txt" })
    );
    const content = (await resp.Body?.transformToString()) ?? "";
    return { content };
  } catch (e) {
    return { error: (e as Error).message };
  }
}
