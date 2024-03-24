import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PostsWrapper, { Card } from '@/app/ui/blog/posts';
import PostsSkeleton from '@/app/ui/skeletons/PostsSkeleton';
import Pagination from '@/app/ui/pagination/Pagination';
import { fetchPostsPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'News',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPostsPages();

  return (
    <main>
      <div className="py-10 sm:py-12">
        <div className="mx-auto  max-w-7xl px-6 lg:px-8">
          <div className="mx-auto w-full lg:mx-0">
            <h2 className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
            <Suspense fallback={<PostsSkeleton />}>
              <PostsWrapper currentPage={currentPage} />
            </Suspense>
            <div className="mt-10 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
