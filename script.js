document.addEventListener("DOMContentLoaded", function () {
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");
  const likeCountSpan = document.getElementById("likeCount");
  const dislikeCountSpan = document.getElementById("dislikeCount");
  const commentInput = document.getElementById("commentInput");
  const submitCommentBtn = document.getElementById("submitComment");
  const commentList = document.getElementById("commentList");
  const resetBtn = document.getElementById("resetBtn");

  // Load data from cookies
  let likeCount = parseInt(getCookie("likeCount")) || 0;
  let dislikeCount = parseInt(getCookie("dislikeCount")) || 0;
  let userChoice = getCookie("userChoice") || "";
  let userComment = getCookie("userComment") || "";

  // Update UI with stored values
  likeCountSpan.textContent = likeCount;
  dislikeCountSpan.textContent = dislikeCount;

  if (userChoice) {
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  }

  if (userComment) {
    displayComment(userComment);
    commentInput.disabled = true;
    submitCommentBtn.disabled = true;
  }

  // Like Button Click Event
  likeBtn.addEventListener("click", function () {
    if (!userChoice) {
      likeCount++;
      likeCountSpan.textContent = likeCount;
      setCookie("likeCount", likeCount, 365);
      setCookie("userChoice", "like", 365);
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    }
  });

  // Dislike Button Click Event
  dislikeBtn.addEventListener("click", function () {
    if (!userChoice) {
      dislikeCount++;
      dislikeCountSpan.textContent = dislikeCount;
      setCookie("dislikeCount", dislikeCount, 365);
      setCookie("userChoice", "dislike", 365);
      likeBtn.disabled = true;
      dislikeBtn.disabled = true;
    }
  });

  // Comment Submission Event
  submitCommentBtn.addEventListener("click", function () {
    let comment = commentInput.value.trim();
    if (comment && !userComment) {
      setCookie("userComment", comment, 365);
      displayComment(comment);
      commentInput.disabled = true;
      submitCommentBtn.disabled = true;
    }
  });

  // Reset Button Click Event
  resetBtn.addEventListener("click", function () {
    eraseCookie("userChoice");
    eraseCookie("userComment");
    eraseCookie("likeCount");
    eraseCookie("dislikeCount");
    likeCountSpan.textContent = "0";
    dislikeCountSpan.textContent = "0";
    commentList.innerHTML = "";
    commentInput.value = "";
    commentInput.disabled = false;
    submitCommentBtn.disabled = false;
    likeBtn.disabled = false;
    dislikeBtn.disabled = false;
    likeCount = 0;
    dislikeCount = 0;
  });

  // Function to display comment
  function displayComment(comment) {
    let li = document.createElement("li");
    li.textContent = comment;
    commentList.appendChild(li);
  }

  // Function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  // Function to get a cookie
  function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Function to erase a cookie
  function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
});
