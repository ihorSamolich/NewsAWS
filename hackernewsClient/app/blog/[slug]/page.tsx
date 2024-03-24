import React from 'react';
import { fetchCommentToPostBySlug, fetchPostBySlug } from '@/app/lib/data';
import { IComment, IPost } from '@/app/lib/definitions';
import { formatDate } from '@/app/lib/utils/formatDate';
import Link from 'next/link';
import Image from 'next/image';
import Comments from '@/app/ui/comments/Comments';
import { auth } from '@/auth';
import Notification from '@/app/ui/notification/Notification';
const URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function BlogSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: IPost = await fetchPostBySlug(params.slug);

  const comments: IComment[] = await fetchCommentToPostBySlug(params.slug);
  const session = await auth();

  return (
    <main>
      <div className="py-10 sm:py-12">
        <div className="mx-auto max-w-2xl px-6 lg:mx-0 lg:max-w-none lg:px-8">
          <div className="lg:mx-auto lg:w-full lg:gap-x-8 lg:px-8">
            <div>
              <div>
                <div className="block items-center  gap-x-4 text-xs sm:flex">
                  <time className="me-3 text-gray-500 sm:me-0">
                    {formatDate(post.postedOn)}
                  </time>
                  <Link
                    href={'#'}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.name}
                  </Link>
                  <div className="mt-3 flex items-center sm:mt-0">
                    <div className="relative me-3 h-7 w-7">
                      <Image
                        src={`${URL}/images/${post.user.image}`}
                        alt={'profile picture'}
                        className="rounded-full bg-gray-50"
                        fill
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-4 tracking-tight text-gray-900">
                        {post.user.name}
                      </h3>
                      <p className="text-gray-400">Publisher</p>
                    </div>
                  </div>
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg leading-8 text-gray-500">
                  {post.shortDescription}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 text-xs">
                  {post.tags.map((tag, index) => (
                    <Link key={index} href={'#'}>
                      <span className="inline-flex items-center rounded-lg bg-green-50 px-4 py-1 text-xs font-bold text-green-900 ring-1 ring-inset ring-green-600/20">
                        #{tag.name}
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="text-md mt-4 leading-6 text-black">
                  {post.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comments
        post={post}
        comments={comments}
        userEmail={session?.user?.email}
      />
    </main>
  );
}
