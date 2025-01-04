import { createFeed } from "@/app/lib/create-feed";
import { getBlogContent } from "@/app/lib/posts";

import { Feed } from "feed";

export async function GET() {
  const { thoughts } = await getBlogContent();

  const title = "Silvano Cerza Thoughts";
  const description =
    "Random thoughts about anything, mostly software development.";
  const feed: Feed = createFeed(title, description, thoughts);

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-static";
