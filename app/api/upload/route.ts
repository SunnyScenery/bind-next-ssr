import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const s3 = new S3Client({ region: "us-west-2" });

export async function GET() {
  const resp = await s3.send(
    new GetObjectCommand({
      Bucket: "binding-gameday-blinsowa",
      Key: "hello.txt",
    })
  );

  const content = await resp.Body?.transformToString();
  return NextResponse.json({ content });
}
