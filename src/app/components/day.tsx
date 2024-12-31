import type { Post, Thought } from "@/app/lib/posts";
import Footer from "@/app/components/post-footer";

interface Props {
  date: Date;
  posts: (Post | Thought)[];
}

function isPost(post: Post | Thought): post is Post {
  return "title" in post;
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
          [
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
            {wordCount} words ↪
          </a>
          ]
        </p>
      </div>
      <Footer post={post} />
    </div>
  );
}

async function renderThought(thought: Thought) {
  return (
    <div className="flex flex-col gap-4">
      <div dangerouslySetInnerHTML={{ __html: thought.content }} />
      <Footer post={thought} />
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
    <div className="flex gap-4 pt-8 pb-4">
      <div className="hidden md:block">{renderDate(date)}</div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="md:hidden">{renderDate(date)}</div>
        {posts.flatMap((p: Post | Thought, i) => [
          isPost(p) ? renderPost(p) : renderThought(p),
          // We add a divider between posts and thoughts
          i < posts.length - 1 && (
            <div key={i} className="text-center select-none">
              ꩜
            </div>
          ),
        ])}
      </div>
    </div>
  );
}
