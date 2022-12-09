 "use strict"; function getLoginData () { return JSON.parse(window.localStorage.getItem("login-data")) || {}; } 
 // this is the cards where the post will show up 
 et postsDiv = document.querySelector("#posts"); 
 // log in auth 
 const loginData = getLoginData(); 
 const options = { headers: { Authorization: `Bearer ${loginData.token}`, } } 
 // api calling username 
 function postUser() { fetch( api + "/api/users/", options) 
 .then(response => response.json()) 
 .then(data => 
  { let postData = data.username; }); } 
  const username = postUser(); 
  function postId() { 
    fetch( api + "/api/posts/", options) 
    .then(response => response.json()) 
    .then(data => { 
      let postIdNum = data.postId; }); } 
      const postNum = postId(); 
      function postTextM() { 
        fetch( api + "/api/posts/", options) 
        .then(response => response.json()) 
        .then(data => { 
          let postW = data.text; 
          console.log(postW); }); 
        } 
      const postText = postTextM(); 
      // Function to get all users via fetch() 
      function getAllUsers () {
         // GET /api/users 
         const loginData = getLoginData(); 
         const options = { method: "GET", headers: { Authorization: `Bearer ${loginData.token}`, },};
          // note: the api variable is defined in auth.js 
          fetch(api + "/api/users", options) 
          .then(response => response.json()) 
          .then(users => { 

            const posts = fetch(api + "/api/posts", options)
  .then(response => response.json())
  .then(post => post);
  posts.then(post => console.table(post))
console.log(posts)
 // Promise {<pending>}
            // Do something with the users array... 
            console.log(users); 
          }); } function createCard(post) { 
            const cardDiv = document.createElement("div"); 
            cardDiv.classList.add("card");
            cardDiv.style.width = "18rem"; 
            const cardBody = document.createElement("div"); 
            cardDiv.classList.add("card-body");  
            const heading5 = document.createElement("h5"); 
            cardDiv.classList.add("card-title"); 
            heading5.innerText = postNum; 
            const heading6 = document.createElement("h6"); 
            cardDiv.classList.add("card-subtitle"); 
            heading6.innerText = username; 
            const paragraph = document.createElement("p"); 
            cardDiv.classList.add("card-text"); 
            paragraph.innerText = postText; 
            cardDiv.appendChild(cardBody); 
            cardBody.append(heading5, heading6, paragraph); return cardBody; } 

 window.onload = () => { 
  for (const post of posts) { 
    const card = createCard(post); 
    postsDiv.appendChild(card); } };