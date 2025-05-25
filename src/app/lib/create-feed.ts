import { Feed } from "feed";
import { Post, Thought } from "@/app/lib/posts";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Root } from "mdast";

const AUTHOR = { name: "Silvano Cerza", email: "silvanocerza@gmail.com" };
const COPYRIGHT =
  "This content is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license.";
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const customImagePlugin = () => (tree: Root) => {
  // We handle image with relative path in a different way than when we
  // render for the browser as we need to use the full URL, otherwise
  // the feed reader won't be able to find the image.
  visit(
    tree,
    "element",
    (node: { tagName: string; properties: { src?: string } }) => {
      if (node.tagName === "img" && node.properties.src?.startsWith("./")) {
        node.properties.src = node.properties.src.replace("./", `${BASE_URL}/`);
      }
    },
  );
};

/**
 * Creates a new feed from a list of posts and/or thoughts.
 * Title and description can be customized too.
 */
export async function createFeed(
  title: string,
  description: string,
  items: (Post | Thought)[],
): Promise<Feed> {
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

  await Promise.all(
    items
      .filter((i) => !i.draft)
      .map(async (item: Post | Thought) => {
        const content = await remark()
          .use(remarkGfm)
          .use(remarkRehype)
          .use(customImagePlugin)
          .use(rehypeStringify)
          .process(item.content);
        feed.addItem({
          title: "title" in item ? item.title : "",
          id: item.slug,
          link: `${BASE_URL}/post/${item.slug}`,
          content: content.toString(),
          date: new Date(item.date),
          author: [AUTHOR],
          copyright: COPYRIGHT,
        });
      }),
  );

  return feed;
}
