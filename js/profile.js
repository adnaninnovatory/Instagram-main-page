const loggedUser = localStorage.getItem("loggedInUser");
let userData;
if (loggedUser) {
  userData = JSON.parse(loggedUser);
} else {
  let body = document.getElementsByTagName('body')[0];
  body.innerHTML = `
  <div class='err'>
    <h1>404-Error</h1>
    <a href='./login.html' >Login?</a>
  </div>
  `
  // alert("Error in logging");
}
console.log(userData);

// fetch('../data/users.json')
// .then((res) => res.json())  // Parse the response as JSON
// .then((users) => console.log(users))  // Log the parsed users data
// .catch((error) => console.error('Error fetching users:', error));  // Error handling

let posts = userData.posts;
// console.log(posts);
let postsDOM = document.getElementById("posts");
posts.forEach((elem) => {
  let l = elem.comments.length;
  // console.log(l);
  postsDOM.innerHTML += `
      <div class="post" onclick='showModal(${JSON.stringify(elem)},false)'>
            <div class="img">
              <img src=${elem.src} alt="" />
              <div class="overlay">
                <div class="likes"><i class="fa-solid fa-heart"></i>${
                  elem.likes
                }</div>
                <div class="comments"><i class="fa-solid fa-comment"></i>${l}</div>
              </div>
            </div>
          </div>
      
      `;
});
let reels = userData.reels;
// console.log(reels);
let reelsDOM = document.getElementById("reels");
reels.forEach((elem) => {
  let l = elem.comments.length;
  reelsDOM.innerHTML += `
       <div class="reel" onclick = 'showModal(false,${JSON.stringify(elem)})'>
            <div class="video">
              <div class="views">
                <i class="fa-solid fa-eye"></i>
                ${elem.views}
              </div>
              <video>
                <source src="${elem.src}" type="video/mp4">
              </video>
              <div class="overlay">
                <div class="likes"><i class="fa-solid fa-heart"></i>${
                  elem.likes
                }</div>
                <div class="comments"><i class="fa-solid fa-comment"></i>${l}</div>
              </div>
            </div>
          </div>
      
      `;
});

let postNavDOM = document.querySelectorAll("#postNav ul li a");

postNavDOM.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    setActive(index);
  });
});

let postsSection = document.getElementById("posts");

let reelsSection = document.getElementById("reels");

let savedSection = document.getElementById("saved");

let taggedSection = document.getElementById("tagged");
function setActive(index) {
  if (index == 0) {
    postNavDOM[0].classList.add("active");
    postNavDOM[1].classList.remove("active");
    postNavDOM[2].classList.remove("active");
    postNavDOM[3].classList.remove("active");
    postsSection.style.display = "grid";
    reelsSection.style.display = "none";
    savedSection.style.display = "none";
    taggedSection.style.display = "none";
  }
  if (index == 1) {
    postNavDOM[0].classList.remove("active");
    postNavDOM[1].classList.add("active");
    postNavDOM[2].classList.remove("active");
    postNavDOM[3].classList.remove("active");
    postsSection.style.display = "none";
    reelsSection.style.display = "grid";
    savedSection.style.display = "none";
    taggedSection.style.display = "none";
  }
  if (index == 2) {
    postNavDOM[0].classList.remove("active");
    postNavDOM[1].classList.remove("active");
    postNavDOM[2].classList.add("active");
    postNavDOM[3].classList.remove("active");
    postsSection.style.display = "none";
    reelsSection.style.display = "none";
    savedSection.style.display = "grid";
    taggedSection.style.display = "none";
  }
  if (index == 3) {
    postNavDOM[0].classList.remove("active");
    postNavDOM[1].classList.remove("active");
    postNavDOM[2].classList.remove("active");
    postNavDOM[3].classList.add("active");
    postsSection.style.display = "none";
    reelsSection.style.display = "none";
    savedSection.style.display = "none";
    taggedSection.style.display = "grid";
  }
}

