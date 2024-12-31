import type { Post, Thought } from "@/app/lib/posts";

interface Props {
  date: Date;
  posts: (Post | Thought)[];
}

function isPost(post: Post | Thought): post is Post {
  return "title" in post;
}

/**
 * Renders the footer of a posts and thoughts showing time and tags
 */
async function renderFoot(post: Post | Thought) {
  const date = new Date(post.date);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const time = `${hours}:${minutes} UTC`;

  return (
    <div className="flex flex-row gap-2">
      <a
        className="
      text-xs
      underline
      underline-offset-2
      decoration-1
      decoration-green-500
      hover:text-green-400
      hover:dark:text-green-200
      dark:decoration-green-200
      "
        href={`/posts/${post.slug}`}
      >
        {time}
      </a>
      <p className="text-xs">᯾</p>
      {renderTags(post.tags)}
    </div>
  );
}

/**
 * Renders a post or thought list of tags
 */
async function renderTags(tags: string[]) {
  return tags.map((tag) => (
    <a
      className="
      text-xs
      underline
      underline-offset-2
      decoration-1
      decoration-green-500
      hover:text-green-400
      hover:dark:text-green-200
      dark:decoration-green-200
      "
      href={`/tags/${tag}`}
      key={tag}
    >
      {tag}
    </a>
  ));
}

async function renderPost(post: Post) {
  const wordCount = post.content.trim().split(/\s+/).length;
  return (
    <div className="flex flex-col gap-4">
      <a
        className="
        text-2xl
        underline
        underline-offset-8
        decoration-1
        decoration-green-500
        hover:text-green-400
        hover:dark:text-green-200
        dark:decoration-green-200
        "
        href={`/posts/${post.slug}`}
      >
        {post.title}
      </a>
      <div>
        <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        <p>
          [...{" "}
          <a
            className="
            underline
            underline-offset-2
            decoration-1
            decoration-green-500
            hover:text-green-400
            hover:dark:text-green-200
            dark:decoration-green-200
            "
            href={`/posts/${post.slug}`}
          >
            {wordCount} words
          </a>
          ]
        </p>
      </div>
      {renderFoot(post)}
    </div>
  );
}

async function renderThought(thought: Thought) {
  return (
    <div className="flex flex-col gap-4">
      <div dangerouslySetInnerHTML={{ __html: thought.content }} />
      {renderFoot(thought)}
    </div>
  );
}

async function renderDate(date: Date) {
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getUTCFullYear();
  return (
    <div>
      {/* Shown in small screens */}
      <div className="md:hidden flex flex-row justify-center items-center gap-2">
        <h2 className="text-4xl font-bold text-center">{day}</h2>
        <div className="flex-col items-left">
          <p className="text-xs text-left">{month}</p>
          <p className="text-xs text-left">{year}</p>
        </div>
      </div>
      {/* Shown in large screens */}
      <div className="md:flex hidden flex-col">
        <h2 className="text-4xl font-bold text-center">{day}</h2>
        <p className="text-xs text-center">
          {month} {year}
        </p>
      </div>
    </div>
  );
}

export default async function Day({ date, posts }: Props) {
  return (
    <div className="flex gap-4 pt-4 pb-4 border-b-2">
      <div className="hidden md:block">{renderDate(date)}</div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="md:hidden">{renderDate(date)}</div>
        {posts.flatMap((p: Post | Thought, i) => [
          isPost(p) ? renderPost(p) : renderThought(p),
          // We add a divider between posts and thoughts
          i < posts.length - 1 && (
            <div key={i} className="text-center">
              ꩜
            </div>
          ),
        ])}
      </div>
    </div>
  );
}
