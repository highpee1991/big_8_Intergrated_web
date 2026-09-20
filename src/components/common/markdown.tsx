// src/components/common/markdown.tsx
//
// Renders Markdown (bold, bullet/numbered lists, italics, paragraphs) using
// the site's own design tokens instead of react-markdown's unstyled
// defaults. Used for product descriptions — admins write **bold** and
// "* bullet" lists in the admin form's Description field exactly like any
// other Markdown, and this is what actually turns that into real
// formatting instead of showing literal asterisks.
import ReactMarkdown from "react-markdown";

export interface MarkdownProps {
  children: string;
  className?: string;
}

function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="text-ink-muted mb-3 text-sm leading-relaxed last:mb-0">{children}</p>
          ),
          strong: ({ children }) => <strong className="text-ink font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="text-ink-muted mb-3 list-disc space-y-1 pl-5 text-sm leading-relaxed last:mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="text-ink-muted mb-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed last:mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ children, href }) => (
            <a href={href} className="text-primary underline underline-offset-2">
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export { Markdown };
