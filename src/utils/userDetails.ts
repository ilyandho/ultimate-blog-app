import { retrieve } from "./storeToLocal.js";
import { userLogout } from "./user.js";

import { USER, USERDETAILS } from "../models/user";

export const getUserDetails = (): boolean => {
  console.log("gettting user details");
  let userExists: boolean = false;
  if (retrieve("user").length !== 0) {
    userExists = true;
    const user: USERDETAILS = retrieve("user", "{}");
    (document.querySelector(".username") as HTMLElement).innerText =
      user?.username;

    (document.querySelector(".fullname") as HTMLElement).innerText =
      user?.firstname + user?.lastname;

    (document.querySelector(".logout") as HTMLElement).addEventListener(
      "click",
      () => userLogout()
    );

    return userExists;
  } else {
    return userExists;
  }
};
