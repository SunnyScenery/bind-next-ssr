import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: { action?: string } }) {
  let content = "";
  let error = "";

  if (searchParams.action === "read") {
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
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">S3 Reader</h1>
      <a
        href="/?action=read"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Read from S3
      </a>
      {content && <p className="text-lg text-green-600">Content: {content}</p>}
      {error && <p className="text-lg text-red-600">Error: {error}</p>}
    </main>
  );
}
