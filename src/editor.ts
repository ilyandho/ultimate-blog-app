import { POST } from "./models/post.js";
import { createPost } from "./utils/post.js";
import { retrieve, store } from "./utils/storeToLocal.js";
import { getUserloggedIn } from "./utils/user.js";
import uuid from "./utils/uuid.js";

if (getUserloggedIn()) {
  // Check if there is any article
  const article = retrieve("currentPost");
  console.log(article);

  const titleInput = document.querySelector("#title") as HTMLElement;
  const contentInput = document.querySelector("#content") as HTMLElement;

  if (article) {
    const posts = retrieve("posts");
    const postToEdit = posts.find((post: POST) => post.id === article);

    (<HTMLInputElement>titleInput).value = postToEdit.title;
    (<HTMLInputElement>contentInput).value = postToEdit.body;
  }

  const articleForm = document.querySelector(".article");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const contents = e.target.content.value;

    // If no article in localstorage, then create new article

    if (!article) {
      let rawPost = {
        title,
        body: contents,
        id: uuid(),
      };

      const newPost: POST = await createPost(rawPost);

      await store("currentPost", newPost.id);
    } else {
      const posts = retrieve("posts");
      let updatedPosts: POST[] = [];

      // const filteredPosts = posts.filter((post: POST) => post.id !== article);

      // console.log(filteredPosts);

      updatedPosts = await posts.map((post: POST) => {
        if (post.id === article) {
          post.title = title;
          post.body = contents;
        }

        return post;
      });

      await store("posts", updatedPosts);
    }
    location.href = "../post";
  };

  articleForm?.addEventListener("submit", (e) => handleSubmit(e));
} else window.location.href = "../";
