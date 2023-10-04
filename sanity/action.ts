import { groq } from "next-sanity";
import { readClient, writeClient } from "./lib/client";
import { buildQuery } from "./utils";

interface GetResourcesParams {
  query: string;
  tags: string;
  page: string; //pagination
}

export const getResources = async (params: GetResourcesParams) => {
  // destructure the params
  const { query, tags, page } = params;

  try {
    const resources = await readClient.fetch(
      groq`${buildQuery({
        type: "resource",
        query,
        tags,
        page: parseInt(page),
      })}{
        _id,
        title,
        slug,
        readingTime,
        views,
        releaseDate,
        overview,
        "image": poster.asset->url,
        tags,
        content,
      }`
    );

    return resources;
  } catch (error) {
    console.error(error);
  }
};

export async function incrementViews(blogId: string): Promise<number> {
  try {
    const currentViewsQuery = groq`*[_type == "resource" && _id == $blogId][0].views`;
    const currentViews = await readClient.fetch<number>(currentViewsQuery, {
      blogId,
    });

    const updatedViews = currentViews + 1;

    const patchOperation = {
      set: {
        views: updatedViews,
      },
    };

    await writeClient.transaction().patch(blogId, patchOperation).commit();

    return updatedViews;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
