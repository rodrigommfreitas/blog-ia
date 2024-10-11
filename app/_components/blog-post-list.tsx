"use server";

import { getAllPostsFrontmatter } from "@/src/utils/mdx";
import Link from "next/link";

export async function BlogPostList() {
  const posts = getAllPostsFrontmatter();

  return (
    <ul className="flex flex-col space-y-16">
      {posts.map((post) => (
        <Link href={`/${post.slug}`} key={post.slug}>
          <li>
            <h2 className="blue-gradient mb-1 w-fit text-3xl font-black sm:text-4xl">
              {post.frontmatter.title}
            </h2>
            <time className="text-color text-sm">{post.frontmatter.date}</time>
            <p className="text-color mt-2">{post.frontmatter.description}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
