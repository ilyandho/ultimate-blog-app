interface POST {
  userId: string;
  id: string;
  title: string;
  body: string;
  comments: string[];
}

interface COMMENT {
  id: string;
  text: string;
  postId: string;
  userId: string;
}
export { POST };
