import Footer from "@/app/components/post-footer";
import { getBlogContent } from "@/app/lib/posts";
import type { Post, Thought } from "@/app/lib/posts";
import Markdown from "@/app/components/markdown";

export async function generateStaticParams() {
  const { posts, thoughts } = await getBlogContent();
  return [...posts, ...thoughts].map((p) => ({
    slug: p.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { posts, thoughts } = await getBlogContent();
  const { slug } = await params;
  const post: Post | Thought | undefined = [...posts, ...thoughts].find(
    (p) => p.slug === slug,
  );
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="pt-8 flex flex-col gap-4">
      <h1
        className="
        text-3xl
        underline
        underline-offset-8
        decoration-1
        decoration-green-500
        dark:decoration-green-200"
      >
        {("title" in post ? post.title : "") as string}
      </h1>
      <Markdown>{post.content}</Markdown>
      <Footer post={post} />
    </div>
  );
}
