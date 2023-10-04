import { getResources } from "@/sanity/action";
import { format } from "date-fns";
import Image from "next/image";

const BlockContent = require("@sanity/block-content-to-react");

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const resource = await getResources({
    query: params.slug,
    tags: "",
    page: "1",
  });

  return (
    <main className='min-h-screen max-w-7xl m-auto p-8'>
      <Image
        src={resource[0].image}
        alt='Photo taken from Unsplash'
        width={1200}
        height={480}
        priority={true}
        className='rounded-lg'
      />
      <h1 className='mt-5 text-2xl font-bold md:text-4xl'>
        {resource[0].title}
      </h1>
      <p className='mb-5 text-sm font-bold'>
        Written on {format(new Date(resource[0].releaseDate), "MMMM dd, yyyy")}{" "}
        by Andre Avindra
      </p>
      <div className='flex gap-4 mb-8'>
        <span className='gradient__text'>{resource[0].readingTime}</span>
        {resource[0].views?.toLocaleString() ?? "0"} views
      </div>

      <BlockContent
        blocks={resource[0].content}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      />
    </main>
  );
}
