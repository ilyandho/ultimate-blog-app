var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { retrieve, store } from "./utils/storeToLocal.js";
import { getPost } from "./utils/post.js";
import { getUser, getUserloggedInDetails } from "./utils/user.js";
// Get post id
const id = retrieve("currentPost");
// localStorage.removeItem("currentPost");
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const postDetails = yield getPost(id);
    const userDetails = yield getUser(postDetails.userId);
    const loggedinUser = yield getUserloggedInDetails();
    const postContainer = document.querySelector("#post-details");
    let canUpdate = false;
    if (loggedinUser !== undefined) {
        if (loggedinUser.id === postDetails.userId) {
            canUpdate = true;
        }
        else
            canUpdate = false;
    }
    const post = `
        <h3>${postDetails.title}</h3>
        <div class="author-details">
          <p> Published by <em> ${userDetails === undefined ? "anonymous" : userDetails.username} </em></p>

          <div class="actions">${
    // userDetails.id === postDetails.userId           ?
    // ` <p calss="edit">Edit</p> <p class="delete">Delete</p>`
    // : null
    canUpdate
        ? ` <p calss="edit">Edit</p> <p class="delete">Delete</p>`
        : ""}</div>
        </div>
        <p>${postDetails.body}</p>


  `;
    postContainer.innerHTML = post;
    if (document.querySelector(".delete")) {
        document.querySelector(".delete").addEventListener("click", () => handlePostDelete(postDetails.id));
    }
}));
const handlePostDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete", id);
    const posts = yield retrieve("posts");
    const filtered = yield posts.filter((post) => post.id !== id);
    console.log(filtered);
    yield store("posts", filtered);
    localStorage.removeItem("currentPost");
    location.href = "../blogs";
});