import { POST } from "./models/post.js";
import { createPost } from "./utils/post.js";
import { getUserloggedIn } from "./utils/user.js";
import uuid from "./utils/uuid.js";

if (getUserloggedIn()) {
  const articleForm = document.querySelector(".article");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const contents = e.target.content.value;

    console.log(title, contents);

    let rawPost = {
      title,
      body: contents,
      id: uuid(),
    };

    const newPost: POST = await createPost(rawPost);

    location.href = "../blogs?id=" + newPost.id;
  };

  articleForm?.addEventListener("submit", (e) => handleSubmit(e));
} else window.location.href = "../";
