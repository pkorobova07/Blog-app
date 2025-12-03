export type User = {
  id: string;
  username: string;
};

export type Tag = string;

export type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
};

export type CreatePostForm = {
  title: string;
  content: string;
  tags: string;
};

export type PostFilters = {
  tag: string;
};
