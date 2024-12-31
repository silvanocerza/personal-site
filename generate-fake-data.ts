import fs from "fs";
import path from "path";

const data = {
  posts: [
    {
      slug: "future-of-typescript",
      title: "The Future of TypeScript: What's Next",
      date: "2024-01-15T09:30:21+02:00",
      content: `TypeScript continues to reshape how we write JavaScript, bringing powerful type safety and developer tools to the ecosystem. Let's explore some of the most exciting features coming to TypeScript and what they mean for developers.

  <!--more-->

  ## Type System Improvements

  The upcoming version introduces more powerful template literal types:

  \`\`\`typescript
  type Routes = '/users' | '/posts' | '/comments';
  type GET<T extends string> = \`GET \${T}\`;
  type POST<T extends string> = \`POST \${T}\`;

  // Results in: "GET /users" | "GET /posts" | "GET /comments"
  type GETRoutes = GET<Routes>;
  \`\`\`

  ## Performance Enhancements

  The TypeScript team has been working on compiler performance:

  \`\`\`typescript
  // Before: Slow type inference
  const result = someArray
    .map(x => x + 1)
    .filter(x => x > 0)
    .reduce((acc, val) => acc + val, 0);

  // After: Optimized type flow analysis
  const result = someArray.reduce((acc, x) => {
    const mapped = x + 1;
    return mapped > 0 ? acc + mapped : acc;
  }, 0);
  \`\`\`

  ## Developer Experience

  New error messages are more contextual and helpful:

  \`\`\`typescript
  interface User {
    name: string;
    age: number;
  }

  // Better error messages for common mistakes
  const user: User = {
    name: "John",
    age: "42", // Clear error explaining number vs string mismatch
  };
  \`\`\`

  The future of TypeScript looks promising with these improvements in type safety, performance, and developer experience.`,
      tags: ["typescript", "javascript", "programming-languages"],
    },
    {
      slug: "rust-vs-go",
      title: "Rust vs Go: Systems Programming Showdown",
      date: "2024-01-15T14:22:33+02:00",
      content: `When it comes to modern systems programming, Rust and Go stand out as two popular choices. Both offer unique approaches to common problems, but with different trade-offs and philosophies.

  <!--more-->

  ## Memory Management

  ### Rust's Ownership Model

  \`\`\`rust
  fn main() {
      let mut s = String::from("hello");
      process_string(&mut s); // Borrowing
      println!("{}", s); // Still valid here
  }

  fn process_string(s: &mut String) {
      s.push_str(" world");
  }
  \`\`\`

  ### Go's Garbage Collection

  \`\`\`go
  func main() {
      s := "hello"
      processed := processString(s)
      fmt.Println(processed)
  }

  func processString(s string) string {
      return s + " world"
  }
  \`\`\`

  ## Concurrency Models

  ### Rust's Threads and Channels

  \`\`\`rust
  use std::sync::mpsc;
  use std::thread;

  fn main() {
      let (tx, rx) = mpsc::channel();

      thread::spawn(move || {
          tx.send("Hello from thread!").unwrap();
      });

      println!("{}", rx.recv().unwrap());
  }
  \`\`\`

  ### Go's Goroutines

  \`\`\`go
  func main() {
      ch := make(chan string)

      go func() {
          ch <- "Hello from goroutine!"
      }()

      fmt.Println(<-ch)
  }
  \`\`\`

  Each language has its sweet spot, and choosing between them often depends on specific project requirements and constraints.`,
      tags: ["rust", "golang", "systems-programming", "performance"],
    },
    {
      slug: "distributed-tracing",
      title: "Implementing Distributed Tracing at Scale",
      date: "2023-12-10T11:15:00+02:00",
      content: `Distributed tracing has become essential for understanding complex microservices architectures. Here's what we learned implementing it across our organization.

  <!--more-->

  ## Implementation with OpenTelemetry

  Here's a basic Express middleware example:

  \`\`\`typescript
  import { trace } from '@opentelemetry/api';
  import express from 'express';

  const app = express();

  app.use((req, res, next) => {
    const span = trace.getTracer('http').startSpan('http_request');

    span.setAttribute('http.method', req.method);
    span.setAttribute('http.url', req.url);

    res.on('finish', () => {
      span.setAttribute('http.status_code', res.statusCode);
      span.end();
    });

    next();
  });
  \`\`\`

  ## Propagating Context

  Handling context across service boundaries:

  \`\`\`typescript
  async function makeDownstreamRequest(ctx: Context, url: string) {
    const span = trace.getTracer('http').startSpan('downstream_call', {}, ctx);

    try {
      const headers = {};
      propagator.inject(trace.setSpan(ctx, span), headers);

      const response = await fetch(url, { headers });
      return response;
    } finally {
      span.end();
    }
  }
  \`\`\`

  ## Sampling Strategies

  Implementing intelligent sampling:

  \`\`\`typescript
  const sampler = new ParentBasedSampler({
    root: new TraceIdRatioBased(0.1), // Sample 10% of traces
    remoteParentSampled: new AlwaysOn(),
    remoteParentNotSampled: new AlwaysOff(),
    localParentSampled: new AlwaysOn(),
    localParentNotSampled: new AlwaysOff(),
  });
  \`\`\`

  Proper instrumentation has given us unprecedented visibility into our distributed systems.`,
      tags: ["distributed-systems", "observability", "microservices"],
    },
  ],
  thoughts: [
    {
      slug: "ts-thought-1",
      title: null,
      date: "2024-01-15T16:45:12+02:00",
      content:
        "Just discovered a neat TypeScript trick with template literal types!",
      tags: ["typescript", "til"],
    },
    {
      slug: "docker-tip",
      title: null,
      date: "2024-01-14T08:30:00+02:00",
      content: "Pro tip: Use multi-stage builds to reduce Docker image size",
      tags: ["docker", "devops", "optimization"],
    },
    {
      slug: "vim-revelation",
      title: null,
      date: "2024-01-13T22:15:45+02:00",
      content: "After 5 years of Vim, I just learned about the 'gi' command",
      tags: ["vim", "til"],
    },
    {
      slug: "rust-moment",
      title: null,
      date: "2024-01-12T19:20:33+02:00",
      content:
        "Finally understood Rust's borrow checker. It all makes sense now!",
      tags: ["rust", "learning"],
    },
    {
      slug: "code-review",
      title: null,
      date: "2024-01-10T11:05:00+02:00",
      content:
        "Best code reviews are the ones where both parties learn something",
      tags: ["best-practices", "team"],
    },
    {
      slug: "linux-tip",
      title: null,
      date: "2024-01-10T14:30:21+02:00",
      content: "TIL about 'ctrl+r' in bash. Game changer for command history!",
      tags: ["linux", "cli", "til"],
    },
    {
      slug: "js-modules",
      title: null,
      date: "2024-01-08T09:45:00+02:00",
      content: "ES modules are great until you need to debug a bundler issue",
      tags: ["javascript", "tooling"],
    },
    {
      slug: "git-alias",
      title: null,
      date: "2024-01-05T16:20:00+02:00",
      content: "Just added some powerful git aliases to my dotfiles",
      tags: ["git", "productivity"],
    },
    {
      slug: "react-hooks",
      title: null,
      date: "2024-01-03T13:10:25+02:00",
      content: "useEffect dependencies array is both a blessing and a curse",
      tags: ["react", "javascript"],
    },
    {
      slug: "terminal-setup",
      title: null,
      date: "2024-01-01T10:00:00+02:00",
      content: "New year, new terminal customizations",
      tags: ["setup", "terminal", "productivity"],
    },
  ],
  talks: [
    {
      slug: "rust-for-js-devs",
      title: "Rust for JavaScript Developers",
      date: "2024-02-15T14:00:00+02:00",
      content: "Introduction to Rust from a JS developer's perspective",
      tags: ["rust", "javascript", "systems-programming"],
    },
    {
      slug: "microservices-patterns",
      title: "Microservices Patterns in Practice",
      date: "2024-01-20T15:30:00+02:00",
      content: "Real-world patterns and anti-patterns in microservices",
      tags: ["microservices", "architecture", "best-practices"],
    },
    {
      slug: "typescript-advanced",
      title: "Advanced TypeScript Patterns",
      date: "2023-12-05T16:45:00+02:00",
      content: "Deep dive into advanced TypeScript features and patterns",
      tags: ["typescript", "advanced", "patterns"],
    },
    {
      slug: "graphql-scale",
      title: "Scaling GraphQL in Production",
      date: "2023-11-10T13:20:00+02:00",
      content: "Lessons learned scaling GraphQL APIs in production",
      tags: ["graphql", "scaling", "api"],
    },
    {
      slug: "nodejs-performance",
      title: "Node.js Performance Tuning",
      date: "2023-10-01T11:00:00+02:00",
      content: "Optimizing Node.js applications for performance",
      tags: ["nodejs", "performance", "optimization"],
    },
  ],
};

