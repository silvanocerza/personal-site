import type { Post, Thought } from "@/app/lib/posts";

export function groupByDay(posts: (Post | Thought)[]): {
  days: Map<string, (Post | Thought)[]>;
  sortedDates: Date[];
} {
  // Group posts and thoughts by date
  const days = posts.reduce((acc: Map<string, (Post | Thought)[]>, post) => {
    const date = new Date(post.date).toDateString();
    const posts = acc.get(date);
    if (posts) {
      posts.push(post);
      acc.set(date, posts);
    } else {
      acc.set(date, [post]);
    }
    return acc;
  }, new Map());

  // Get a list of dates in descending order
  const sortedDates = [...days.keys()]
    .map((d) => new Date(d))
    .sort((a, b) => (b < a ? -1 : 1));

  return { days, sortedDates };
}
