interface USER {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface LOGINDETAILS {
  username: string;
  password: string;
}

interface USERDETAILS {
  firstname: string;
  lastname: string;
  username: string;
}

export { USER, LOGINDETAILS, USERDETAILS };
