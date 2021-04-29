import { POST } from "../models/post";
import { retrieve, store } from "./storeToLocal.js";

const createPost = async (postObj: any) => {
  // get current user
  const user = await retrieve("user", "{}");

  const posts = await retrieve("posts");

  let newPosts: POST[] = [];

  (postObj.userId = user.id), (newPosts = [postObj, ...posts]);

  await store("posts", newPosts);
};

export { createPost };
