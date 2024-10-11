import { BlogPostList } from "./_components/blog-post-list";

export default async function Page() {
  return (
    <>
      <h1 className="heading pt-32 text-center">
        Blog de <span className="blue-gradient">Inteligência Artificial</span>
      </h1>
      <p className="text-color mb-12 mt-6 text-center sm:mb-16 sm:text-lg">
        Blog relativo ao projeto do Grupo 6 da disciplina de Inteligência
        Artificial.
      </p>
      <BlogPostList />
    </>
  );
}