function closeModal() {
  let postsModalDOM = document.getElementsByClassName("postsModal")[0];
  var body = document.getElementsByTagName("body")[0];
  body.classList.remove("no-scroll");
  postsModalDOM.remove();
}
function showModal(post, reel) {
  if (typeof post == "string") {
    post = JSON.parse(post);
  }
  if (typeof reel == "string") {
    reel = JSON.parse(reel);
  }
  // console.log(post, reel);
  let postsModalDOM = document.createElement("div");
  postsModalDOM.classList.add("postsModal");
  let scrollY = window.scrollY;
  // console.log(scrollY);
  postsModalDOM.innerHTML = `
    <div class="modal">
       <div class="cross" id='closeModal' onclick = "closeModal()">
      <i class="fa-solid fa-xmark"></i></div>
  <div class="boxContainer">
    <div class="box">
      <div class="content">
      ${
        reel
          ? `<video id='modalReel' onclick='togglePlay()' autoplay><source src="${reel.src}" type="video/mp4"></video><div class="mute" onclick='mute()'><i class="fa-solid fa-volume-xmark"></i></div>`
          : `<img src="${post.src}" alt="" />`
      }
      </div>
      <div class="aboutContent">
        <div class="user">
          <div class="img">
            <img src="${userData.profile_img}" alt="">
          </div>
          <div class="name">
            ${userData.username}
          </div>
          <div class="more"><a><i class="fa-solid fa-ellipsis"></i></a></div>
        </div>
        <div class="divider"></div>
        <div class='h'>
            <div class="caption">
              <div class="img">
                <img src="${userData.profile_img}" alt="">
              </div>
              <div class="name">
              ${userData.username} <span class='c'>${
    reel ? reel.caption : post.caption
  }</span>
                <div class="time">9w</div>
              </div>
            </div>
            <div class="comments">
            ${
              post
                ? post.comments
                    .map((elem) => {
                      return `<div class="cmnt">
                <div class="img">
                  <img src="${elem.profile_img}" alt="" />
                </div>
                <div class="name">
                  ${elem.username} <span class="c">${elem.comment}</span>
                  <div class="aboutCmnt">
                    <div class="time">9w</div>
                    <div class="likes">${
                      elem.likes > 1
                        ? `${elem.likes} likes`
                        : `${elem.likes} like`
                    }</div>
                    <div class="reply">Reply</div>
                    <div class="more">
                      <i class="fa-ellipsis fa-solid"></i>
                    </div>
                  </div>
                </div>
                <div class="likeCmnt" onclick="like(this)">
                  <i class="fa-regular fa-heart"></i>
                </div>
              </div>`;
                    })
                    .join("")
                : reel.comments
                    .map((elem) => {
                      return `<div class="cmnt">
                <div class="img">
                  <img src="${elem.profile_img}" alt="" />
                </div>
                <div class="name">
                  ${elem.username} <span class="c">${elem.comment}</span>
                  <div class="aboutCmnt">
                    <div class="time">9w</div>
                    <div class="likes">${
                      elem.likes > 1
                        ? `${elem.likes} likes`
                        : `${elem.likes} like`
                    }</div>
                    <div class="reply">Reply</div>
                    <div class="more">
                      <i class="fa-ellipsis fa-solid"></i>
                    </div>
                  </div>
                </div>
                <div class="likeCmnt" onclick="like(this)">
                  <i class="fa-regular fa-heart"></i>
                </div>
              </div>`;
                    })
                    .join("")
            }
              
            </div>
          </div>
           <div class="divider"></div>
        <div class="btns">
                <div class="top">
                  <div class="left">  
                    <i class="${post.like?'fa-solid':'fa-regular'} fa-heart" onclick='addLike(this,${reel?JSON.stringify(reel):JSON.stringify(post)})'></i>
                    <i class="fa-regular fa-comment"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                  </div>
                  <div class="right">
                    <i class="fa-regular fa-bookmark"></i>
                  </div>
                </div>
                <div class="bottom">
                  <div class="first">
                    <div class="imgs"></div>
                    <div class="desc">
                      Liked by <span>ahmad_haseeb1</span> and
                      <span>29 others</span>
                    </div>
                  </div>
                  <div class="second">
                    <div class="date">April 5</div>
                  </div>
                </div>
              </div>
              <div class="divider"></div>
        <div class="addComment">
                <button><i class="fa-regular fa-face-smile"></i></button>
                <input type="text" placeholder="Add a comment" id='cm'>
                <button onclick='${
                  reel
                    ? `addComment(${JSON.stringify(reel)},"reel")`
                    : `addComment(${JSON.stringify(post)},"post")`
                }'>Post</button>
              </div>
      </div>
    </div>
  </div> </div>
    
    `;

  postsModalDOM.style.top = `${scrollY}px`;
  var body = document.getElementsByTagName("body")[0];
  body.classList.add("no-scroll");
  body.prepend(postsModalDOM);
}

