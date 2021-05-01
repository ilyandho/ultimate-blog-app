import { POST } from "./models/post.js";
import { createPost } from "./utils/post.js";
import { store } from "./utils/storeToLocal.js";
import { getUserloggedIn } from "./utils/user.js";
import uuid from "./utils/uuid.js";

if (getUserloggedIn()) {
  const articleForm = document.querySelector(".article");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const contents = e.target.content.value;

    let rawPost = {
      title,
      body: contents,
      id: uuid(),
    };

    const newPost: POST = await createPost(rawPost);

    await store("currentPost", newPost.id);

    location.href = "../post";
  };

  articleForm?.addEventListener("submit", (e) => handleSubmit(e));
} else window.location.href = "../";
