import { retrieve } from "./utils/storeToLocal.js";
import { getPost } from "./utils/post.js";
import { POST } from "./models/post.js";
import { USER } from "./models/user.js";
import { getUser, getUserloggedIn } from "./utils/user.js";

// Get post id
const id = retrieve("currentPost");

// localStorage.removeItem("currentPost");

window.addEventListener("load", async () => {
  const postDetails: POST = await getPost(id);
  const userDetails: USER = await getUser(postDetails.userId);

  const postContainer = document.querySelector("#post-details") as HTMLElement;

  const post = `
        <h3>${postDetails.title}</h3>
        <div class="author-details">
          <p> Published by <em> ${
            userDetails === undefined ? "anonymous" : userDetails.username
          } </em></p>

          <div class="actions"> <p calss="edit">Edit</p> <p class="delete">Delete</p></div>
        </div>
        <p>${postDetails.body}</p>


  `;

  postContainer.innerHTML = post;
});
