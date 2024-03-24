'use server';

import {
  revalidatePath,
  revalidateTag,
  unstable_noStore as noStore,
} from 'next/cache';
import bcrypt from 'bcrypt';
import { ICreateComment } from '@/app/lib/definitions';

const URL = process.env.NEXT_PUBLIC_BASE_URL;

const ITEMS_PER_PAGE = 6;

export async function fetchPosts(currentPage: number) {
  noStore();

  try {
    const queryParams = {
      page: String(currentPage),
      pageSize: String(ITEMS_PER_PAGE),
      query: '',
    };

    const urlParams = new URLSearchParams(queryParams);
    const res = await fetch(`${URL}/api/blog/posts?${urlParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.log('Some fetch error!');
    }

    return res.json();
  } catch (error) {
    console.error('Sever Error:', error);
  }
}

export async function fetchPostsPages() {
  noStore();

  try {
    const response = await fetch(`${URL}/api/blog/posts-count`);

    if (!response.ok) {
      console.log('Some fetch error!');
    }

    const totalCount = await response.json();

    return Math.ceil(Number(totalCount / ITEMS_PER_PAGE));
  } catch (error) {
    console.error('Server Error:', error);
    return 1;
  }
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${URL}/api/blog/post/${slug}`);
  if (!res.ok) {
    throw new Error('Some fetch error!');
  }
  return res.json();
}

export async function fetchCommentToPostBySlug(slug: string) {
  const res = await fetch(`${URL}/api/comment/post/${slug}`, {
    next: { tags: ['comments'], revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error('Some fetch error!');
  }
  return res.json();
}

export async function addCommentToPost(comment: ICreateComment) {
  try {
    const response = await fetch(`${URL}/api/comment/add-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: comment.postId,
        content: comment.content,
        userEmail: comment.userEmail,
      }),
    });

    if (!response.ok) {
      console.error('Failed to add comment');
    } else {
      revalidateTag('collection');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function addReplayToComment(comment: ICreateComment) {
  try {
    const response = await fetch(`${URL}/api/comment/reply-to-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId: comment.replyId,
        content: comment.content,
        userEmail: comment.userEmail,
      }),
    });

    if (!response.ok) {
      console.error('Failed to add reply');
    } else {
      revalidateTag('collection');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
