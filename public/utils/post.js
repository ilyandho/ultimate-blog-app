var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { retrieve, store } from "./storeToLocal.js";
const createPost = (postObj) => __awaiter(void 0, void 0, void 0, function* () {
    // get current user
    const user = yield retrieve("user", "{}");
    const posts = yield retrieve("posts");
    let newPosts = [];
    (postObj.userId = user.id), (newPosts = [postObj, ...posts]);
    yield store("posts", newPosts);
});
export { createPost };
