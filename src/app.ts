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
// // //** Utils //

// /* UUID generator //
const uuid = (): String => {
  console.log("uuid running ...");
  let s: any[] = [];
  let hexDigits: string = "0123456789abcdef";
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
// User creation
const createUser = async (userObj: USER): Promise<string> => {
  let usersArray: USER[] = [];

  try {
    const users: USER[] = await JSON.parse(
      localStorage.getItem("users") || "[]"
    );

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
    await localStorage.setItem("users", JSON.stringify(usersArray));

    console.log(await JSON.parse(localStorage.getItem("users") || "[]"));

    return "User created";
  } catch (error) {
    console.log(error);

    return "Theres was a problem saving user";
  }
};

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
// Data Storage */ //

// Utils **// // //

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
  let password: string;

  console.log(password1 === password2);

  // Check if the passwords match
  if (password1 !== password2) {
    console.log("password1", password1, "password2", password2);
    (document.querySelector("#password1") as HTMLElement).style.borderColor =
      "red";
    (document.querySelector("#password2") as HTMLElement).style.borderColor =
      "red";
  }

  console.log(firstname, lastname, username, password1, password2, uuid());

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

    if (formNode.parentNode) {
      formNode.parentNode.removeChild(formNode);
    }
  } catch (error) {
    console.log(error);
  }
};

signUpForm?.addEventListener("submit", (e) => handleSignUp(e));
loginForm?.addEventListener("submit", (e) => handleLogin(e));
