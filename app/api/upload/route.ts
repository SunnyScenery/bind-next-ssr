import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Debug: log who we are
  try {
    const sts = new STSClient({ region: "us-west-2" });
    const identity = await sts.send(new GetCallerIdentityCommand({}));
    console.log("Caller identity:", JSON.stringify(identity));
  } catch (e) {
    console.log("STS error:", (e as Error).message);
  }

  try {
    const s3 = new S3Client({ region: "us-west-2" });
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
