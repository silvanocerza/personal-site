import Day from "@/app/components/day";
import { getBlogContent } from "@/app/lib/posts";
import { groupByDay } from "@/app/lib/datetime";

export async function generateStaticParams() {
  const { posts, thoughts } = await getBlogContent();

  const tags = [...posts, ...thoughts].flatMap((p) => p.tags);
  return [...new Set(tags)].map((tag) => ({ tag }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { posts, thoughts } = await getBlogContent();
  const { tag } = await params;

  const tagged = [...posts, ...thoughts].filter((p) =>
    p.tags.includes(decodeURIComponent(tag)),
  );

  if (tagged.length === 0) {
    throw new Error(`No post found with slug ${tag}`);
  }

  // Group posts and thoughts by date
  const { days, sortedDates } = groupByDay(tagged);

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
