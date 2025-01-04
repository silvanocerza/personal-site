import path from "path";
import fs from "fs";
import Markdown from "../components/markdown";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const aboutFile = path.join("content", "about.md");
  let content = "";
  if (fs.existsSync(aboutFile)) {
    content = fs.readFileSync(aboutFile, "utf-8");
  }

  return (
    <div className="flex flex-col gap-4">
      <Markdown>{content}</Markdown>
    </div>
  );
}
