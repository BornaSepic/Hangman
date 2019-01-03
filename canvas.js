const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const flakeHolder = [];

function Flake(x, y, dx, dy, r, xl) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.r = r;
  this.xl = xl;
  this.originalX = x;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.stroke();
  };

  this.update = function() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < this.originalX - xl || this.x > this.originalX + xl) {
      this.dx = -this.dx;
    }

    if (this.y > canvas.height) {
      this.y = Math.random() - 20;
      this.x = Math.random() * canvas.width;
      this.originalX = this.x;
    }

    this.draw();
  }
}

const newFlake = new Flake(200, 100, 2, 5, 2, 5);

for (let i = 0; i < 25; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * 800;
  let dx = Math.random();
  let dy = 1;
  let r = 2;
  let xl = Math.random() * 25 + 100;
  flakeHolder.push(new Flake(x, y, dx, dy, r, xl));
  
}
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  for (let i = 0; i < flakeHolder.length; i++) {
    flakeHolder[i].update();
  }
}
animate();

canvas.addEventListener('click', function(e) {
  let x = e.x;
  let y = e.y;
  let dx = Math.random() * Math.random() < 0.5 ? -1 : 1;;
  let dy = 1;
  let r = 2;
  let xl = Math.random() * 25 + 100;
  flakeHolder.push(new Flake(x, y, dx, dy, r, xl));
});
  

window.onresize = () => {  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
