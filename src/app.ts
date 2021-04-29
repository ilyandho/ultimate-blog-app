import uuid from "./utils/uuid.js";
import { createUser, userLogin } from "./utils/user.js";

// Handle form redirect
let loginFormLink = document.querySelector(".go-to-login");
let signupFormLink = document.querySelector(".go-to-signup");
let loginForm = document.querySelector(".login-form");
let signUpForm = document.querySelector(".signup-form");

const handleLoginForm = (e: any): any => {
  (loginForm as HTMLElement).style.display = "block";
  (signUpForm as HTMLElement).style.display = "none";
};

const handleSignUpForm = (e: any): any => {
  (loginForm as HTMLElement).style.display = "none";
  (signUpForm as HTMLElement).style.display = "block";
};

loginFormLink?.addEventListener("click", (e) => handleLoginForm(e));
signupFormLink?.addEventListener("click", (e) => handleSignUpForm(e));

// handle SignUp

const handleSignUp = async (e: any) => {
  e.preventDefault();

  const firstname: string = e.target.firstName.value;
  const lastname: string = e.target.lastName.value;
  const username: string = e.target.userName.value;
  const password1: string = e.target.password1.value;
  const password2: string = e.target.password2.value;

  // Check if the passwords match
  if (password1 !== password2) {
    (document.querySelector("#password1") as HTMLElement).style.borderColor =
      "red";
    (document.querySelector("#password2") as HTMLElement).style.borderColor =
      "red";
  }

  try {
    const user = await createUser({
      id: uuid(),
      firstName: firstname,
      lastName: lastname,
      username,
      password: password1,
    });
    (loginForm as HTMLElement).style.display = "block";
    (signUpForm as HTMLElement).style.display = "none";
  } catch (error) {
    (document.querySelector("#username") as HTMLElement).style.borderColor =
      "red";
    console.log("username taken");
  }
};

// Handle login
const handleLogin = async (e: any) => {
  e.preventDefault();

  const username: string = e.target.username.value;
  const password: string = e.target.password.value;

  try {
    await userLogin({ username, password });

    const formNode = document.querySelector(".form") as HTMLElement;

    window.location.href = "./blogs";
  } catch (error) {
    console.log(error);
  }
};

signUpForm?.addEventListener("submit", (e) => handleSignUp(e));
loginForm?.addEventListener("submit", (e) => handleLogin(e));
