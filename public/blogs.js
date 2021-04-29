var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { store, retrieve } from "./utils/storeToLocal.js";
import posts from "./data/posts.js";
import logout from "./utils/logout.js";
if (retrieve("user")) {
    const user = retrieve("user", "{}");
    document.querySelector(".username").innerText =
        user === null || user === void 0 ? void 0 : user.username;
    document.querySelector(".fullname").innerText =
        (user === null || user === void 0 ? void 0 : user.firstname) + (user === null || user === void 0 ? void 0 : user.lastname);
}
else {
    window.location.href = "../";
}
document.querySelector(".logout").addEventListener("click", () => logout());
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Store the posts
    let postsArray = [];
    const storedPosts = yield retrieve("posts");
    if (storedPosts.length === 0) {
        postsArray = [...posts];
    }
    else {
        postsArray = [...storedPosts];
    }
    yield store("posts", postsArray);
    const localPosts = yield retrieve("posts");
    const users = yield retrieve("users");
    // create Elements for posts
    let postsElement = "";
    for (let i = 0; i < localPosts.length - 1; i++) {
        const preview = (_a = localPosts[i]) === null || _a === void 0 ? void 0 : _a.body.substr(0, 100);
        const user = users.find((user) => user.id === localPosts[i].userId);
        postsElement += `
      <div class="post" id="${posts[i].id}">
        <h3>${posts[i].title}</h3>
        <p>${preview}</p>
        <div class="user">
          <img src="../public/images/beach.jpg"></img>

          <p>${user === undefined ? "Anonymous" : (user === null || user === void 0 ? void 0 : user.username) + (user === null || user === void 0 ? void 0 : user.lastName)}</p>

          <a id=${posts[i].id}>Read More</a>
        </div>
      </div>
    `;
    }
    document.querySelector(".blogs").innerHTML += postsElement;
    document.querySelectorAll(".post").forEach((post) => {
        post.setAttribute("href", "somelink.php?id" + post.id);
    });
}));
