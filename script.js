async function getPlaylists(x) {
  let response = await fetch(x);
  return await response.json();
}

async function addPlaylists(x) {
  let playlists = await getPlaylists(x);
  
  console.log(playlists)
  
  // let div = document.createElement("div");
  // div.innerHTML = html;
  // let as = div.getElementsByTagName("a");
  
  // for (let index = 1; index < as.length; index++) {
  //   playlists.push(as[index].href.split("/playlists/")[1]);
  // }

  for (let i = 0; i < playlists.length; i++) {

    let pName = playlists[i];
    
    // pName = pName.replaceAll("%20", " ");
    console.log(pName)
    // pName = pName.slice(0, pName.length - 1);
    let info = await fetch(`playlists/${pName}/info.json`);
    let jsonfile = await info.json();

    document.querySelector(
      ".sectionList"
    ).innerHTML += `<div class="card flexCol gap10">
    <svg class="play" xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="green" />
    <polygon points="40,30 40,70 70,50" fill="black" />
    </svg>
    <img aria-hidden="false"
    src="playlists/${pName}/cover.jpg" alt="Artist">
    <span class="name">${pName}</span>
    <span>${jsonfile.description}</span>
    
    </div>`;
  }
  // console.log(1)

  Array.from(document.getElementsByClassName("card")).forEach((e) => {
    let p = e.querySelector(".name").innerHTML;
    e.addEventListener("click", () => {
      addSongList(p);
    });
  });
}

async function getSongList(x) {
  let response = await fetch("playlists/" + x);
  return await response.json();
}

function formatSeconds(seconds) {
  const minutes = parseInt(seconds / 60);
  const remainingSeconds = parseInt(seconds % 60);

  // Ensure two-digit formatting for both minutes and seconds
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
let vol = 1;

function playSong(track, playlistName) {
  currentSong.src = "playlists/" + playlistName + "/" + track;
  currentSong.play();

  songInfo.innerHTML = track.replace(".mp3", "");

  currentSong.addEventListener("loadedmetadata", () => {
    // console.log(currentSong.duration)
    songDuration.querySelector("span").innerHTML = `${formatSeconds(
      currentSong.currentTime
    )}/${formatSeconds(currentSong.duration)}`;
  });

  currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.duration)
    songDuration.querySelector("span").innerHTML = `${formatSeconds(
      currentSong.currentTime
    )}/${formatSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".line").addEventListener("click", (e) => {
    let x = e.offsetX;
    let w = document.querySelector(".line").getBoundingClientRect().width;
    let circlePos = (x / w) * 100;
    document.querySelector(".circle").style.left = circlePos + "%";

    currentSong.currentTime = (circlePos * currentSong.duration) / 100;
  });
}

let songs;
let currentSongIndex;
let activePlaylist;

async function addSongList(x) {
  songs = await getSongList(x + "/songs.json");
  // console.log(html)

  // let div = document.createElement("div");
  // div.innerHTML = html;

  // let as = div.getElementsByTagName("a");
  // x = x.replaceAll(" ", "%20");
  activePlaylist = x;
  // for (let index = 1; index < as.length; index++) {
  //   if (as[index].href.split(`/${x}/`)[1].endsWith(".mp3"))
  //     songs.push(as[index].href.split(`/${x}/`)[1]);
  // }
  console.log(songs);
  document.querySelector(".library").querySelector("ul").innerHTML = ``;
  for (const i of songs) {
    let name = i;

    // name = name.replaceAll("%20", " ");

    document
      .querySelector(".library")
      .querySelector("ul").innerHTML += `<li>    
                            <div class="songItem flex spaceBetween alignItemsCenter">
                                <div class="info flex gap10 alignItemsCenter">
                                    <div class="image">
                                        <svg class="svgInvert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"  color="#000000" fill="none">
                                            <path d="M3 15C3 12.1911 3 10.7866 3.67412 9.77772C3.96596 9.34096 4.34096 8.96596 4.77772 8.67412C5.78661 8 7.19108 8 10 8H14C16.8089 8 18.2134 8 19.2223 8.67412C19.659 8.96596 20.034 9.34096 20.3259 9.77772C21 10.7866 21 12.1911 21 15C21 17.8089 21 19.2134 20.3259 20.2223C20.034 20.659 19.659 21.034 19.2223 21.3259C18.2134 22 16.8089 22 14 22H10C7.19108 22 5.78661 22 4.77772 21.3259C4.34096 21.034 3.96596 20.659 3.67412 20.2223C3 19.2134 3 17.8089 3 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.5 16.5C12.5 17.3284 11.8284 18 11 18C10.1716 18 9.5 17.3284 9.5 16.5C9.5 15.6716 10.1716 15 11 15C11.8284 15 12.5 15.6716 12.5 16.5ZM12.5 16.5V11.5C12.5 11.5 12.9 13.2333 14.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M19 8C18.9821 6.76022 18.89 6.05733 18.4182 5.58579C17.8321 5 16.8888 5 15.0022 5H8.99783C7.11118 5 6.16786 5 5.58176 5.58579C5.10996 6.05733 5.01794 6.76022 5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M17 5C17 4.06812 17 3.60218 16.8478 3.23463C16.6448 2.74458 16.2554 2.35523 15.7654 2.15224C15.3978 2 14.9319 2 14 2H10C9.06812 2 8.60218 2 8.23463 2.15224C7.74458 2.35523 7.35523 2.74458 7.15224 3.23463C7 3.60218 7 4.06812 7 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>

                                   <div class="songName">
                                    ${name}
                                   </div>

                                </div>
                                <div class="songPlay flex alignItemsCenter justifyContentFlexEnd gap10">
                                    PLAY NOW
                                    <svg class="svgInvert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                        <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </li>`;
  }
  // Adding event listener to play the song on a click

  let songNumber = -1;
  let firstSong;

  Array.from(
    document.querySelector(".library").getElementsByTagName("li")
  ).forEach((e) => {
    let track = e.querySelector(".songName").innerHTML.trim();
    songNumber++;
    if (songNumber == 0) firstSong = track;
    console.log(track, e);
    e.addEventListener("click", () => {
      playSong(track, x);
    });
  });

  if (songNumber==-1) alert("No songs in this playlist");
  else {
    playSong(firstSong, x);
    currentSong.pause();
  }

  let play = document.querySelector(".playBtn");
  let pause = document.querySelector(".pauseBtn");
}

