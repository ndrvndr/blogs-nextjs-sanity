import BlogCard from "@/components/BlogCard";
import { getResources } from "@/sanity/action";

export default async function Home() {
  const resources = await getResources({
    query: "",
    tags: "",
    page: "1",
  });

  return (
    <main className='min-h-screen max-w-7xl m-auto p-8'>
      <ul className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {resources.map((resource: ResourceItem) => (
          <BlogCard key={resource._id} resource={resource} />
        ))}
      </ul>
    </main>
  );
}

export interface ResourceItem {
  releaseDate: string;
  overview: string;
  tags: Array<string>;
  _id: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  readingTime: string;
  views: number;
  image: string;
  content: any;
}
