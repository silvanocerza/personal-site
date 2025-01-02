import fs from "fs";
import path from "path";
import * as tar from "tar";
import os from "os";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { globSync } from "glob";

const SOURCE_REPO =
  "https://api.github.com/repos/silvanocerza/blog-sources/tarball";

(async function fetchSources() {
  const root = path.dirname(__filename);
  const content_dir = path.join(root, "content");
  const temp_dir = path.join(os.tmpdir(), "blog-sources");

  const response = await fetch(SOURCE_REPO);
  if (!response.ok || !response.body) {
    throw new Error(`Failed to fetch sources`);
  }

  fs.mkdirSync(temp_dir, { recursive: true });
  fs.rmSync(content_dir, { recursive: true, force: true });

  const stream = Readable.fromWeb(response.body as any);
  await pipeline(stream, tar.extract({ cwd: temp_dir, strip: 1 }));

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
