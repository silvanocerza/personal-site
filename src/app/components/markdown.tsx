import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import Image from "next/image";

// Every component receives a node prop, that is the original
// Element from hast, the library that create the AST of the document.
// If we don't remove it all components will end up with a node="[object Object]"
// key in the HTML. That's ugly, consumes more data and useless, so we remove this
// property.
// See react-markdown docs for more info:
// https://github.com/remarkjs/react-markdown?tab=readme-ov-file#appendix-b-components
// We can't the type of every property, it's fine using any here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterNodeProp = (props: { [key: string]: any }) => {
  // We're ignoring that variable on purpose to remove it from the list of properties
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { node, ...otherProps } = props;
  return otherProps;
};

const a = ({ children, ...props }: { children: React.ReactNode }) => {
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
      {...filterNodeProp(props)}
    >
      {children}
    </a>
  );
};

const p = ({ children, ...props }: { children: React.ReactNode }) => {
  // If we don't do this paragraphs that contain only text will be centered by default
  // and we don't want that.
  const childArray = Array.isArray(children) ? children : [children];
  const hasNonTextOrLink = childArray.some(
    (child) =>
      !(
        typeof child === "string" ||
        (child && child.type === a) ||
        child.type === code
      ),
  );
  const selfCenter = hasNonTextOrLink ? " self-center" : "";
  return (
    <p className={`w-fit${selfCenter}`} {...filterNodeProp(props)}>
      {children}
    </p>
  );
};

const ol = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <ol className="w-fit list-decimal list-inside" {...filterNodeProp(props)}>
      {children}
    </ol>
  );
};

const ul = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <ul className="w-fit list-disc list-inside" {...filterNodeProp(props)}>
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
      {...filterNodeProp(props)}
    />
  );
};

const h1 = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-2xl" {...filterNodeProp(props)}>
      {children}
    </h2>
  );
};

const h2 = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-xl" {...filterNodeProp(props)}>
      {children}
    </h2>
  );
};

const h3 = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-lg" {...filterNodeProp(props)}>
      {children}
    </h2>
  );
};

const blockquote = ({ children, ...props }: { children: React.ReactNode }) => {
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
      {...filterNodeProp(props)}
    >
      {children}
    </blockquote>
  );
};

const table = ({ children, ...props }: { children: React.ReactNode }) => {
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
        {...filterNodeProp(props)}
      >
        {children}
      </table>
    </div>
  );
};

const thead = ({ children, ...props }: { children: React.ReactNode }) => {
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
      {...filterNodeProp(props)}
    >
      {children}
    </thead>
  );
};

const tbody = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <tbody
      className="
      text-sm
      border-b
      border-slate-400
      dark:border-slate-700"
      {...filterNodeProp(props)}
    >
      {children}
    </tbody>
  );
};

const th = ({ children, ...props }: { children: React.ReactNode }) => {
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
      {...filterNodeProp(props)}
    >
      {children}
    </th>
  );
};

const td = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <td
      className="
      px-4
      py-2
      text-sm
      border
      border-slate-400
      dark:border-slate-700"
      {...filterNodeProp(props)}
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
  children: React.ReactNode;
}) => {
  const match = /language-(\w+)/.exec(className || "");

  return !inline && match ? (
    <SyntaxHighlighter
      style={xonokai}
      PreTag="div"
      showLineNumbers={true}
      language={match[1]}
      {...filterNodeProp(props)}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code
      className={`
      text-[85%]
      px-1
      py-0.5
      rounded
      bg-gray-400/20
      ${className}
      `}
      {...filterNodeProp(props)}
    >
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
      {...filterNodeProp(props)}
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
