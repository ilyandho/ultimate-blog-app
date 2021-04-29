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
// User creation
const createUser = (userObj) => __awaiter(void 0, void 0, void 0, function* () {
    let usersArray = [];
    try {
        const users = yield retrieve("users");
        if (users.length === 0) {
            usersArray.push(userObj);
        }
        else {
            // Check if user exists
            users.map((user) => {
                if (user.username === userObj.username) {
                    document.querySelector("#userName").style.borderColor = "red";
                    document.querySelector("#userName").style.background = "#cc646482";
                    console.log("username taken");
                    throw new Error("User exists");
                }
            });
            // Push user to userArray
            usersArray = [...users, userObj];
        }
        // Save user
        yield store("users", usersArray);
        return "User created";
    }
    catch (error) {
        console.log(error);
        return "Theres was a problem saving user";
    }
});
const userLogin = (userObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield retrieve("users");
        const user = users.find((user) => {
            return (user.username.trim() === userObj.username.trim() &&
                user.password.trim() === userObj.password.trim());
        });
        if (!user) {
            document.querySelector("#username").style.borderColor =
                "red";
            document.querySelector("#password").style.borderColor =
                "red";
            throw new Error("login details are not correct");
        }
        yield store("user", {
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
        });
    }
    catch (error) {
        console.log(error);
    }
});
export { createUser, userLogin };
