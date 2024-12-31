import { getBlogContent, Post, Thought } from "@/app/lib/posts";
import Day from "@/app/components/day";

export default async function Home() {
  const { posts, thoughts } = await getBlogContent();

  // Group posts and thoughts by date
  const days = [...posts, ...thoughts].reduce(
    (acc: Map<string, (Post | Thought)[]>, post) => {
      const date = new Date(post.date).toDateString();
      const posts = acc.get(date);
      if (posts) {
        posts.push(post);
        acc.set(date, posts);
      } else {
        acc.set(date, [post]);
      }
      return acc;
    },
    new Map(),
  );

  // Get a list of dates in descending order
  const sortedDates = [...days.keys()]
    .map((d) => new Date(d))
    .sort((a, b) => (b < a ? -1 : 1));

  return (
    <div className="pt-4 divide-y-2 dark:divide-gray-800">
      {sortedDates.map((d) => (
        <Day
          key={d.toDateString()}
          date={d}
          posts={days.get(d.toDateString())}
        />
      ))}
    </div>
  );
}
