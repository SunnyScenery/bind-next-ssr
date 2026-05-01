import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const s3 = new S3Client({ region: "us-west-2" });

export async function GET() {
  try {
    console.log("BucketArn env:", process.env.BucketArn);
    console.log("Env keys with bucket:", Object.keys(process.env).filter(k => k.toLowerCase().includes("bucket")));

    const bucketArn = process.env.BucketArn;
    if (!bucketArn) {
      return NextResponse.json({ error: "BucketArn env var not set", availableBucketKeys: Object.keys(process.env).filter(k => k.toLowerCase().includes("bucket")) }, { status: 500 });
    }

    const bucket = bucketArn.split(":::")[1];
    const resp = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: "hello.txt" })
    );
    const content = await resp.Body?.transformToString();
    return NextResponse.json({ content });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
