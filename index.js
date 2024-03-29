const canvas = document.querySelector("canvas");
let innerwidth = 1200;
let innerHeight = 650;
let imageSrc = "./pacMan.jpg";
canvas.width = innerwidth;
canvas.height = innerHeight;
let graphhic = canvas.getContext("2d");
let velocity = 0.5;
let y = 1;
let ry = 1;
let attack = 10;

let fighter = new Image();
fighter.src = "./kenji/Run.png";
let fighterSlide = 200;

let leftPlayer = {
  x: innerWidth / 8,
  y: innerHeight - 300,
  width: innerWidth / 16,
  height: 300,
  health: 100,
};
let rightPlayer = {
  x: (innerWidth / 8) * 3,
  y: innerHeight - 300,
  width: innerWidth / 16,
  height: 300,
  health: 100,
};

let isFight = false;
let GameOver = false;
let LisRun = false;
function CreateLeftPlayer(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.draw = (draw) => {
    graphhic.clearRect(0, 0, innerWidth, innerHeight);
    graphhic.beginPath();
    graphhic.rect(x, y, width, height);
    graphhic.fill();
  };
}

window.addEventListener("keydown", (e) => {
  console.log(rightPlayer.x);
  console.log(leftPlayer.x);
  if (!GameOver) {
    if (e.key === "ArrowRight") {
      rightPlayer.x += rightPlayer.width;
    }
    if (e.key === "ArrowLeft") {
      rightPlayer.x -= rightPlayer.width;
    }
    if (e.key === "ArrowUp") {
      y = 1;
      rightPlayer.y -= rightPlayer.height;
    }
    if (e.key === "ArrowDown" && isFight) {
      fighter.src = "./kenji/Attack1.png";
      fighterSlide = 0;
      LRun = 250;
      leftPlayer.health -= 10;
    }

    if (e.key === "d") {
      leftPlayer.x += leftPlayer.width;
      LisRun = true;
    }
    if (e.key === "a") {
      leftPlayer.x -= leftPlayer.width;
      LisRun = true;
    }
    if (e.key === "w") {
      ry = 1;
      leftPlayer.y -= leftPlayer.height;
    }
    if (e.key === "s" && isFight) {
      rightPlayer.health -= 10;
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "d") {
    LisRun = false;
  }
  if (e.key === "a") {
    LisRun = false;
  }
  // if (e.key === "w") {
  //   ry = 1;
  // }
  // if (e.key === "s" && isFight) {
  //   rightPlayer.health -= 10;
  // }
});

let cutImage = 0;
let LRun = 50;
function animate() {
  requestAnimationFrame(animate);
  let player = new CreateLeftPlayer(
    leftPlayer.x,
    leftPlayer.y,
    leftPlayer.width,
    leftPlayer.height
  );
  player.draw();
  if (rightPlayer.y < innerHeight - rightPlayer.height - 10) {
    rightPlayer.y += y;
    y += 0.5;
  }
  if (leftPlayer.y < innerHeight - leftPlayer.height - 10) {
    leftPlayer.y += ry;
    ry += 0.5;
  }
  if (leftPlayer.health > 0) {
    graphhic.rect(40, 0, 4 * leftPlayer.health, 40);
    graphhic.fill();
  }
  graphhic.rect(
    innerwidth - 4 * rightPlayer.health - 40,
    0,
    4 * rightPlayer.health,
    40
  );
  graphhic.fill();
  graphhic.drawImage(
    fighter,
    LRun,
    50,
    100,
    100,
    rightPlayer.x,
    rightPlayer.y,
    250,
    300
  );
  let check = rightPlayer.x - leftPlayer.x;
  let check2 = leftPlayer.x - rightPlayer.x;

  if (rightPlayer.health <= 0 || leftPlayer.health <= 0) {
    GameOver = true;
  } else {
    GameOver = false;
  }
  if (check2 < 200 && check < 200) {
    isFight = true;
  } else {
    isFight = false;
  }


  // shop
  let shop = new Image();
  shop.src = "./shop.png";
  graphhic.drawImage(
    shop,
    cutImage,
    0,
    118,
    125,
    innerwidth - 300,
    innerHeight - 340,
    250,
    250
  );

  graphhic.fill();
}
setInterval(() => {
  if (cutImage < 118 * 5) {
    cutImage += 118;
  } else {
    cutImage = 0;
  }
  if (LisRun && LRun < 1450) {
    LRun += fighterSlide;
  } else {
    LRun = 50;
  }
}, 100);
animate();