(async function createFakeData() {
  const root = path.dirname(__filename);
  const content_dir = path.join(root, "content");

  // Ensure directories exist
  ["posts", "thoughts", "talks"].forEach((dir) => {
    fs.mkdirSync(path.join(content_dir, dir), { recursive: true });
  });

  // Generate files
  data.posts.forEach((post) => {
    const filepath = path.join(content_dir, "posts", `${post.slug}.md`);
    const content = `+++
title = "${post.title}"
date = "${post.date}"
tags = ${JSON.stringify(post.tags)}
+++

${post.content}`;
    fs.writeFileSync(filepath, content);
  });

  // Similar for thoughts and talks
  data.thoughts.forEach((thought) => {
    const filepath = path.join(content_dir, "thoughts", `${thought.slug}.md`);
    const content = `+++
date = "${thought.date}"
tags = ${JSON.stringify(thought.tags)}
+++

${thought.content}`;
    fs.writeFileSync(filepath, content);
  });

  data.talks.forEach((talk) => {
    const filepath = path.join(content_dir, "talks", `${talk.slug}.md`);
    const content = `+++
title = "${talk.title}"
date = "${talk.date}"
tags = ${JSON.stringify(talk.tags)}
+++

${talk.content}`;
    fs.writeFileSync(filepath, content);
  });
})();
