  "use strict";
  /* Posts Page JavaScript */

  const $q = (s) => document.querySelector(s);
  const cardHolder = document.getElementsByClassName("#cards");
  const usernamePro = $q("#card-title");
  const postText = $q("#card-apply");


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

function cardDisplayData(data) {
  const cardTitle = usernamePro;
  const postPassage = postText;
  cardTitle.innerText = data.username;
  postPassage.innerText = data.text;
  cardTitle.innerText = `@${data.username}`

 
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
function loadName() {
  const loginData = getLoginData();
  bioUserName.innerText = `${loginData.username}`;
}
  
window.onload = () => {
  displayProfilePost();
  logoutButton.onclick = logout;
}