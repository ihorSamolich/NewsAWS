import React from 'react';
import { Card } from '@/app/ui/blog/posts';

const PostsSkeleton = () => {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((_, index) => (
        <article
          key={index}
          className="mt-3 flex max-w-xl animate-pulse flex-col items-start justify-between"
        >
          <div className="flex items-center gap-x-4 text-xs">
            <div className="h-4 w-40 rounded bg-gray-200"></div>
            <div className="relative z-10 h-4 w-16 rounded bg-gray-200"></div>
          </div>
          <div className="group relative overflow-hidden">
            <div className="mt-3 h-5 w-80 rounded bg-gray-200"></div>
            <div className="mt-5 h-20 w-96 rounded bg-gray-200"></div>
          </div>
          <div className="relative mt-6 flex items-center gap-x-4">
            <div className="relative h-10 w-10 rounded-full bg-gray-200"></div>
            <div className="text-sm leading-6">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="mt-0.5 h-3 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default PostsSkeleton;
