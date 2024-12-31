import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import toml from "toml";

// Options to parse frontmatter
const mattersOptions = {
  language: "toml",
  engines: {
    toml: {
      parse: toml.parse.bind(toml),
    },
  },
  delimiters: "+++",
  excerpt: true,
  excerpt_separator: "<!--more-->",
};

type blogData = {
  // Posts are exactly that, blog posts
  posts: Post[];
  // Talks are identical to posts, except they don't have an excerpt
  talks: Talk[];
  // Thoughts are short form blog posts, they don't have a title and are shown
  // together with posts.
  thoughts: Thought[];
};

// Cache the data so we don't have to read it from disk every time
let dataCache: blogData | null = null;

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export interface Thought {
  slug: string;
  date: string;
  content: string;
  tags: string[];
}

export interface Talk {
  slug: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
}

/**
Reads a single file and returns a Post.
The file must have a frontmatter section with the following fields:

```
title: string
date: string
tags: string[]
```
The frontmatter section is parsed with toml and must start and end with `+++`.
*/
async function readPostFile(postFile: string): Promise<Post> {
  const slug = path.basename(postFile, ".md");
  const fileContents = fs.readFileSync(postFile, "utf8");
  const { data, excerpt, content } = matter(fileContents, mattersOptions);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title,
    date: new Date(data.date).toISOString(),
    excerpt: excerpt || "",
    content: processedContent.toString(),
    tags: data.tags || [],
  };
}

/**
Reads a single file and returns a Talk.
The file must have a frontmatter section with the following fields:

```
title: string
date: string
tags: string[]
```
The frontmatter section is parsed with toml and must start and end with `+++`.
*/
async function readTalkFile(postFile: string): Promise<Talk> {
  const slug = path.basename(postFile, ".md");
  const fileContents = fs.readFileSync(postFile, "utf8");
  const { data, content } = matter(fileContents, mattersOptions);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title,
    date: new Date(data.date).toISOString(),
    content: processedContent.toString(),
    tags: data.tags || [],
  };
}

/**
Reads a single file and returns a Thought.
The file must have a frontmatter section with the following fields:

```
date: string
tags: string[]
```
The frontmatter section is parsed with toml and must start and end with `+++`.
*/
async function readThoughtFile(thoughtFile: string): Promise<Thought> {
  const slug = path.basename(thoughtFile, ".md");
  const fileContents = fs.readFileSync(thoughtFile, "utf8");
  const { data, content } = matter(fileContents, mattersOptions);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    date: new Date(data.date).toISOString(),
    content: processedContent.toString(),
    tags: data.tags || [],
  };
}

export async function getBlogContent(): Promise<blogData> {
  if (dataCache) {
    return dataCache;
  }

  const postsDir = path.join("content", "posts");
  const thoughtsDir = path.join("content", "thoughts");
  const talksDir = path.join("content", "talks");

  const posts = await Promise.all(
    fs
      .readdirSync(postsDir, { recursive: true })
      .map(String)
      .map((p) => path.join(postsDir, p))
      .map(readPostFile),
  );

  const thoughts = await Promise.all(
    fs
      .readdirSync(thoughtsDir, { recursive: true })
      .map(String)
      .map((p) => path.join(thoughtsDir, p))
      .map(readThoughtFile),
  );

  const talks = await Promise.all(
    fs
      .readdirSync(talksDir, { recursive: true })
      .map(String)
      .map((p) => path.join(talksDir, p))
      .map(readTalkFile),
  );

  dataCache = {
    posts: posts.sort((a, b) => (b.date < a.date ? -1 : 1)),
    thoughts: thoughts.sort((a, b) => (b.date < a.date ? -1 : 1)),
    talks: talks.sort((a, b) => (b.date < a.date ? -1 : 1)),
  };
  return dataCache;
}