function addComment(elem,p) {
  // console.log(elem.comments);
  let cm = document.getElementById("cm").value;
  let commentDiv = document.getElementById('comments')
  // console.log(commentDiv)
  let cmnt = {
    id: elem.comments.length + 1,
    comment: cm,
    likes: 0,
    profile_img: "../assets/profile/1.jpg",
    reply: [],
    username: userData.username,
  };
  elem.comments.push(cmnt)
  // console.log(cmnt);
  let post;
  if(p=='reel'){
    userData.reels.forEach((e) => {
      if (e.id === elem.id) {
        e.comments.push(cmnt)
      }
    });
  }
  else{
    userData.posts.forEach((e) => {
      if (e.id === elem.id) {
        e.comments.push(cmnt)
      }
    });
  }
 

  localStorage.setItem('loggedInUser',JSON.stringify(userData))
  // if(p=='reel'){
  //   showModal(false,elem)
  // }
  // else{
  //   showModal(elem,false)
  // }
  window.location.reload();
  
  console.log(elem.comments);
  // commentDiv.innerHTML += `<div class="cmnt">
  //               <div class="img">
  //                 <img src="${cmnt.profile_img}" alt="" />
  //               </div>
  //               <div class="name">
  //                 ${cmnt.username} <span class="c">${cmnt.comment}</span>
  //                 <div class="aboutCmnt">
  //                   <div class="time">9w</div>
  //                   <div class="likes">${
  //                     cmnt.likes > 1
  //                       ? `${cmnt.likes} likes`
  //                       : `${cmnt.likes} like`
  //                   }</div>
  //                   <div class="reply">Reply</div>
  //                   <div class="more">
  //                     <i class="fa-ellipsis fa-solid"></i>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div class="likeCmnt" onclick="like(this,)">
  //                 <i class="fa-regular fa-heart"></i>
  //               </div>
  //             </div>`
  // // let userData = localStorage.getItem
}
function togglePlay() {
  let video = document.getElementById("modalReel");
  if (video.paused) {
    video.play(); // Play the video if it is paused
  } else {
    video.pause(); // Pause the video if it is playing
  }
}

function mute() {
  let video = document.getElementById("modalReel");
  video.muted = !video.muted;

  let muteDiv = document.querySelector(".modal .mute");
  if (video.muted) {
    muteDiv.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
  } else {
    muteDiv.innerHTML = `<i class="fa-solid fa-volume-xmark"></i></div>`;
  }
}

function like(element) {
  console.log(element);
  let i = element.querySelector("i");

  let cl = i.classList;

  if (cl.contains("fa-solid")) {
    element.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  } else {
    element.innerHTML = `<i class="fa-solid fa-heart"></i>`;
  }
}

let moreBio = document.getElementById("moreBio");

moreBio.innerHTML = `
<ul>
                  <li id="name">${userData.full_name}</li>

                  ${userData.bio
                    .map((elem) => {
                      return `
                      <li>${elem}<li>
                      `;
                    })
                    .join("")}
</ul>
`;

let totalPosts = document.getElementById("totalPosts");
totalPosts.innerHTML = `
                <div class="posts">${userData.posts.length} <span>posts</span></div>
                <div class="followers">${userData.followers.length} <span>followers</span></div>
                <div class="following">${userData.following.length} <span>following</span></div>

`;

let profilePicNav = document.getElementsByClassName("profile-pic--nav")[0];

profilePicNav.src = `${userData.profile_img}`;

let usernameTop = document.querySelector("#username>h3");
usernameTop.innerHTML = `${userData.username}`;

let profileImg = document.getElementById("profileImg");
profileImg.innerHTML = `<img src="${userData.profile_img}" alt="" />`;



function addLike(d,elem){
   let cl = d.classList;

  if (cl.contains("fa-solid")) {
    d.className = `fa-regular fa-heart`;
  } else {
    d.className = `fa-solid fa-heart`;
  }
  userData.posts.forEach((e) => {
    if (e.id === elem.id) {
      if(e.like){

        e.likes -= 1;
        e.like = false;    
      }
      else{
        e.like = true;
        e.likes +=1
      }
      console.log(e.likes) 
    }
  });
  localStorage.setItem('loggedInUser',JSON.stringify(userData))
}

// let out = document.getElementById('logout');

// out.addEventListener('click',()=>{
//   localStorage.removeItem('loggedInUser')
//   window.location.href = 'index.html'
// })