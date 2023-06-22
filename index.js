/**@type{HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];
let numOfParticles = canvas.width * 0.5;

let grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
grad.addColorStop(0, "pink");
grad.addColorStop(0.5, "red");
grad.addColorStop(1, "magenta");

class PushRing {
  constructor() {
    this.radius = 60;
    this.x = canvas.width * 0.5;
    this.y = canvas.height * 0.5;
    this.vx = Math.floor(Math.random() * 6 - 3);
    this.vy = Math.floor(Math.random() * 6 - 3);
  }
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    //edges
    if (this.x + this.radius > canvas.width || this.x < this.radius) {
      this.vx = this.vx * -1;
    }
    if (this.y + this.radius > canvas.height || this.y < this.radius) {
      this.vy = this.vy * -1;
    }
  }
}

const pushRing = new PushRing();
class Particle {
  constructor() {
    this.radius = Math.random() * 0.5 + 0.5;
    this.minRadius = this.radius;
    this.maxRadius = this.radius * 50;
    this.x =
      Math.random() * (canvas.width - this.radius * 2) -
      this.radius * 2 +
      this.radius * 2;
    this.y =
      Math.random() * (canvas.height - this.radius * 2) -
      this.radius * 2 +
      this.radius * 2;
    this.vx = Math.floor(Math.random() * 0.2 - 0.1);
    this.vy = Math.floor(Math.random() * 0.2 - 0.1);
  }
  draw() {
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.strokeRect = "black";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.arc(
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.3,
      this.radius * 0.6,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    //edges
    if (this.x + this.radius > canvas.width || this.x < this.radius) {
      this.vx = this.vx * -1;
    }
    if (this.y + this.radius > canvas.height || this.y < this.radius) {
      this.vy = this.vy * -1;
    }
    //inflate
    let dx = this.x - pushRing.x;
    let dy = this.y - pushRing.y;
    let distance = Math.hypot(dx, dy);
    if (distance < pushRing.radius && this.radius < this.maxRadius) {
      this.radius += 3;
    }

    if (this.radius > this.minRadius) {
      this.radius -= 0.3;
    }
  }
}

function initParticles() {
  for (let i = 0; i < numOfParticles; i++) {
    particleArray.push(new Particle());
  }
}
initParticles();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });
  pushRing.draw();
  pushRing.update();

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", (e) => {
  location.reload();
});
