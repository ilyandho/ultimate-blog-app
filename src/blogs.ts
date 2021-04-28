interface USERDETAILS {
  firstname: string;
  lastname: string;
  username: string;
}

interface POST {
  userId: string;
  id: string;
  title: string;
  body: string;
}

// // //** Utils //

// /* UUID generator //
const uuid4 = (): string => {
  console.log("uuid4 running ...");
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

const posts: POST[] = [
  {
    userId: "1e5575e1-af8b-4c70-8caa-9b18a12e73cf",
    id: "f5fd1a21-f199-4637-ad33-5cae9c9deba2",
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: "8b2016d5-533e-46ef-8ab9-ff4b63c6e77f",
    id: "ce54b6b6-f21c-4a7d-897b-49865f4a403f",
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: "ca33d427-9796-4531-93f9-f60248e228cd",
    id: "ff973155-4844-4a95-8636-0910eaaacdc9",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: "3df399bd-6e19-45cb-aa39-60856ba06444",
    id: "9ae67918-3079-4ba7-81b8-eb3dd08816f9",
    title: "eum et est occaecati",
    body:
      "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    userId: "0de6cee9-1a34-4f24-89d2-5297bb4ce3cd",
    id: "cd7be324-ce33-4df4-8498-d82c70f27151",
    title: "nesciunt quas odio",
    body:
      "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    userId: "67bc886f-bb34-493c-89c1-c205d471bead",
    id: "61bb7b21-ef3f-4e06-bdf8-c9927c25aae0",
    title: "dolorem eum magni eos aperiam quia",
    body:
      "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    userId: "eb9ec6ca-49c7-43bf-92d6-c7022f83e8ca",
    id: "b0e08fe3-74cb-4b36-96ef-515d067cdeb2",
    title: "magnam facilis autem",
    body:
      "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    userId: "31a7e1c7-463b-44cc-95fb-7e643cfb2c83",
    id: "0dcfc0d7-4ea4-433f-af88-1d7ceb71989d",
    title: "dolorem dolore est ipsam",
    body:
      "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    userId: "2347fac3-7f6b-417b-aca8-b2618ad3f6a0",
    id: "bfa2bd60-fb58-444c-a54e-009d5973f0db",
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body:
      "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    userId: "1f5d9c24-5034-4d0d-89c0-0150f16d8f72",
    id: "28714f80-b13f-4280-9ab3-47908a0a62c6",
    title: "optio molestias id quia eum",
    body:
      "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
  {
    userId: "fdb4c14c-c08e-460a-b652-03dbd8061c56",
    id: "dd7342e5-80e1-46c0-b1b8-b697786bad4e",
    title: "et ea vero quia laudantium autem",
    body:
      "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
  },
  {
    userId: "f3259660-9394-4d0b-897c-2a3d77a4a966",
    id: "b181f54e-b8ab-43d0-b5bc-f33a798c6bf4",
    title: "in quibusdam tempore odit est dolorem",
    body:
      "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
  },
  {
    userId: "c34cfbe6-14d0-4f34-baea-c861a5e7002f",
    id: "2fbb1e81-0e84-4ab1-8365-92e4e118745b",
    title: "dolorum ut in voluptas mollitia et saepe quo animi",
    body:
      "aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam",
  },
  {
    userId: "e357c7a8-9af0-4fd8-8778-c0b290c09cf2",
    id: "b545c304-90ef-4e88-8b9d-612fe1e9d1e1",
    title: "voluptatem eligendi optio",
    body:
      "fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum",
  },
  {
    userId: "ba97e180-969d-4106-af2c-b842c3318349",
    id: "7a6e93c2-fcee-4b14-937e-fcaa1b12c202",
    title: "eveniet quod temporibus",
    body:
      "reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae",
  },
];

// const withUuid = posts.map((post) => {
//   return { userId: uuid4(), id: uuid4(), title: post.title, body: post.body };
// });

if (localStorage.getItem("user")) {
  const user: USERDETAILS = JSON.parse(localStorage.getItem("user") || "{}");
  (document.querySelector(".username") as HTMLElement).innerText =
    user?.username;

  (document.querySelector(".fullname") as HTMLElement).innerText =
    user?.firstname + user?.lastname;
} else {
  window.location.href = "../";
}

(document.querySelector(".logout") as HTMLElement).addEventListener(
  "click",
  () => {
    localStorage.removeItem("user");

    window.location.href = "../";
  }
);

window.addEventListener("load", async () => {
  // Store the posts
  let postsArray: POST[] = [];
  const storedPosts: POST[] = await JSON.parse(
    localStorage.getItem("posts") || "[]"
  );

  if (storedPosts.length === 0) {
    postsArray = [...posts];
  } else {
    postsArray = [...storedPosts];
  }

  await localStorage.setItem("posts", JSON.stringify(postsArray));
  const localPosts: POST[] = await JSON.parse(
    localStorage.getItem("posts") || "[]"
  );

  const users: USER[] = await JSON.parse(localStorage.getItem("users") || "[]");
  // create Elements for posts
  let postsElement: string = "";
  for (let i: number = 0; i < posts.length - 1; i++) {
    const preview: string = posts[i]?.body.substr(0, 100);

    const user: USER | undefined = users.find(
      (user) => user.id === posts[i].userId
    );

    postsElement += `
      <div class="post" id="${posts[i].id}">
        <h3>${posts[i].title}</h3>
        <p>${preview}</p>
        <div class="user">
          <img src="../public/images/beach.jpg"></img>

          <p>${
            user === undefined ? "Anonymous" : user?.username + user?.lastName
          }</p>

          <a id=${posts[i].id}>Read More</a>
        </div>
      </div>
    `;
  }
  // (document.querySelector(`#${posts[i].id}`) as HTMLElement).addEventListener(
  //   "click",
  //   () => {
  //     window.location.href = "./posts:123 ";
  //   }
  // );

  (document.querySelector(".blogs") as HTMLElement).innerHTML += postsElement;
  document.querySelectorAll(".post").forEach((post) => {
    post.setAttribute("href", "somelink.php?id" + post.id);
    // return post.addEventListener("click", () => {
    //   console.log(post.id);
    //   window.location.href = `../post?id=${post.id}`;
    //   // new URLSearchParams(window.location.search).get('id')
    // });
  });
});
