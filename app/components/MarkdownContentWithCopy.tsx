"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyButton from "./CopyButton";

interface MarkdownContentWithCopyProps {
  content: string;
}

export default function MarkdownContentWithCopy({ content }: MarkdownContentWithCopyProps) {
  return (
    <>
      <div className="flex justify-end mb-4">
        <CopyButton content={content} />
      </div>
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
    </>
  );
}
