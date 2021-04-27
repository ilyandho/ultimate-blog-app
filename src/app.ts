import uuid from "./utils/uuid";

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
// console.log(uuid());
console.log(Ilyas);
