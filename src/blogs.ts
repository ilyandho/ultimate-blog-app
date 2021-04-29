import posts from "./data/posts.js";

import { store, retrieve } from "./utils/storeToLocal.js";

import { USER } from "./models/user.js";
import { POST } from "./models/post.js";
import { getUserDetails } from "./utils/user.js";

// Get user details and fill them in at the top if logged in
// Else redirect to signup page
if (getUserDetails()) {
  window.addEventListener("load", async () => {
    // Check if user is logged in
    const users: USER[] = await retrieve("users");
    // // Store the posts
    let postsArray: POST[] = [];
    // Check if there are any posts in the storage
    const storedPosts: POST[] = await retrieve("posts");

    if (storedPosts.length === 0) {
      postsArray = [...posts];
    } else {
      postsArray = [...storedPosts];
    }

    await store("posts", postsArray);
    const localPosts: POST[] = await retrieve("posts");

    // create Elements for posts
    let postsElement: string = "";
    for (let i: number = 0; i < localPosts.length - 1; i++) {
      const preview: string = localPosts[i]?.body.substr(0, 100);

      const user: USER | undefined = users.find(
        (user) => user.id === localPosts[i].userId
      );

      postsElement += `
        <div class="post" id="${localPosts[i].id}">
          <h3>${localPosts[i].title}</h3>
          <p>${preview}</p>
          <div class="user">
            <img src="../public/images/beach.jpg"></img>

            <p>${
              user === undefined ? "Anonymous" : user?.username + user?.lastName
            }</p>

            <a id=${localPosts[i].id}>Read More</a>
          </div>
        </div>
      `;
    }

    (document.querySelector(".blogs") as HTMLElement).innerHTML += postsElement;
    document.querySelectorAll(".post").forEach((post) => {
      post.setAttribute("href", "somelink.php?id" + post.id);
    });
  });
} else window.location.href = "../";
