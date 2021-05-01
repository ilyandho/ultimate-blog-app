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
import { getUserloggedIn } from "./utils/user.js";
import uuid from "./utils/uuid.js";
if (getUserloggedIn()) {
    const articleForm = document.querySelector(".article");
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const title = e.target.title.value;
        const contents = e.target.content.value;
        console.log(title, contents);
        let rawPost = {
            title,
            body: contents,
            id: uuid(),
        };
        const newPost = yield createPost(rawPost);
        location.href = "../blogs?id=" + newPost.id;
    });
    articleForm === null || articleForm === void 0 ? void 0 : articleForm.addEventListener("submit", (e) => handleSubmit(e));
}
else
    window.location.href = "../";
