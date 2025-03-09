let likesCount = 2400;
let dislikesCount = 120;

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const commentBox = document.getElementById("commentBox");
const submitBtn = document.getElementById("submit");
const clearBtn = document.getElementById("clear");
const commentsList = document.getElementById("commentsList");

document.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("voted=true")) {
    disableButtons();
  }
});

likeBtn.addEventListener("click", () => {
  likesCount++;
  likeBtn.innerText = `👍 ${likesCount}`;
  setCookie();
  disableButtons();
});

dislikeBtn.addEventListener("click", () => {
  dislikesCount++;
  dislikeBtn.innerText = `👎 ${dislikesCount}`;
  setCookie();
  disableButtons();
});

submitBtn.addEventListener("click", () => {
  const commentText = commentBox.value.trim();
  if (commentText !== "") {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment-item");
    commentElement.innerText = commentText;
    commentsList.appendChild(commentElement);
    commentBox.value = "";
  }
});

clearBtn.addEventListener("click", () => {
  commentBox.value = "";
});

function disableButtons() {
  likeBtn.disabled = true;
  dislikeBtn.disabled = true;
  submitBtn.disabled = true;
}

function setCookie() {
  const expireOn = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiration
  document.cookie = `voted=true; expires=${expireOn.toUTCString()}; path=/`;
}
