interface USER {
  id: String;
  firstName: String;
  lastName: String;
  username: String;
  password: String;
}

let Ilyas: USER = {
  id: "dudf",
  firstName: "ilau",
  lastName: "jlS",
  username: "URJERKJE",
  password: "HDJFJKD",
};

console.log("/// calling uuid");
console.log(Ilyas);

// Utils

// UUID generator
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

export default uuid;

// Handle form change
let loginFormLink = document.querySelector(".go-to-login");
let signupFormLink = document.querySelector(".go-to-signup");
let loginForm = document.querySelector(".login-form");
let signUpForm = document.querySelector(".signup-form");

const handleLoginForm = (e: any): any => {
  e.preventDefault();
  (loginForm as HTMLElement).style.display = "block";
  (signUpForm as HTMLElement).style.display = "none";
  console.log(loginForm, signUpForm);
};

const handleSignUpForm = (e: any): any => {
  e.preventDefault();
  (loginForm as HTMLElement).style.display = "none";
  (signUpForm as HTMLElement).style.display = "block";
  console.log(loginForm, signUpForm);
};

loginFormLink?.addEventListener("click", (e) => handleLoginForm(e));
signupFormLink?.addEventListener("click", (e) => handleSignUpForm(e));

// handle SignUp

const handleSignUp = (e: any) => {
  e.preventDefault();

  const firstname: string = e.target.firstName.value;
  const lastname: string = e.target.lastName.value;
  const username: string = e.target.userName.value;
  let password1: string = e.target.password1.value;
  const password2: string = e.target.password2.value;
  console.log(password1 === password2);

  // Check if the passwords match
  if (password1 !== password2) {
    console.log("password1", password1, "password2", password2);
    (document.querySelector("#password1") as HTMLElement).style.borderColor =
      "red";
    (document.querySelector("#password2") as HTMLElement).style.borderColor =
      "red";
  }

  // console.log(e)
  console.log(firstname, lastname, username, password1, password2, uuid());
};
signUpForm?.addEventListener("submit", (e) => handleSignUp(e));
