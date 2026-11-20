/* ---------- Session navigation ---------- */

const sessionLinks = document.querySelectorAll(".session-link");
const sessionPanels = document.querySelectorAll(".session-panel");

sessionLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.dataset.sessionTarget;

    // Activate the selected session button
    sessionLinks.forEach((item) => {
      const isActive = item === link;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    // Show the selected session and hide the others
    sessionPanels.forEach((panel) => {
      const isActive = panel.id === targetId;

      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });
  });
});

/* ---------- Session 01 video controls ---------- */

const video = document.getElementById("lectureVideo");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const back5 = document.getElementById("back5");
const forward5 = document.getElementById("forward5");

const noteItems = document.querySelectorAll("#session1 .note-item");

let playerReady = false;

if (video) {
  video.addEventListener("api-ready", () => {
    playerReady = true;
  });

  video.addEventListener("time-update", () => {
    if (!playerReady) return;

    const currentTime = video.currentTime;
    let activeItem = null;
    let latestTime = -1;

    noteItems.forEach((item) => {
      const time = Number(item.dataset.time);

      if (time <= currentTime && time >= latestTime) {
        latestTime = time;
        activeItem = item;
      }
    });

    noteItems.forEach((item) => {
      item.classList.toggle("active", item === activeItem);
    });
  });
}

/* ---------- Jump to a topic ---------- */

noteItems.forEach((item) => {
  item.addEventListener("click", async () => {
    if (!playerReady || !video) return;

    const time = Number(item.dataset.time);

    if (!Number.isFinite(time) || time < 0) return;

    try {
      video.currentTime = time;
      await video.play();
    } catch (error) {
      console.error("Could not play the selected topic:", error);
    }
  });
});

/* ---------- Back and forward 5 seconds ---------- */

if (back5) {
  back5.addEventListener("click", () => {
    if (!playerReady || !video) return;

    video.currentTime = Math.max(0, video.currentTime - 5);
  });
}

if (forward5) {
  forward5.addEventListener("click", () => {
    if (!playerReady || !video) return;

    video.currentTime = video.currentTime + 5;
  });
}

/* ---------- Fullscreen ---------- */

if (fullscreenBtn && video) {
  fullscreenBtn.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else {
        console.warn("Fullscreen is not supported on this player.");
      }
    } catch (error) {
      console.error("Fullscreen could not be opened:", error);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    fullscreenBtn.innerHTML = document.fullscreenElement
      ? "&#x2715; Exit full screen"
      : `<svg viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="1.8">
                 <path d="M8 3H5a2 2 0 0 0-2 2v3
                          M16 3h3a2 2 0 0 1 2 2v3
                          M21 16v3a2 2 0 0 1-2 2h-3
                          M3 16v3a2 2 0 0 0 2 2h3"/>
               </svg> Full screen`;
  });

  /* ---------- Session 02 video controls ---------- */

  /* ---------- Session 02 video controls and topics ---------- */

  const video2 = document.querySelector(
    '#session2 wistia-player[media-id="8uqhkjmpum"]',
  );

  const back5_2 = document.getElementById("back5_2");
  const forward5_2 = document.getElementById("forward5_2");
  const fullscreenBtn2 = document.getElementById("fullscreenBtn2");

  const noteItems2 = document.querySelectorAll("#session2 .note-item");

  let player2Ready = false;

  /* Wait until the Wistia player is ready */
  if (video2) {
    video2.addEventListener("api-ready", () => {
      player2Ready = true;
    });

    /* Highlight the current topic while the video plays */
    video2.addEventListener("time-update", () => {
      if (!player2Ready) return;

      const currentTime = video2.currentTime;
      let activeItem = null;
      let latestTime = -1;

      noteItems2.forEach((item) => {
        const time = Number(item.dataset.time);

        if (time <= currentTime && time >= latestTime) {
          latestTime = time;
          activeItem = item;
        }
      });

      noteItems2.forEach((item) => {
        item.classList.toggle("active", item === activeItem);
      });
    });
  }

  /* Jump to the selected Session 02 topic */
  noteItems2.forEach((item) => {
    item.addEventListener("click", async () => {
      if (!player2Ready) {
        console.warn("Session 02 player is not ready yet.");
        return;
      }

      const time = Number(item.dataset.time);

      if (!Number.isFinite(time) || time < 0) return;

      try {
        video2.currentTime = time;
        await video2.play();
      } catch (error) {
        console.error("Could not play the selected topic:", error);
      }
    });
  });

  /* Back and forward 5 seconds */
  if (back5_2) {
    back5_2.addEventListener("click", () => {
      if (!player2Ready) return;

      video2.currentTime = Math.max(0, video2.currentTime - 5);
    });
  }

  if (forward5_2) {
    forward5_2.addEventListener("click", () => {
      if (!player2Ready) return;

      video2.currentTime = video2.currentTime + 5;
    });
  }

  /* Fullscreen for Session 02 */
  if (fullscreenBtn2 && video2) {
    fullscreenBtn2.addEventListener("click", async () => {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else if (video2.requestFullscreen) {
          await video2.requestFullscreen();
        }
      } catch (error) {
        console.error("Fullscreen error:", error);
      }
    });
  }
}
