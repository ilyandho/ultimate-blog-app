var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createPost } from "./utils/post.js";
import { retrieve, store } from "./utils/storeToLocal.js";
import { getUserloggedIn } from "./utils/user.js";
import uuid from "./utils/uuid.js";
if (getUserloggedIn()) {
    // Check if there is any article
    let article = retrieve("currentPost");
    if (article.length === 0)
        article = "";
    const titleInput = document.querySelector("#title");
    const contentInput = document.querySelector("#content");
    if (article) {
        const posts = retrieve("posts");
        const postToEdit = posts.find((post) => post.id === article);
        titleInput.value = postToEdit.title;
        contentInput.value = postToEdit.body;
    }
    const articleForm = document.querySelector(".article");
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
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
            const newPost = yield createPost(rawPost);
            yield store("currentPost", newPost.id);
        }
        else {
            const posts = retrieve("posts");
            let updatedPosts = [];
            // const filteredPosts = posts.filter((post: POST) => post.id !== article);
            // console.log(filteredPosts);
            updatedPosts = yield posts.map((post) => {
                if (post.id === article) {
                    post.title = title;
                    post.body = contents;
                }
                return post;
            });
            yield store("posts", updatedPosts);
        }
        location.href = "../post";
    });
    articleForm === null || articleForm === void 0 ? void 0 : articleForm.addEventListener("submit", (e) => handleSubmit(e));
}
else
    window.location.href = "../";
