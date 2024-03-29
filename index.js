const canvas = document.querySelector("canvas");
let innerwidth = 1200;
let innerHeight = 650;
canvas.width = innerwidth;
canvas.height = innerHeight;
let ctx = canvas.getContext("2d");
let GameOver = false;
let fps = 50;
let addFrame = 200;
let fpsNew = 50;
if (!GameOver) {
  let PlayerRight = {
    x: (innerWidth / 8) * 4,
    y: (innerHeight / 8) * 4,
    w: 100,
    height: 400,
    health: 100,
    attack: 10,
  };

  let PlayerLeft = {
    x: innerWidth / 8,
    y: (innerHeight / 8) * 4,
    w: 100,
    height: 400,
    health: 100,
    attack: 10,
  };

  let shopFps = 0;

  const kenjiSkills = {
    run: {
      url: "./kenji/Run.png",
      frame: 7,
    },
    run180: {
      url: "./kenji/Run180.png",
      frame: 7,
    },
    idle: {
      url: "./kenji/Idle.png",
      frame: 3,
    },
    idle180: {
      url: "./kenji/Idle180.png",
      frame: 3,
    },
    Jump: {
      url: "./kenji/Jump.png",
      frame: 1,
    },
    Fall: {
      url: "./kenji/Fall.png",
      frame: 1,
    },
    attack: {
      url: "./kenji/Attack2.png",
    },
    die: {
      url: "./kenji/Death.png",
    },
  };

  const SamuraiSkills = {
    run: {
      url: "./samuraiMack/Run.png",
      frame: 7,
    },
    run180: {
      url: "./samuraiMack/Run180.png",
      frame: 7,
    },
    idle: {
      url: "./samuraiMack/Idle.png",
      frame: 3,
    },
    idle180: {
      url: "./samuraiMack/Idle180.png",
      frame: 3,
    },
    Jump: {
      url: "./samuraiMack/Jump.png",
      frame: 1,
    },
    Fall: {
      url: "./samuraiMack/Fall.png",
      frame: 1,
    },
    attack: {
      url: "./samuraiMack/Attack2.png",
    },
    die: {
      url: "./samuraiMack/Death.png",
    },
  };

  let idle = kenjiSkills.idle.url;
  let idleLeft = SamuraiSkills.idle.url;

  function create() {
    let playerKenji = new Image();
    playerKenji.src = idle;
    ctx.drawImage(
      playerKenji,
      fps,
      10,
      100,
      200,
      PlayerRight.x,
      PlayerRight.y,
      250,
      400
    );
  }

  function createSamurai() {
    let playerSamurai = new Image();
    playerSamurai.src = idleLeft;
    ctx.drawImage(
      playerSamurai,
      fpsNew,
      10,
      100,
      200,
      PlayerLeft.x,
      PlayerLeft.y,
      250,
      400
    );
  }
  let dx = 0;
  let dxl = 0;
  let dyl = 5;
  let dy = 5;
  let velocity = 0.5;
  let up = 200;
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      idle = kenjiSkills.run180.url;
      dx = 10;
    }
    if (e.key === "ArrowLeft") {
      idle = kenjiSkills.run.url;
      dx = -10;
    }

    if (e.key === "ArrowUp") {
      PlayerRight.y -= up;
      up = 0;
      dy = 5;
    }
    if (e.key === "ArrowDown" && checked()) {
      PlayerLeft.health -= PlayerRight.attack;
      idle = kenjiSkills.attack.url;
    }
    if (e.key === "d") {
      idleLeft = SamuraiSkills.run.url;
      dxl = 10;
    }
    if (e.key === "a") {
      idleLeft = SamuraiSkills.run180.url;
      dxl = -10;
    }

    if (e.key === "w") {
      idleLeft = SamuraiSkills.run.url;
      PlayerLeft.y -= up;
      up = 0;
      dyl = 5;
    }
    if (e.key === "s" && checked()) {
      PlayerRight.health -= PlayerLeft.attack;
      idleLeft = SamuraiSkills.attack.url;
    }
  });

  window.addEventListener("keyup", () => {
    idle = kenjiSkills.idle.url;
    idleLeft = SamuraiSkills.idle.url;
    dx = 0;
    dxl = 0;
  });

  function checked() {
    let check = PlayerRight.x - PlayerLeft.x;
    let check2 = PlayerLeft.x - PlayerRight.x;
    if (check2 < 100 && check < 100) {
      return true;
    } else {
      return false;
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    if (PlayerLeft.health < 0 || PlayerRight.health < 0) {
      GameOver = true;
      attack;
    }
    PlayerRight.x += dx;
    PlayerRight.y += dy;
    dy += velocity;
    PlayerLeft.x += dxl;
    PlayerLeft.y += dyl;
    dyl += velocity;
    if (PlayerRight.y > (innerHeight / 8) * 4) {
      dy = 0;
      up = 200;
      velocity = 0;
    }
    if (PlayerLeft.y > (innerHeight / 8) * 4) {
      dyl = 0;
      up = 200;
      velocity = 0;
    }
    // clear another item
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.beginPath();
    let shop = new Image();
    shop.src = "./shop.png";
    ctx.drawImage(
      shop,
      shopFps,
      0,
      118,
      130,
      (innerWidth / 8) * 4.5,
      (innerHeight / 8) * 3.4,
      300,
      300
    );

    ctx.fillStyle = "#f01c1ce9";
    ctx.fillRect(40, 40, 400, 40);
    ctx.fill();
    ctx.fillStyle = "royalblue";
    ctx.fillRect(40, 40, 4 * PlayerLeft.health, 40);
    ctx.fill();

    // if (PlayerRight.health > 0) {
    ctx.fillStyle = "#f01c1ce9";
    ctx.fillRect((innerWidth / 8) * 4, 40, 400, 40);
    ctx.fill();
    ctx.fillStyle = "royalblue";
    ctx.fillRect((innerWidth / 8) * 4, 40, 4 * PlayerRight.health, 40);
    ctx.fill();

    createSamurai();
    create();
  }
  animate();

  
  setInterval(() => {
    if (GameOver === true && PlayerLeft.health < PlayerRight.health) {
      ctx.font = "30px Arial";
      ctx.fillText("Player 1 Win", (innerwidth / 8) * 3.5, 50);
    } else {
      ctx.font = "30px Arial";
      ctx.fillText("Player 2 Win", (innerwidth / 8) * 3.5, 50);
    }
    if (fps < kenjiSkills.Jump.frame * addFrame) {
      fps += addFrame;
    } else {
      fps = 50;
    }
    if (fpsNew < 50 * 5) {
      fpsNew += 200;
    } else {
      fpsNew = 50;
    }
    if (shopFps < 118 * 5) {
      shopFps += 118;
    } else {
      shopFps = 0;
    }
  }, 100);
}
