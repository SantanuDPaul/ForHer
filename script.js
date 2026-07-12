const heartContainer = document.getElementById("floatingHearts");

function createHeart() {

  if (!heartContainer) return;

  const heart = document.createElement("div");

  heart.className = "floating-heart";

  heart.innerHTML = "🤍";

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.animationDuration = 10 + Math.random() * 8 + "s";

  heart.style.fontSize = 10 + Math.random() * 8 + "px";

  heartContainer.appendChild(heart);

  setTimeout(() => {

    heart.remove();

  }, 18000);

}

setInterval(createHeart, 4000);

const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;

function startMusic() {
    if (musicStarted) return;

    musicStarted = true;

    bgMusic.volume = 0;

    bgMusic.play().then(() => {

        let volume = 0;

        const fade = setInterval(() => {

            volume += 0.02;

            if (volume >= 0.4) {
                volume = 0.4;
                clearInterval(fade);
            }

            bgMusic.volume = volume;

        }, 100);

    }).catch(console.error);
}

document.addEventListener(
    "click",
    startMusic,
    { once: true }
);

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

    document.addEventListener('pointerup', (e) => {

      if (!this.holdingPaper) return;

      this.holdingPaper = false;

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
