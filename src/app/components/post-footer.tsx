import { Post, Thought } from "@/app/lib/posts";

type Props = {
  post: Post | Thought;
};

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

export default async function Footer({ post }: Props) {
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
      <p className="text-xs select-none">᯾</p>
      {renderTags(post.tags)}
    </div>
  );
}
