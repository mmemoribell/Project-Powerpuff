  "use strict";
  /* Posts Page JavaScript */

  const $q = (s) => document.querySelector(s);
  const cardHolder = $q("#cardHolder");
  const usernamePro = $q("#username");
  const form = $q("form");
  const postText = $q("#postText");


  function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}
  const loginData = getLoginData();

  function displayProfilePost() {
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(api + "/api/posts/", options)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        buildPostCard(cardHolder, post);

      });
    });
}


function buildPostCard(section, data) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";
  const cardDiv = document.createElement("div");
  cardDiv.className = "card p-2";

 
  section.appendChild(colDiv);
  colDiv.appendChild(cardDiv);

 
  const cardTitle = document.createElement("h6");

  cardTitle.innerText = data.username;

  cardTitle.className = "card-title text-start ms-3 pt-2";
  cardTitle.innerText = `@${data.username}`;


  const cardTextPara = document.createElement("p");
  cardTextPara.className = "card-text";
  cardTextPara.innerText = data.text;

  const dFlexDiv = document.createElement("div");
  dFlexDiv.className = "d-flex justify-content-between align-items-center";

  const btnGroupDiv = document.createElement("div");
  btnGroupDiv.className = "btn-group";


  const likeBtn = document.createElement("button");
  likeBtn.className = "btn btn-sm btn-outline-warning";
  likeBtn.innerText = "Like";
  function likePost(event) {
    event.preventDefault();

    const bodyData = {
      postId: data._id
    };


    fetch("https://microbloglite.herokuapp.com/api/likes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.message = "You Gave A Like!";
        likeBtn.className = "btn btn-sm btn-success";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  likeBtn.onclick = likePost;

  const postTime = document.createElement("small");
  postTime.className = "text-muted";
  let timeCreated = new Date(data.createdAt);
  postTime.innerText = `${timeCreated.toLocaleString()}`;

  btnGroupDiv.appendChild(likeBtn);

  dFlexDiv.append(btnGroupDiv, postTime);
  //create the .card-body div to plant inside the card-text div
  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  cardDiv.appendChild(divCardBody);
  divCardBody.append(cardTitle, cardTextPara);

  cardDiv.append(cardTitle, divCardBody);
  divCardBody.append(cardTextPara, dFlexDiv);
}

function createPost(event) {
  event.preventDefault();
  const bodyData = {
    text: postText.value,
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "./posts.html";
    })
    .catch((err) => {
      console.log(err);
    });
}


const userName = $q("#userName")
function displayAlert() {
  if (sessionStorage.message) {
    console.log(sessionStorage.message);
    successAlert.innerText = sessionStorage.message;
    successAlert.style = "display-block";
  }
}


function loadName() {
  const loginData = getLoginData();
  usernamePro.innerText = `${loginData.username}`;
}

function logout() {
  const loginData = getLoginData();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(api + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("../index.html"); // redirect to landing page
    });
}

window.onload = () => {
  form.onsubmit = createPost;
  loadName();
  displayProfilePost();
  logoutButton.onclick = logout;
}
