import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

export default async function Home() {
  let content = "";
  let error = "";

  try {
    const bucket = process.env.BucketArn?.split(":::")[1];
    if (!bucket) throw new Error("BucketArn env var not set");

    const s3 = new S3Client({ region: "us-west-2" });
    const resp = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: "hello.txt" })
    );
    content = (await resp.Body?.transformToString()) ?? "";
  } catch (e) {
    error = (e as Error).message;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">S3 Reader</h1>
      {error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <p className="text-lg">Content: {content}</p>
      )}
    </main>
  );
}
