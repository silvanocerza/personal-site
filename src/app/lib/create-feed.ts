import { Feed } from "feed";
import { Post, Thought } from "@/app/lib/posts";

const AUTHOR = { name: "Silvano Cerza", email: "silvanocerza@gmail.com" };
const COPYRIGHT =
  "This content is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license.";
const BASE_URL = process.env.URL || "http://localhost:3000";

/**
 * Creates a new feed from a list of posts and/or thoughts.
 * Title and description can be customized too.
 */
export function createFeed(
  title: string,
  description: string,
  items: (Post | Thought)[],
): Feed {
  const feed = new Feed({
    title: title,
    description: description,
    id: BASE_URL,
    link: BASE_URL,
    favicon: `${BASE_URL}/icon.png`,
    language: "en",
    author: AUTHOR,
    copyright: COPYRIGHT,
  });

  items
    .filter((i) => !i.draft)
    .forEach((item: Post | Thought) => {
      feed.addItem({
        title: "title" in item ? item.title : "",
        id: item.slug,
        link: `${BASE_URL}/post/${item.slug}`,
        // TODO: Render content to html
        content: item.content,
        date: new Date(item.date),
        author: [AUTHOR],
        copyright: COPYRIGHT,
      });
    });

  return feed;
}
