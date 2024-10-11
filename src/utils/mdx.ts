import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "public/blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  [key: string]: any;
};

export type PostFrontmatterWithSlug = {
  frontmatter: PostFrontmatter;
  slug: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function validateSlug(slug: string): boolean {
  if (!fs.existsSync(path.join(contentDirectory, `${slug}.mdx`))) {
    return false;
  }
  return true;
}

function slugify(text: string): string {
  return text
    .toString() // Convert to string
    .normalize("NFD") // Normalize the string and separate diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single one
}

export function getAllPostsFrontmatter(): PostFrontmatterWithSlug[] {
  const files = fs.readdirSync(contentDirectory);

  return files.map((fileName) => {
    const filePath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = slugify(fileName.replace(/\.mdx?$/, ""));
    const formattedDate = formatDate(data.date);
    return {
      slug,
      frontmatter: {
        ...data,
        date: formattedDate,
      } as PostFrontmatter,
    };
  });
}

export function getAllPostsSlugs(): string[] {
  return getAllPostsFrontmatter().map(({ slug }) => slug);
}

export function getLatestPostsFrontmatter(
  count: number,
): PostFrontmatterWithSlug[] {
  return getAllPostsFrontmatter().slice(0, count);
}

export function getPostBySlug(slug: string): Omit<Post, "slug"> {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    throw new Error(`File not found: ${filePath}`);
  }
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const formattedDate = formatDate(data.date);

  return {
    frontmatter: { ...data, date: formattedDate } as PostFrontmatter,
    content,
  };
}
