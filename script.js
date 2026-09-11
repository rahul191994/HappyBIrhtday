// ==============================
// EDIT THESE VALUES
// ==============================
const CONFIG = {
  name: "Madam Ji",
  intro: "Today is yours. A whole little garden of wishes — for every laugh we've shared, every silly moment, and every reason you make the world brighter. Happy birthday. For a beat, and let me say it properly.",
  letter: `there's no card big enough for everything I'd like to say, so I made you a little garden — with a song, our pictures, and a few of my favourite wishes for the year ahead.

thank you for the small and unseen things — the way you make the jokes only we get, the quiet patience when I'm being too much, I noticed. I still notice.

I hope today you feel celebrated. I hope you eat something delicious that you didn't have to make, and someone tells you you're loved (you are). Most of all, I hope this year ahead feels — for one whole year — like the sun: exactly the way you've always made me feel — completely, completely loved.`,
  signature: "your friend",
  photos: [
    { emoji: "🐹🎂", caption: "the way you smile even when you pretend — I hope you never lose that.", image: "" },
    { emoji: "🌸📸", caption: "one of those little moments I would happily keep forever.", image: "" },
    { emoji: "🫶✨", caption: "some memories are small, but somehow they become the ones we remember most.", image: "" }
  ]
};

// ==============================
// APP LOGIC
// ==============================
const pages = [...document.querySelectorAll(".page")];
let current = 0;
let photoIndex = 0;

document.getElementById("name").textContent = CONFIG.name;
document.getElementById("intro").textContent = CONFIG.intro;
document.getElementById("letterGreeting").textContent = `My ${CONFIG.name},`;
document.getElementById("letterText").textContent = CONFIG.letter;
document.querySelector(".signature b").textContent = CONFIG.signature;

function showPage(index) {
  pages[current].classList.remove("active");
  current = index;
  pages[current].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  burst();
}

document.getElementById("openEnvelope").addEventListener("click", () => {
  const env = document.getElementById("openEnvelope");
  env.classList.add("open");
  setTimeout(() => showPage(1), 1000);
});

document.getElementById("toAlbum").onclick = () => showPage(2);
document.getElementById("toBouquet").onclick = () => showPage(3);
document.getElementById("toLetter").onclick = () => showPage(4);
document.getElementById("restart").onclick = () => showPage(0);

function renderPhoto() {
  const item = CONFIG.photos[photoIndex];
  const box = document.getElementById("albumPhoto");
  box.innerHTML = item.image
    ? `<img src="${item.image}" alt="Memory ${photoIndex + 1}">`
    : `<span>${item.emoji}</span>`;
  document.getElementById("photoCaption").textContent = item.caption;
  document.getElementById("photoCount").textContent =
    `MEMORY ${photoIndex + 1} / ${CONFIG.photos.length}`;
}

document.getElementById("nextPhoto").onclick = () => {
  photoIndex = (photoIndex + 1) % CONFIG.photos.length;
  renderPhoto();
};
document.getElementById("prevPhoto").onclick = () => {
  photoIndex = (photoIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  renderPhoto();
};
renderPhoto();

document.querySelectorAll(".flower").forEach(flower => {
  flower.onclick = () => {
    document.getElementById("wishBox").textContent = flower.dataset.wish;
    flower.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25) rotate(-8deg)" }, { transform: "scale(1)" }],
      { duration: 450 }
    );
  };
});

const music = document.getElementById("music");
const play = document.getElementById("playMusic");
play.onclick = async () => {
  try {
    if (music.paused) {
      await music.play();
      play.textContent = "❚❚";
    } else {
      music.pause();
      play.textContent = "▶";
    }
  } catch {
    alert("Add your MP3 as audio/song.mp3, then tap play again.");
  }
};

function burst() {
  const layer = document.getElementById("sparkles");
  const symbols = ["♡", "✦", "·", "✿"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + "%";
    s.style.top = (55 + Math.random() * 35) + "%";
    s.style.animationDelay = Math.random() * .6 + "s";
    layer.appendChild(s);
    setTimeout(() => s.remove(), 3600);
  }
}
