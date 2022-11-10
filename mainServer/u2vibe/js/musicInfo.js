const lyrics = document.getElementsByClassName("lyrics-text");
const lyricsBtn = document.getElementsByClassName("lyrics-btn");
const lyricsoffBtn = document.getElementsByClassName("lyricsoff-btn");
const albumList = document.getElementsByClassName("album-list");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const playleftBtn = document.getElementById("playleft-btn");
const playrightBtn = document.getElementById("playright-btn");
const playList = document.getElementsByClassName("playList-line");
const musicPlayBtn = document.getElementById("musicplay-btn");
// 하단 음원재생바
const playController = document.getElementById("play-controller");
const volumeControl = document.getElementById("volume-control");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");

// 댓글
const userName = document.getElementById("user-name");
const commentBtn = document.getElementById("comment-btn");
const commentText = document.getElementById("comment");
const commentList = document.getElementById("comment-list");

playBtn.onclick = () => {
  playController.play();
};
stopBtn.onclick = () => {
  playController.pause();
};

volumeControl.addEventListener("change", (e) => {
  playController.volume = this.value / 10;
});

lyricsBtn[0].onclick = () => {
  lyrics[0].classList.toggle("on");
  lyricsBtn[0].classList.toggle("on");
  lyricsoffBtn[0].classList.toggle("on");
};

lyricsoffBtn[0].onclick = () => {
  lyrics[0].classList.toggle("on");
  lyricsBtn[0].classList.toggle("on");
  lyricsoffBtn[0].classList.toggle("on");
};

rightBtn.addEventListener("click", function () {
  albumList[0].style.transform = "translateX(-68.5vw)";
  // albumList[0].style.overflow = "visible";
});

leftBtn.addEventListener("click", function () {
  albumList[0].style.transform = "translateX(0vw)";
});

playrightBtn.onclick = () => {
  playList[0].style.transform = "translateX(-68.5vw)";
};

playleftBtn.onclick = () => {
  playList[0].style.transform = "translateX(0vw)";
};

//
async function listUp() {
  const result = (await axios.get("/api/musicInfo/play")).data;
  result?.list?.forEach((item) => {
    musicPlayBtn.onclick = () => {
      const imgDiv = document.createElement("div");
      const tempDiv = document.createElement("div");
      const tempImg = document.createElement("img");

      const innerDiv = document.createElement("div");
      const innerSecondDiv = document.createElement("div");

      tempImg.src = `../upload/${item.albumImg}`;
      console.log(item.albumImg);
      tempImg.setAttribute("filter", "none");
      tempImg.setAttribute("width", "50px");

      innerDiv.innerText = item.musicName;
      innerSecondDiv.innerText = item.singer;

      tempDiv.append(innerDiv);
      tempDiv.append(innerSecondDiv);

      imgDiv.append(tempImg);

      document.getElementsByClassName("container")[0].append(imgDiv);
      document.getElementsByClassName("container")[0].append(tempDiv);
    };
  });
  console.log("result");
  console.log(result.data);
  console.log(result.list);
}

listUp();

// 댓글
userName.innerText = "이가원 님"; // 추후엔 로그인 한 아이디 들어갈 자리
userName.style.marginLeft = "40px";
commentList.style.marginTop = "40px";
commentList.style.marginBottom = "100px";

async function commentlist() {
  commentBtn.onclick = async () => {
    try {
      const result = await axios.post("/api/musicInfo/comment", {
        userId: "lkw",
        comment: commentText.value,
      });
      console.log(result);
      const userDiv = document.createElement("div");
      const idP = document.createElement("p");
      const dateDiv = document.createElement("div");
      const dateP = document.createElement("p");
      const tempDiv = document.createElement("div");
      const textP = document.createElement("p");
      const btnBox = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const line = document.createElement("hr");

      idP.innerText = "이가원";
      dateP.innerText = "현재 시간";
      textP.innerText = commentText.value;
      deleteBtn.innerText = "삭제";

      deleteBtn.style.borderRadius = "10px";
      deleteBtn.style.fontSize = "12px";
      deleteBtn.style.backgroundColor = "gray";
      deleteBtn.style.color = "white";
      dateP.style.color = "gray";
      dateP.style.fontSize = "13px";

      userDiv.append(idP);
      dateDiv.append(dateP);
      tempDiv.append(textP);
      btnBox.append(deleteBtn);
      commentList.append(userDiv);
      commentList.append(dateDiv);
      commentList.append(tempDiv);
      commentList.append(btnBox);
      commentList.append(line);

      commentText.value = "";

      // deleteBtn.onclick = async function () {
      //   try {
      //     await axios.delete("/api/musicInfo/delete", {
      //       userId: "lkw",
      //     });
      //     commentlist();
      //   } catch (err) {
      //     console.error(err);
      //   }
      // };
    } catch (err) {
      console.error(err);
    }
  };
}
commentlist();
