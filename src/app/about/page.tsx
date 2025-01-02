import path from "path";
import fs from "fs";
import Markdown from "../components/markdown";

export default async function About() {
  const aboutFile = path.join("content", "about.md");
  const content = fs.readFileSync(aboutFile, "utf-8");

  return (
    <div className="flex flex-col gap-4">
      <Markdown>{content}</Markdown>
    </div>
  );
}
