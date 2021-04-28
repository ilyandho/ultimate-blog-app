interface USER {
  id: String;
  firstName: String;
  lastName: String;
  username: String;
  password: String;
}

interface loginDetails {
  username: string;
  password: string;
}

// Login

const userLogin = async (userObj: loginDetails) => {
  try {
    const users: USER[] = await JSON.parse(
      localStorage.getItem("users") || "[]"
    );

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

    await localStorage.setItem(
      "user",
      JSON.stringify({
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default userLogin;
