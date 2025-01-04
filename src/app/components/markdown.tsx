import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import Image from "next/image";

const a = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <a
      className="
      underline
      underline-offset-2
      decoration-1
      decoration-green-500
      hover:text-green-400
      hover:dark:text-green-200
      dark:decoration-green-200"
      {...props}
    >
      {children}
    </a>
  );
};

const p = ({ children, ...props }: { children: React.ReactNode }) => {
  // If we don't do this paragraphs that contain only text will be centered by default
  // and we don't want that.
  const childArray = React.Children.toArray(children);
  const hasNonTextOrLink = childArray.some(
    (child) =>
      !(
        typeof child === "string" ||
        (React.isValidElement(child) && child.type.name === "a")
      ),
  );
  const selfCenter = hasNonTextOrLink ? "self-center" : "";
  return (
    <p className={`w-fit ${selfCenter}`} {...props}>
      {children}
    </p>
  );
};

const ol = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <ol className="w-fit list-decimal list-inside" {...props}>
      {children}
    </ol>
  );
};

const ul = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <ul className="w-fit list-disc list-inside" {...props}>
      {children}
    </ul>
  );
};

const hr = ({ ...props }) => {
  return (
    <hr
      className="
      border-t
      border-slate-400
      dark:border-slate-700"
      {...props}
    />
  );
};

const h1 = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <h2 className="text-2xl" {...props}>
      {children}
    </h2>
  );
};

const h2 = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <h2 className="text-xl" {...props}>
      {children}
    </h2>
  );
};

const h3 = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <h2 className="text-lg" {...props}>
      {children}
    </h2>
  );
};

const blockquote = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <blockquote
      className="
      pl-6
      my-4
      italic
      text-slate-700
      dark:text-slate-300
      border-l-4
      border-slate-400
      dark:border-slate-700
      bg-slate-100
      dark:bg-slate-800
      py-2
      px-4
      rounded"
      {...props}
    >
      {children}
    </blockquote>
  );
};

const table = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <table
        className="
        table-auto
        border-collapse
        border
        w-fit
        min-w-0
        whitespace-nowrap
        border-slate-400
        dark:border-slate-700"
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

const thead = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <thead
      className="
      text-left
      text-xs
      font-semibold
      uppercase
      tracking-wider
      border-b
      border-slate-400
      dark:border-slate-700"
      {...props}
    >
      {children}
    </thead>
  );
};

const tbody = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <tbody
      className="
      text-sm
      border-b
      border-slate-400
      dark:border-slate-700"
      {...props}
    >
      {children}
    </tbody>
  );
};

const th = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <th
      className="
      px-4
      py-2
      text-left
      text-sm
      font-semibold
      uppercase
      tracking-wider
      border
      border-slate-400
      dark:border-slate-700"
      {...props}
    >
      {children}
    </th>
  );
};

const td = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <td
      className="
      px-4
      py-2
      text-sm
      border
      border-slate-400
      dark:border-slate-700"
      {...props}
    >
      {children}
    </td>
  );
};

const code = ({
  inline,
  className,
  children,
  ...props
}: {
  inline: boolean;
  className: string;
  children: ReactNode;
}) => {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <SyntaxHighlighter
      style={xonokai}
      PreTag="div"
      showLineNumbers={true}
      language={match[1]}
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const img = async ({ src, alt, ...props }: { src: string; alt: string }) => {
  // Markdown files might reference images with a leading "./".
  // This is a problem for Next.js as it would search for the image in the
  // path relative to the html page referencing it.
  // If we remove the leading "." it will instead search for the image using
  // the path relative to the main endpoint. Since we store the images in the
  // public folder, this will work as that folder is served relative to the root.
  if (src.startsWith("./")) {
    src = src.replace("./", "/");
  }

  return (
    <Image
      className="w-fit"
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "auto", height: "auto" }}
      {...props}
    />
  );
};

export default async function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: a,
        p: p,
        ol: ol,
        ul: ul,
        hr: hr,
        h1: h1,
        h2: h2,
        h3: h3,
        blockquote: blockquote,
        table: table,
        thead: thead,
        tbody: tbody,
        th: th,
        td: td,
        code: code,
        img: img,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
