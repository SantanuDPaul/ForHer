const petalContainer = document.getElementById("floatingPetals");

function createPetal() {

  if (!petalContainer) return;

  const petal = document.createElement("div");

  petal.className = "floating-petal";

  petal.style.left = Math.random() * 100 + "vw";

  petal.style.animationDuration = (10 + Math.random() * 8) + "s";

  petal.style.animationDelay = Math.random() * 2 + "s";

  petal.style.transform = `scale(${0.6 + Math.random() * 0.8})`;

  petalContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 18000);

}

setInterval(createPetal, 1800);

const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;

function fadeMusic(targetVolume = 0.4, duration = 2000) {

  const startTime = performance.now();
  bgMusic.volume = 0;

  function update(currentTime) {

    const progress = Math.min((currentTime - startTime) / duration, 1);

    const eased = progress * progress;

    bgMusic.volume = targetVolume * eased;

    if (progress < 1) {
      requestAnimationFrame(update);
    }

  }

  requestAnimationFrame(update);

}

function startMusic() {

  if (musicStarted) return;

  musicStarted = true;

  const intro = document.getElementById("introOverlay");

  if (intro) {
    intro.classList.add("hide");

    setTimeout(() => {
      intro.remove();
    }, 800);
  }

  bgMusic.volume = 0;

  bgMusic.play().catch(console.error);

  bgMusic.addEventListener(
    "playing",
    () => {
      fadeMusic();
    },
    { once: true }
  );

}

document.addEventListener("pointerup", startMusic, { once: true, passive: true });

let highestZ = 1;

class Paper {

  constructor() {

    this.holdingPaper = false;

    this.pointerX = 0;
    this.pointerY = 0;

    this.prevPointerX = 0;
    this.prevPointerY = 0;

    this.velX = 0;
    this.velY = 0;

    this.currentPaperX = Math.random() * 50 - 25;
    this.currentPaperY = Math.random() * 50 - 25;

    this.rotation = Math.random() * 30 - 15;

  }

  init(paper) {
    paper.style.transform =
      `
      translateX(${this.currentPaperX}px)
      translateY(${this.currentPaperY}px)
      rotateZ(${this.rotation}deg)
      `;
    paper.addEventListener('pointerdown', (e) => {

      if (paper.classList.contains('heart')) return;

      this.holdingPaper = true;

      e.preventDefault();

      paper.style.zIndex = highestZ;
      highestZ++;

      if (paper.classList.contains("image")) {
        paper.style.boxShadow = "0 22px 45px rgba(0,0,0,.35)";
      }

      this.prevPointerX = e.clientX;
      this.prevPointerY = e.clientY;
    });

    document.addEventListener('pointermove', (e) => {

      if (!this.holdingPaper) return;

      if (this.holdingPaper && !musicStarted) {
        startMusic();
      }

      e.preventDefault();

      this.pointerX = e.clientX;
      this.pointerY = e.clientY;

      this.velX = this.pointerX - this.prevPointerX;
      this.velY = this.pointerY - this.prevPointerY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      this.prevPointerX = this.pointerX;
      this.prevPointerY = this.pointerY;

      paper.style.transform =
        `translateX(${this.currentPaperX}px)
     translateY(${this.currentPaperY}px)
     rotateZ(${this.rotation}deg)`;
    });

    document.addEventListener('pointerup', () => {

      if (!this.holdingPaper) return;

      this.holdingPaper = false;

      if (paper.classList.contains("image")) {
        paper.style.boxShadow = "0 12px 28px rgba(0,0,0,.22)";
      }

    });

  }

}

const papers = [...document.querySelectorAll(".paper")];

papers.forEach(paper => {

  if (paper.classList.contains('heart')) return;

  const p = new Paper();

  p.init(paper);

});

const heart = document.getElementById("heartLetter");
const modal = document.getElementById("letterModal");
const closeBtn = document.getElementById("closeLetter");

if (heart && modal) {

  heart.addEventListener("click", () => {


    modal.classList.add("show");


  });

}

if (closeBtn) {

  closeBtn.addEventListener("click", () => {


    modal.classList.remove("show");


  });
  modal.addEventListener("click", (e) => {

    if (e.target === modal) {
      modal.classList.remove("show");
    }

  });

}
