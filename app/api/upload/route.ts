import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const s3 = new S3Client({
    region: "us-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      sessionToken: process.env.AWS_SESSION_TOKEN!,
    },
  });

  const resp = await s3.send(
    new GetObjectCommand({
      Bucket: "binding-gameday-blinsowa",
      Key: "hello.txt",
    })
  );

  const content = await resp.Body?.transformToString();
  return NextResponse.json({ content });
}
