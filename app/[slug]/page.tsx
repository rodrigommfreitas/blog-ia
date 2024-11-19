import {
  formatDate,
  getAllPostsSlugs,
  getPostBySlug,
  validateSlug,
} from "@/src/utils/mdx";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = getAllPostsSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const postExists = validateSlug(params.slug);

  if (!postExists) {
    return {
      title: "404",
      description: "404",
    };
  }

  const { frontmatter } = getPostBySlug(params.slug);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const postExists = validateSlug(params.slug);
  if (!postExists) {
    redirect("/");
  }

  const { frontmatter, content } = getPostBySlug(params.slug);

  return (
    <article className="post py-32">
      <div className="mb-12">
        <h1 className="blue-gradient !mb-1 w-fit !text-4xl !font-black sm:!text-5xl">
          {frontmatter.title}
        </h1>
        <time className="text-color text-sm">{frontmatter.date}</time>
      </div>

      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "catppuccin-mocha",
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
