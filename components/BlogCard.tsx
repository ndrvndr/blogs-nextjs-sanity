"use client";
import { ResourceItem } from "@/app/(root)/(home)/page";
import { incrementViews } from "@/sanity/action";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function BlogCard({ resource }: { resource: ResourceItem }) {
  const [localViews, setLocalViews] = useState(resource.views);

  const handleCardClick = async () => {
    try {
      const updateViews = await incrementViews(resource._id);

      setLocalViews(updateViews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className='h-full w-full rounded-md border border-solid border-black'>
      <Link href={resource.slug.current} onClick={handleCardClick}>
        <div className='relative'>
          <Image
            src={resource.image}
            alt='Photo taken from Unsplash'
            width={1200}
            height={480}
            className='h-auto w-auto rounded-t-md'
            priority={true}
          />

          <div className='absolute bottom-3 right-3 flex gap-1'>
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-md bg-white px-2 py-1 text-xs '
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className='p-4'>
          <h1 className='font-bold md:text-lg'>{resource.title}</h1>

          <div className='mt-2 flex gap-2 text-sm font-medium'>
            {resource.readingTime}
            <span>{localViews.toLocaleString() ?? "0"} views</span>
          </div>

          <p className='mb-2 mt-4 text-sm font-bold'>
            {format(new Date(resource.releaseDate), "MMMM dd, yyyy")}
          </p>

          <p className='text-sm'>{resource.overview}</p>
        </div>
      </Link>
    </li>
  );
}
