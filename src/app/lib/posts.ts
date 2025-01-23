import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Options to parse frontmatter
const mattersOptions = {
  language: "yaml",
  delimiters: "---",
  excerpt: true,
  excerpt_separator: "---",
};

type blogData = {
  // Posts are exactly that, blog posts
  posts: Post[];
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
  draft: boolean;
}

export interface Thought {
  slug: string;
  date: string;
  content: string;
  tags: string[];
  draft: boolean;
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
function readPostFile(postFile: string): Post {
  const slug = path.basename(postFile, ".md");
  const fileContents = fs.readFileSync(postFile, "utf8");
  const { data, excerpt, content } = matter(fileContents, mattersOptions);

  return {
    slug,
    title: data.title,
    date: new Date(data.date).toISOString(),
    excerpt: excerpt || "",
    content: content,
    tags: data.tags || [],
    draft: data.draft || false,
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
function readThoughtFile(thoughtFile: string): Thought {
  const slug = path.basename(thoughtFile, ".md");
  const fileContents = fs.readFileSync(thoughtFile, "utf8");
  const { data, content } = matter(fileContents, mattersOptions);

  return {
    slug,
    date: new Date(data.date).toISOString(),
    content: content,
    tags: data.tags || [],
    draft: data.draft || false,
  };
}

export async function getBlogContent(): Promise<blogData> {
  if (dataCache) {
    return dataCache;
  }

  const postsDir = path.join("content", "posts");
  const thoughtsDir = path.join("content", "thoughts");

  let posts: Post[];
  if (fs.existsSync(postsDir)) {
    posts = fs
      .readdirSync(postsDir, { recursive: true })
      .map(String)
      .filter((p) => p.endsWith(".md"))
      .map((p) => path.join(postsDir, p))
      .map(readPostFile)
      .filter((p) => !p.draft);
  } else {
    posts = [];
  }

  let thoughts: Thought[];
  if (fs.existsSync(thoughtsDir)) {
    thoughts = fs
      .readdirSync(thoughtsDir, { recursive: true })
      .map(String)
      .filter((p) => p.endsWith(".md"))
      .map((p) => path.join(thoughtsDir, p))
      .map(readThoughtFile)
      .filter((t) => !t.draft);
  } else {
    thoughts = [];
  }

  dataCache = {
    posts: posts.sort((a, b) => (b.date < a.date ? -1 : 1)),
    thoughts: thoughts.sort((a, b) => (b.date < a.date ? -1 : 1)),
  };
  return dataCache;
}
