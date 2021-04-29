import { USER, LOGINDETAILS } from "../models/user";
import { retrieve, store } from "./storeToLocal.js";

let loginForm = document.querySelector(".login-form");
let signUpForm = document.querySelector(".signup-form");

// User creation
const createUser = async (userObj: USER): Promise<string> => {
  let usersArray: USER[] = [];

  try {
    const users: USER[] = await retrieve("users");

    if (users.length === 0) {
      usersArray.push(userObj);
    } else {
      // Check if user exists
      users.map((user) => {
        if (user.username === userObj.username) {
          (document.querySelector(
            "#userName"
          ) as HTMLElement).style.borderColor = "red";
          (document.querySelector(
            "#userName"
          ) as HTMLElement).style.background = "#cc646482";
          console.log("username taken");
          throw new Error("User exists");
        }
      });

      // Push user to userArray
      usersArray = [...users, userObj];
    }

    // Save user
    await store("users", usersArray);
    (loginForm as HTMLElement).style.display = "block";
    (signUpForm as HTMLElement).style.display = "none";
    return "User created";
  } catch (error) {
    console.log(error);

    return "Theres was a problem saving user";
  }
};

const userLogout = () => {
  localStorage.removeItem("user");

  window.location.href = "../";
};

const userLogin = async (userObj: LOGINDETAILS) => {
  try {
    const users: USER[] = await retrieve("users");

    const user = users.find((user) => {
      return (
        user.username.trim() === userObj.username.trim() &&
        user.password.trim() === userObj.password.trim()
      );
    });

    if (!user) {
      (document.querySelector("#username") as HTMLElement).style.borderColor =
        "red";
      (document.querySelector("#password") as HTMLElement).style.borderColor =
        "red";

      throw new Error("login details are not correct");
    }

    await store("user", {
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
    });

    window.location.href = "./blogs";
  } catch (error) {
    console.log(error);
  }
};

export { createUser, userLogin, userLogout };
