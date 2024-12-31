import { getBlogContent, Post, Thought } from "@/app/lib/posts";
import Day from "@/app/components/day";
import { groupByDay } from "@/app/lib/datetime";

export default async function Home() {
  const { posts, thoughts } = await getBlogContent();
  const { days, sortedDates } = groupByDay([...posts, ...thoughts]);

  return (
    <div className="pt-4 divide-y-2 dark:divide-gray-800">
      {sortedDates.map((d) => (
        <Day
          key={d.toDateString()}
          date={d}
          posts={days.get(d.toDateString()) || []}
        />
      ))}
    </div>
  );
}
