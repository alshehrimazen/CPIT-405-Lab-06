const initLikes = 2400;
const initDislikes = 120;

let likesCount = initLikes;
let dislikeCount = initDislikes;


const LikeBtn = document.getElementById("likeBtn");
const DislikeBtn = document.getElementById("dislikeBtn");
const commentbox = document.getElementById("commentBox");
const submitbtn = document.getElementById("submit");
const clearbtn = document.getElementById("clear");
const commentList = document.getElementById("commentList")


LikeBtn.innerText = "👍" + likesCount;
DislikeBtn.innerText = "👎" + dislikeCount;



LikeBtn.addEventListener("click", () => {
  likesCount++;
  LikeBtn.innerText = "👍" + likesCount;
  setCookie();
  disableall();
})

DislikeBtn.addEventListener("click", () => {
  dislikeCount++;
  DislikeBtn.innerText = "👎" + dislikeCount;
  setCookie();
  disableall();
})


function setCookie() {
  const expireOn = new Date(Date.now() + 2 * 60 * 1000)
  const CookieString = "voted=true; path=/; expires=" + expireOn.toUTCString()
  document.cookie = CookieString;

}

clearbtn.addEventListener("click", () => {
  commentbox.value = ""
  const expireOn = new Date(Date.now() - 1)
  const CookieString = "voted=true; path=/; expires=" + expireOn.toUTCString()
  document.cookie = CookieString;
})

function disableall() {
  LikeBtn.disabled = true;
  DislikeBtn.disabled = true;
  submitbtn.disabled = true;
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (document.cookie.indexOf("voted") > -1) {
    disableall();
  }
})
