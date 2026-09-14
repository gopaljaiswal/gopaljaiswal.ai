import type { ComponentProps } from "react";
import type { MDXProvider } from "@mdx-js/react";

export const mdxComponents: ComponentProps<typeof MDXProvider>["components"] = {
  a: (props) => (
    <a {...props} className="text-primary underline underline-offset-4 hover:no-underline" />
  ),
};
