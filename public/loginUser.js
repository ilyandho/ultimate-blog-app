var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Login
const userLogin = (userObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield JSON.parse(localStorage.getItem("users") || "[]");
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
        yield localStorage.setItem("user", JSON.stringify({
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
        }));
    }
    catch (error) {
        console.log(error);
    }
});
export default userLogin;
