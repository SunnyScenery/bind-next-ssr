import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const s3 = new S3Client({ region: "us-west-2" });
const bucket = process.env.BucketArn!.split(":::")[1];

export async function GET() {
  try {
    const resp = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: "hello.txt" })
    );
    const content = await resp.Body?.transformToString();
    return NextResponse.json({ content });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
