var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { retrieve } from "./utils/storeToLocal.js";
import { getPost } from "./utils/post.js";
import { getUser } from "./utils/user.js";
// Get post id
const id = retrieve("currentPost");
// localStorage.removeItem("currentPost");
window.addEventListener("load", () => __awaiter(void 0, void 0, void 0, function* () {
    const postDetails = yield getPost(id);
    const userDetails = yield getUser(postDetails.userId);
    const postContainer = document.querySelector("#post-details");
    const post = `
        <h3>${postDetails.title}</h3>
        <div class="author-details">
          <p> Published by <em> ${userDetails === undefined ? "anonymous" : userDetails.username} </em></p>

          <div class="actions"> <p calss="edit">Edit</p> <p class="delete">Delete</p></div>
        </div>
        <p>${postDetails.body}</p>


  `;
    postContainer.innerHTML = post;
}));
