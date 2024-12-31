import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { ReactNode } from "react";

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

const table = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <table
        className="table-auto
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

export default async function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: h1,
        h2: h2,
        h3: h3,
        table: table,
        thead: thead,
        tbody: tbody,
        th: th,
        td: td,
        code: code,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
