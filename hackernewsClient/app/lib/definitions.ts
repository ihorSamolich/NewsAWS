export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};

export type UserPost = {
  name: string;
  image: string;
};

export interface ICategory {
  id: number;
  name: string;
  urlSlug: string;
  description: string;
}

export interface ITag {
  id: number;
  name: string;
  urlSlug: string;
  description: string;
}

export interface IPost {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  meta: string;
  urlSlug: string;
  published: boolean;
  postedOn: Date;
  modified?: Date;
  category: ICategory;
  user: UserPost;
  tags: ITag[];
}

export interface IComment {
  id: number;
  content: string;
  userName: string;
  userAvatar: string;
  dataCreated: Date;
}

export interface ICreateComment {
  postId?: number;
  replyId?: number;
  content: string;
  userEmail: string;
  postSlug: string;
}

// export interface IPostCreate {
//   title: string;
//   shortDescription: string;
//   description: string;
//   meta: string;
//   categoryId: number;
//   tags?: string[];
// }
