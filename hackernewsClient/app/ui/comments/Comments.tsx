'use client';

import React, { useRef, useState } from 'react';
import { IComment, IPost } from '@/app/lib/definitions';
import Image from 'next/image';
import { formatDate } from '@/app/lib/utils/formatDate';
import { addCommentToPost, addReplayToComment } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import Notification from '@/app/ui/notification/Notification';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface ICommentsProps {
  comments: IComment[];
  post: IPost;
  userEmail: string | null | undefined;
}

const Comments = ({ comments, post, userEmail }: ICommentsProps) => {
  const [comment, setComment] = useState<string>('');
  const router = useRouter();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [replyId, setReplyId] = useState<number | null>(null);

  const handleReply = (name: string, commentId: number) => {
    setComment(`${name}, id ${commentId}`);
    setReplyId(commentId);

    inputRef.current?.focus();
  };

  const handeSendComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userEmail) {
      if (replyId) {
        addReplayToComment({
          content: comment,
          userEmail,
          replyId: replyId,
          postSlug: post.urlSlug,
        });

        setReplyId(null);
      } else {
        addCommentToPost({
          content: comment,
          userEmail,
          postId: post.id,
          postSlug: post.urlSlug,
        });
      }

      setShowNotification(true);
      setComment('');
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } else {
      router.push('/login');
    }

    setComment('');
  };

  return (
    <section className="mx-auto mt-4 max-w-2xl px-6 lg:mx-0 lg:max-w-none lg:px-8">
      {showNotification && <Notification content={'Comment Sent!'} />}
      <div className="mx-auto lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
            Discussion (20)
          </h2>
        </div>

        <form className="mb-6">
          <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              ref={inputRef}
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            onClick={handeSendComment}
            className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
          >
            Post comment
          </button>
        </form>

        {comments.map((comment, index) => (
          <article key={index} className="p mb-8 rounded-lg text-base">
            <footer className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <div className="flex items-center">
                  <div className="relative me-3 h-6 w-6">
                    <Image
                      src={`${URL}/images/${comment.userAvatar}`}
                      alt={'profile picture'}
                      className="rounded-full bg-gray-50"
                      fill
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {comment.userName}
                  </h3>
                </div>
                <time className="hidden text-center text-sm text-gray-500 sm:block">
                  {formatDate(comment.dataCreated)}
                </time>
              </div>
            </footer>

            <p className="text-gray-500 dark:text-gray-400">
              {comment.content}
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  handleReply(comment.userName, comment.id);
                }}
                className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  className="mr-1.5 h-3.5 w-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                </svg>
                Reply
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Comments;
