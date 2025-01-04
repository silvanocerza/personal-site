import { createFeed } from "@/app/lib/create-feed";
import { getBlogContent } from "@/app/lib/posts";

import { Feed } from "feed";

export async function GET() {
  const { posts, thoughts } = await getBlogContent();

  const title = "Silvano Cerza Blog and Thoughts";
  const description =
    "Blog posts and random thoughts about anything, mostly software development.";
  const feed: Feed = await createFeed(title, description, [
    ...posts,
    ...thoughts,
  ]);

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-static";
