import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const s3 = new S3Client({
      region: "us-west-2",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        sessionToken: process.env.S3_SESSION_TOKEN!,
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
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
