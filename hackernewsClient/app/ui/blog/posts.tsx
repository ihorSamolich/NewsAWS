import { fetchPosts } from '@/app/lib/data';
import { IPost } from '@/app/lib/definitions';
import Link from 'next/link';
import { formatDate } from '@/app/lib/utils/formatDate';
import Image from 'next/image';
import React from 'react';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function PostsWrapper({
  currentPage,
}: {
  currentPage: number;
}) {
  const posts: IPost[] = await fetchPosts(currentPage);

  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}

export async function Card({ post }: { post: IPost }) {
  return (
    <article
      key={post.id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time className="text-gray-500">{formatDate(post.postedOn)}</time>
        <Link
          href={'#'}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {post.category.name}
        </Link>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={`/blog/${post.urlSlug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {post.shortDescription}
        </p>
      </div>
      <div className="relative mt-4 flex items-center gap-x-4">
        <div className="relative me-3 h-10 w-10">
          <Image
            src={`${URL}/images/${post.user.image}`}
            alt={'profile picture'}
            className="rounded-full bg-gray-50"
            fill
          />
        </div>

        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <Link href={'#'}>
              <span className="absolute inset-0" />
              {post.user.name}
            </Link>
          </p>
          <p className="text-gray-600">Publisher</p>
        </div>
      </div>
    </article>
  );
}
