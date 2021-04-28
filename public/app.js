"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Ilyas = {
    id: "dudf",
    firstName: "ilau",
    lastName: "jlS",
    username: "URJERKJE",
    password: "HDJFJKD",
};
console.log("/// calling uuid");
console.log(Ilyas);
// // //** Utils //
// /* UUID generator //
const uuid = () => {
    console.log("uuid running ...");
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    return uuid;
};
// UUID Generator */ //
//  /* Data storage //
const createUser = (userObj) => __awaiter(void 0, void 0, void 0, function* () {
    let usersArray = [];
    try {
        const users = yield JSON.parse(localStorage.getItem("users") || "[]");
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
        yield localStorage.setItem("users", JSON.stringify(usersArray));
        console.log(yield JSON.parse(localStorage.getItem("users") || "[]"));
        return "User created";
    }
    catch (error) {
        console.log(error);
        return "Theres was a problem saving user";
    }
});
// Data Storage */ //
// Utils **// // //
// Handle form change
let loginFormLink = document.querySelector(".go-to-login");
let signupFormLink = document.querySelector(".go-to-signup");
let loginForm = document.querySelector(".login-form");
let signUpForm = document.querySelector(".signup-form");
const handleLoginForm = (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    signUpForm.style.display = "none";
    console.log(loginForm, signUpForm);
};
const handleSignUpForm = (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signUpForm.style.display = "block";
    console.log(loginForm, signUpForm);
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
    let password;
    console.log(password1 === password2);
    // Check if the passwords match
    if (password1 !== password2) {
        console.log("password1", password1, "password2", password2);
        document.querySelector("#password1").style.borderColor =
            "red";
        document.querySelector("#password2").style.borderColor =
            "red";
    }
    console.log(firstname, lastname, username, password1, password2, uuid());
    try {
        const user = yield createUser({
            id: uuid(),
            firstName: firstname,
            lastName: lastname,
            username,
            password: password1,
        });
    }
    catch (error) {
        document.querySelector("#username").style.borderColor =
            "red";
        console.log("username taken");
    }
});
signUpForm === null || signUpForm === void 0 ? void 0 : signUpForm.addEventListener("submit", (e) => handleSignUp(e));
