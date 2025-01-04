import { createFeed } from "@/app/lib/create-feed";
import { getBlogContent } from "@/app/lib/posts";

import { Feed } from "feed";

export async function GET() {
  const { posts } = await getBlogContent();

  const title = "Silvano Cerza Blog";
  const description =
    "A blog mainly about software development, but other stuff too.";
  const feed: Feed = createFeed(title, description, posts);

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-static";
