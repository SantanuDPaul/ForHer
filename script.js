const bgMusic = document.getElementById("bgMusic");

let musicStarted = false;

let highestZ = 1;

class Paper {

  constructor() {

    this.holdingPaper = false;

    this.pointerStartX = 0;
    this.pointerStartY = 0;

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

      if (!musicStarted) {

        musicStarted = true;

        bgMusic.volume = 0.4;

        bgMusic.play();

      }

      paper.style.zIndex = highestZ;
      highestZ++;

      this.pointerStartX = e.clientX;
      this.pointerStartY = e.clientY;

      this.prevPointerX = e.clientX;
      this.prevPointerY = e.clientY;
    });

    document.addEventListener('pointermove', (e) => {

      if (!this.holdingPaper) return;

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

      this.holdingPaper = false;

    });


  }

}

const papers = Array.from(document.querySelectorAll('.paper'));

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
