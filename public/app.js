var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import uuid from "./utils/uuid.js";
import { createUser, userLogin } from "./utils/user.js";
// Handle form redirect
let loginFormLink = document.querySelector(".go-to-login");
let signupFormLink = document.querySelector(".go-to-signup");
let loginForm = document.querySelector(".login-form");
let signUpForm = document.querySelector(".signup-form");
const handleLoginForm = (e) => {
    loginForm.style.display = "block";
    signUpForm.style.display = "none";
};
const handleSignUpForm = (e) => {
    loginForm.style.display = "none";
    signUpForm.style.display = "block";
};
loginFormLink === null || loginFormLink === void 0 ? void 0 : loginFormLink.addEventListener("click", (e) => handleLoginForm(e));
signupFormLink === null || signupFormLink === void 0 ? void 0 : signupFormLink.addEventListener("click", (e) => handleSignUpForm(e));
// handle SignUp
const handleSignUp = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const firstname = e.target.firstName.value;
    const lastname = e.target.lastName.value;
    const username = e.target.userName.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    // Check if the passwords match
    if (password1 !== password2) {
        document.querySelector("#password1").style.borderColor =
            "red";
        document.querySelector("#password2").style.borderColor =
            "red";
    }
    try {
        const user = yield createUser({
            id: uuid(),
            firstName: firstname,
            lastName: lastname,
            username,
            password: password1,
        });
        loginForm.style.display = "block";
        signUpForm.style.display = "none";
    }
    catch (error) {
        document.querySelector("#username").style.borderColor =
            "red";
        console.log("username taken");
    }
});
// Handle login
const handleLogin = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
        yield userLogin({ username, password });
        const formNode = document.querySelector(".form");
        window.location.href = "./blogs";
    }
    catch (error) {
        console.log(error);
    }
});
signUpForm === null || signUpForm === void 0 ? void 0 : signUpForm.addEventListener("submit", (e) => handleSignUp(e));
loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener("submit", (e) => handleLogin(e));
