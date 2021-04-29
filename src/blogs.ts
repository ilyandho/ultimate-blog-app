import USERDETAILS from "./models/userDetails";
import POST from "./models/post";
import USER from "./models/user";

import { store, retrieve } from "./utils/storeToLocal.js";

import posts from "./data/posts.js";
import logout from "./utils/logout.js";

if (retrieve("user")) {
  const user: USERDETAILS = retrieve("user", "{}");
  (document.querySelector(".username") as HTMLElement).innerText =
    user?.username;

  (document.querySelector(".fullname") as HTMLElement).innerText =
    user?.firstname + user?.lastname;
} else {
  window.location.href = "../";
}

(document.querySelector(".logout") as HTMLElement).addEventListener(
  "click",
  () => logout()
);

window.addEventListener("load", async () => {
  // Store the posts
  let postsArray: POST[] = [];
  const storedPosts: POST[] = await retrieve("posts");

  if (storedPosts.length === 0) {
    postsArray = [...posts];
  } else {
    postsArray = [...storedPosts];
  }

  await store("posts", postsArray);
  const localPosts: POST[] = await retrieve("posts");

  const users: USER[] = await retrieve("users");
  // create Elements for posts
  let postsElement: string = "";
  for (let i: number = 0; i < localPosts.length - 1; i++) {
    const preview: string = localPosts[i]?.body.substr(0, 100);

    const user: USER | undefined = users.find(
      (user) => user.id === localPosts[i].userId
    );

    postsElement += `
      <div class="post" id="${posts[i].id}">
        <h3>${posts[i].title}</h3>
        <p>${preview}</p>
        <div class="user">
          <img src="../public/images/beach.jpg"></img>

          <p>${
            user === undefined ? "Anonymous" : user?.username + user?.lastName
          }</p>

          <a id=${posts[i].id}>Read More</a>
        </div>
      </div>
    `;
  }

  (document.querySelector(".blogs") as HTMLElement).innerHTML += postsElement;
  document.querySelectorAll(".post").forEach((post) => {
    post.setAttribute("href", "somelink.php?id" + post.id);
  });
});
