import { POST } from "../models/post.js";
import { retrieve, store } from "./storeToLocal.js";

const createPost = async (postObj: any): Promise<POST> => {
  // get current user
  const user = await retrieve("user", "{}");

  const posts = await retrieve("posts");

  let newPosts: POST[] = [];

  (postObj.userId = user.id), (newPosts = [postObj, ...posts]);

  await store("posts", newPosts);
  return postObj;
};

const getPost = async (id: string): Promise<POST> => {
  const posts = await retrieve("posts");
  const postDetails = await posts.find((post: POST) => post.id === id);
  return postDetails;
};

export { createPost, getPost };