let currentSong = new Audio();

async function main() {
  // await addSongList("playlists/songs")
  await addPlaylists("playlists/playlist.json");

  // Adding event listener to song control buttons

  let play = document.querySelector(".playBtn");
  let pause = document.querySelector(".pauseBtn");

  currentSong.addEventListener("pause", () => {
    play.style.opacity = "1";
    pause.style.opacity = "0";
  });
  currentSong.addEventListener("play", () => {
    play.style.opacity = "0";
    pause.style.opacity = "1";
  });

  pause.addEventListener("click", () => {
    if (currentSong.src == "") {
      alert("Select a song first!");
      return;
    }

    if (currentSong.paused) {
      currentSong.play();
    } else {
      currentSong.pause();
    }
  });

  previous.addEventListener("click", () => {
    if (currentSong.src == "") {
      alert("Playlist is not selected");
      return;
    }
    
    let currentSongName = currentSong.src.split(`/${activePlaylist}/`)[1].replaceAll("%20"," ");
    // console.log(currentSongName)

    for (let i = 0; i < songs.length; i++) {
      if (currentSongName == songs[i]) {
        if (i != 0)
          playSong(songs[i - 1], activePlaylist);
        else
          playSong(
            songs[songs.length - 1].replaceAll("%20", " "),
            activePlaylist
          );
      }
    }
  });
  next.addEventListener("click", () => {
    if (currentSong.src == "") {
      alert("Playlist is not selected");
      return;
    }

    let currentSongName = currentSong.src.split(`/${activePlaylist}/`)[1].replaceAll("%20"," ");

    for (let i = 0; i < songs.length; i++) {
      if (currentSongName == songs[i]) {
        if (i != songs.length - 1)
          playSong(songs[i + 1].replaceAll("%20", " "), activePlaylist);
        else playSong(songs[0].replaceAll("%20", " "), activePlaylist);
      }
    }
  });

  const plusFunc1 = (plusFunc2) => {
    plus.addEventListener("click", () => {
      plus.style.right = "1vw";
      plus.style.top = "2vh";
      plus.style.transform = "rotate(45deg)";
      document.querySelector(".left").style.left = "0%";
      plusFunc2(plusFunc1);
    });
  };

  const plusFunc2 = (plusFunc1) => {
    plus.addEventListener("click", () => {
      plus.style.right = "-20vw";
      plus.style.top = "-7vh";
      plus.style.transform = "rotate(0deg)";

      document.querySelector(".left").style.left = "-39%";
      plusFunc1(plusFunc2);
    });
  };
  let mxWidth = window.matchMedia("(max-width:900px)");

  if (mxWidth.matches) {
    plusFunc1(plusFunc2);
  }

  document.querySelector(".volumeLine").addEventListener("click", (e) => {
    let w = e.target.getBoundingClientRect().width;
    console.log(e);
    document.querySelector(".volumeCircle").style.left = e.offsetX + "px";
    currentSong.volume = e.offsetX / w;

    if (currentSong.volume == 0) {
      songDuration.querySelector("img").src = "mute.svg";
    } else if (
      songDuration.querySelector("img").src ==
      "http://127.0.0.1:3000/spotify%20clone/mute.svg"
    ) {
      songDuration.querySelector("img").src = "vol.svg";
    }
  });
  currentSong.onvolumechange = () => {
    // alert(  123)

    let circlePos =
      currentSong.volume *
      document.querySelector(".volumeLine").getBoundingClientRect().width;

    document.querySelector(".volumeCircle").style.left = circlePos + "px";

    if (currentSong.volume == 0) {
      songDuration.querySelector("img").src = "mute.svg";
    } else if (
      songDuration.querySelector("img").src.endsWith("mute.svg")) {
      songDuration.querySelector("img").src = "vol.svg";
    }
  };

  songDuration.querySelector("img").addEventListener("click", (e) => {
    if (currentSong.volume != 0) {
      vol = currentSong.volume;
      e.target.src = "mute.svg";
      currentSong.volume = 0;
    } else if (vol == 0) {
      e.target.src = "vol.svg";
      currentSong.volume = 0.5;
    } else {
      e.target.src = "vol.svg";
      currentSong.volume = vol;
    }
  });

  document.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.code == "Space") {
      if (currentSong.src == "") {
        alert("Select a song first!");
        return;
      }

      if (currentSong.paused) {
        currentSong.play();
      } else {
        currentSong.pause();
      }
    }
    if (e.code == "ArrowUp")
      currentSong.volume = Math.min(1, currentSong.volume + 0.1);
    if (e.code == "ArrowDown")
      currentSong.volume = Math.max(0, currentSong.volume - 0.1);
    if (e.code == "ArrowRight") {
      if (currentSong.src == "") {
        alert("Playlist is not selected");
        return;
      }

     let currentSongName = currentSong.src.split(`/${activePlaylist}/`)[1].replaceAll("%20"," ");

      for (let i = 0; i < songs.length; i++) {
        if (currentSongName == songs[i]) {
          if (i != 0)
            playSong(songs[i - 1].replaceAll("%20", " "), activePlaylist);
          else
            playSong(
              songs[songs.length - 1].replaceAll("%20", " "),
              activePlaylist
            );
        }
      }
    }

    if (e.code == "ArrowLeft") {
      if (currentSong.src == "") {
        alert("Playlist is not selected");
        return;
      }

    let currentSongName = currentSong.src.split(`/${activePlaylist}/`)[1].replaceAll("%20"," ");

      for (let i = 0; i < songs.length; i++) {
        if (currentSongName == songs[i]) {
          if (i != songs.length - 1)
            playSong(songs[i + 1].replaceAll("%20", " "), activePlaylist);
          else playSong(songs[0].replaceAll("%20", " "), activePlaylist);
        }
      }
    }
  });

  document.querySelector(".header").addEventListener("click",()=>{
    alert("This website is just a clone, all the functionalities in the header are just prototypes and not functional.\nKindly listen to the songs and get your mood fixed! :)")
  })

  document.querySelectorAll(".underlineOnHover").forEach((e)=>{e.addEventListener("click",()=>{
    alert("No functionality added!")
  })})
}
main();
