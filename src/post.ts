import { retrieve, store } from "./utils/storeToLocal.js";
import { getPost } from "./utils/post.js";
import { POST } from "./models/post.js";
import { USER } from "./models/user.js";
import { getUser, getUserloggedInDetails } from "./utils/user.js";

// Get post id
const id = retrieve("currentPost");

// localStorage.removeItem("currentPost");

window.addEventListener("load", async () => {
  const postDetails: POST = await getPost(id);
  const userDetails: USER = await getUser(postDetails.userId);
  const loggedinUser: USER = await getUserloggedInDetails();

  const postContainer = document.querySelector("#post-details") as HTMLElement;

  let canUpdate: boolean = false;

  if (loggedinUser !== undefined) {
    if (loggedinUser.id === postDetails.userId) {
      canUpdate = true;
    } else canUpdate = false;
  }

  const post = `
        <h3>${postDetails.title}</h3>
        <div class="author-details">
          <p> Published by <em> ${
            userDetails === undefined ? "anonymous" : userDetails.username
          } </em></p>

          <div class="actions">${
            // userDetails.id === postDetails.userId           ?
            // ` <p calss="edit">Edit</p> <p class="delete">Delete</p>`
            // : null

            canUpdate
              ? ` <p calss="edit">Edit</p> <p class="delete">Delete</p>`
              : ""
          }</div>
        </div>
        <p>${postDetails.body}</p>


  `;

  postContainer.innerHTML = post;

  if (document.querySelector(".delete")) {
    (document.querySelector(".delete") as HTMLElement).addEventListener(
      "click",
      () => handlePostDelete(postDetails.id)
    );
  }
});
const handlePostDelete = async (id: string): Promise<any> => {
  console.log("delete", id);

  const posts = await retrieve("posts");

  const filtered = await posts.filter((post: POST) => post.id !== id);
  console.log(filtered);

  await store("posts", filtered);

  localStorage.removeItem("currentPost");

  location.href = "../blogs";
};
