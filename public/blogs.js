var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import posts from "./data/posts.js";
import { store, retrieve } from "./utils/storeToLocal.js";
import { getUserloggedIn } from "./utils/user.js";
// Get user details and fill them in at the top if logged in
// Else redirect to signup page
localStorage.removeItem("currentPost");
if (getUserloggedIn()) {
    window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const handlePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
            yield store("currentPost", id);
            location.href = "../post";
        });
        // Check if user is logged in
        const users = yield retrieve("users");
        // // Store the posts
        let postsArray = [];
        // Check if there are any posts in the storage
        const storedPosts = yield retrieve("posts");
        if (storedPosts.length === 0) {
            postsArray = [...posts];
        }
        else {
            postsArray = [...storedPosts];
        }
        yield store("posts", postsArray);
        const localPosts = yield retrieve("posts");
        // create Elements for posts
        let postsElement = "";
        for (let i = 0; i < localPosts.length - 1; i++) {
            const preview = (_a = localPosts[i]) === null || _a === void 0 ? void 0 : _a.body.substr(0, 100);
            const user = users.find((user) => user.id === localPosts[i].userId);
            postsElement += `
        <div class="post" id="${localPosts[i].id}">
          <h3>${localPosts[i].title}</h3>
          <p>${preview}</p>
          <div class="user">
            <img src="../public/images/beach.jpg"></img>

            <p>${user === undefined
                ? "Anonymous"
                : (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName)}</p>

            <a class="go-to-post" id=${localPosts[i].id} " >
            Read More
            </a>
          </div>
        </div>
      `;
        }
        document.querySelector(".blogs").innerHTML += postsElement;
        document.querySelectorAll(".go-to-post").forEach((post) => {
            // post.setAttribute("href", "../post?" + post.id);
            // console.log(post.id);
            post.addEventListener("click", () => handlePost(post.id));
        });
    }));
}
else
    window.location.href = "../";
