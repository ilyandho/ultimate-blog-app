import { retrieve } from "./storeToLocal.js";
import { userLogout } from "./user.js";
export const getUserDetails = () => {
    console.log("gettting user details");
    let userExists = false;
    if (retrieve("user").length !== 0) {
        userExists = true;
        const user = retrieve("user", "{}");
        document.querySelector(".username").innerText =
            user === null || user === void 0 ? void 0 : user.username;
        document.querySelector(".fullname").innerText =
            (user === null || user === void 0 ? void 0 : user.firstname) + (user === null || user === void 0 ? void 0 : user.lastname);
        document.querySelector(".logout").addEventListener("click", () => userLogout());
        return userExists;
    }
    else {
        return userExists;
    }
};
