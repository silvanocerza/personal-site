import fs from "fs";
import path from "path";
import os from "os";
import { globSync } from "glob";
import { spawnSync } from "child_process";

const SOURCE_REPO = "https://github.com/silvanocerza/blog-sources.git";

const cloneRepo = (url: string, dir: string) => {
  const res = spawnSync("git", ["clone", "--depth", "1", url, dir]);
  if (res.status !== 0) {
    throw new Error(`Failed to clone repository: ${res.stderr}`);
  }
};

(async function fetchSources() {
  const root = path.dirname(__filename);
  const content_dir = path.join(root, "content");
  const temp_dir = path.join(os.tmpdir(), "blog-sources");
  cloneRepo(SOURCE_REPO, temp_dir);

  fs.renameSync(path.join(temp_dir, "content"), content_dir);
  fs.rmSync(temp_dir, { recursive: true });

  const files = globSync("content/**/*.*", { nodir: true });
  const nonMarkdownFiles = files.filter((f) => !f.endsWith(".md"));

  nonMarkdownFiles.forEach((file: string) => {
    const relativePath = path.relative("content/posts", file);
    const targetPath = path.join("public", relativePath);

    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.renameSync(file, targetPath);
  });
})();
