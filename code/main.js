import kaboom from "kaboom"
import { maps } from "./etages"
import { entierAleatoire, loadAssets } from "./utils"


// initialize context
kaboom({
  fullscreen: true,
  font: "sinko",
  background: [76, 170, 237]
})

//init player vars
const ENEMY_SPEED = 40
const BULLET_SPEED = 100
var TABDECO = ["decoration","algues","anemone"];


// load assets
loadAssets();


// ============ MENU =============
scene("menu", () => {
    
  const background = add([
    sprite("menuBackground"),
    scale(13),
    pos(-30, -50)
  ])

  const gameTitle = add([
    text("Turtle Abyss", {size: 62, width:596}),
    pos(width()/2-292, 200),
  ])

  const startButton = add([
		rect(480, 100),
		pos(width()/2-240, 460),
    area(),
    opacity(0.5),
	]);

  const startTitle = add([
    text("Play game", {
      size: 40,
    }),
    pos(width()/2-140, 490),
  ])

  const aboutButton = add([
		rect(480, 100),
		pos(width()/2-240, 590),
    area(),
    opacity(0.5),
	]);

  const aboutTitle = add([
    text("About", {
      size: 40
    }),
    pos(width()/2-80, 620),
  ])

	startButton.onClick(() => go("game", {etage: 0}));
  aboutButton.onClick(() => go("about"));
});

// ========== ABOUT =============
scene("about" , () => {
  add([
    text("Jeu cree par : aaaaa"),
  ])

  onKeyPress("r", () => {
    go("menu");
  })
});



scene("game", ({etage}) => {
  // ============= LEVELS =================
  let level = null;

  // Debug
  const nbEtages = Object.keys(maps).length;
  console.log(`${nbEtages} étage.s`);
  for(let i = 0; i < nbEtages; i++)
  {
    let nbRandoms = Object.keys(maps[i]).length;
    console.log(`${nbRandoms} random.s pour l'étage ${i}`);
  }

  // Load level
  const etageLoaded = maps[etage];
  const nbRandomsOnEtage = Object.keys(etageLoaded).length;
  const random = entierAleatoire(0, nbRandomsOnEtage-1)
  const mapLoaded = maps[etage][random]
  console.log(`Etage: ${etage}, Random: ${random}`)
  console.log(mapLoaded)


  addLevel(mapLoaded, {
		width: 64,
		height: 64,
		pos: vec2(0, 0),
		"#": () => [
			sprite("pierre"),
			area(),
      scale(2),
			solid(),
		],
    "w": () => 
    [
      sprite("eau2"),
      scale(2)
    ],
    "s": () => 
    [
      sprite("sand", { frame: ~~rand(0, 1) }),
      scale(2)
    ]
	})

  addLevel(mapLoaded, {
		width: 64,
		height: 64,
    "p": () => 
    [
      sprite("piranha"),
      area(),
      solid(),
      scale(1.5),
      health(2),
      state("move", [ "move" ]),
      "enemy",
      "playXAnim",
      "piranha"
    ],
    "k": () => 
    [
      sprite("pieuvre"),
      area(),
      solid(),
      scale(1.5),
      health(3),
      state("move", [ "idle", "attack", "move", ]),
      "enemy",
      "playXAnim",
      "pieuvre"
    ],
    "c": () => 
    [
      sprite("crab"),
      area(),
      solid(),
      scale(1.5),
      health(2),
      "enemy",
      "playXAnim"
    ],
     "@": () => 
    [
      sprite("palme"),
      area(),
      "speedBoost",
      scale(2),
    ],
     "j": () => 
    [
      sprite("jambon"),
      area(),
      "regen",
      scale(1.5),
    ],
     "h": () => 
    [
      sprite("coeur"),
      area(),
      "pvUp",
      scale(1.5),
    ],
		"d": () => [
			sprite(TABDECO[randi(0,3)]), //TABDECO[randi(0,2)]
			area(),
      scale(2),
      "decoration"
		],
		"1": () => [
			sprite("sortie"),
			area(),
      scale(2),
      "sortie",
		],
    "*": () => 
    [
      sprite("turtle"),
      pos(120, 80),
      area(),
      solid(),
      scale(1.5),
      {
        pv: 3,
        pvMax: 3,
        move_speed: 180,
        inv: false,
        canAttak: true,
        isFrozen: false,
        freeze(frozen = true) {
          this.isFrozen = frozen;
        },
      },
      "player"
    ],
  })

  every("enemy", (e) => 
  {
    e.play("runX");

  
    e.on("death", () => {
      destroy(e);
      burp();
    })

    e.on("hurt", () => {
      play("roblox")
    })
  });

  every("decoration", (e) => {
    e.play("idle");
  })

  every("pieuvre", (e) => 
  {
    e.onStateEnter("move", () => {
      e.play("runX");
	    wait(2, () => e.enterState("idle"))
    })

    e.onStateUpdate("move", () => {
	    if (!player.exists()) return
	    const dir = player.pos.sub(e.pos).unit()
      let dir2 = dir.scale(ENEMY_SPEED);
	    e.move(dir2)
      if(dir2.x < 0) e.flipX(true);
      else e.flipX(false);
    })

    e.onStateEnter("idle", () => {
      if (!e.exists()) return
	    wait(0.5, () => e.enterState("attack"))
    })

    e.onStateEnter("attack", () => {
    	wait(0.5, () => e.enterState("move"))
      e.play("attack")
    
    	// Don't do anything if player doesn't exist anymore
    	if (!player.exists()) return
    
    	const dir = player.pos.sub(e.pos).unit()
    
    	add([
        sprite("projectil", { frame: ~~rand(0, 4) }),
    		pos(e.pos),
    		move(dir, BULLET_SPEED),
    		rect(12, 12),
    		area(),
    		cleanup(),
    		origin("center"),
    		color(CYAN),
    		"bullet",
    	])
    
    })
    
    e.enterState("move")
  })

  every("piranha", (enemy) => 
  {
    enemy.onStateUpdate("move", () => {
    	if (!player.exists()) return
    	const dir = player.pos.sub(enemy.pos).unit()
      let dir2 = dir.scale(ENEMY_SPEED);
    	enemy.move(dir2)
      if(dir2.x < 0) enemy.flipX(true);
      else enemy.flipX(false);
    })
  })
 
  // ==================== Player ======================= 
  const player = get("player")[0];
  camScale(2)

  player.onCollide("speedBoost", (speedBoost) => {
	  destroy(speedBoost)
    upSpeed()
  })

    player.onCollide("regen", (regen) => {
	  
    if (player.pv != player.pvMax){
      destroy(regen)
      player.pv += 1
      }
    pvLabel.text = player.pv+ "/" +player.pvMax
  })
  
  player.onCollide("enemy", (enemy) => {
    takeDamage(-1)
    //pvLabel.text = player.pv+ "/" +player.pvMax
  })
  player.onCollide("bullet", (bullet) => {
    takeDamage(-1)
    destroy(bullet)
    //pvLabel.text = player.pv+ "/" +player.pvMax
  })


  every("morsure", (e) => {
    e.play("mord");
  })

  onKeyPress("space", () => {
    if(player.canAttak){
      let max = 80;
      let en = null;
      let distanceEn = 100000 
      every("enemy", (enemy) => {
        if(player.pos.dist(enemy.pos) <= max){
          if(player.pos.dist(enemy.pos) <= distanceEn){
            distanceEn = player.pos.dist(enemy.pos)
            en = enemy
          }
        }
      })

      const mordre = add([
        pos(),
        sprite("morsure"),
        origin("bot"),
        rotate(0),
        follow(player, vec2(-4, 9)),
      ])
      wait(0.75, () => {
        destroy(mordre)
      })
      if (en != null){
        en.hurt(1)
      }
    }
    
  })

  player.onCollide("decoration", () => {
    player.move_speed -= 100;
    wait(0.75, () => {
      player.move_speed += 100;
    })
  });
  
  player.onCollide("pvUp", (pvUp) => {
    destroy(pvUp)
    player.pv += 1
    player.pvMax += 1
    pvLabel.text = player.pv+ "/" +player.pvMax
  })

  player.onCollide("sortie", () => {
    go("game", {etage: etage+1});
  })
  
  // ============== DEPLACEMENTS =================
  keyDown(['left','q'], () => {
    if (player.isFrozen) return;
    player.flipX(true)
    player.move(-player.move_speed, 0)
  })

  keyDown(['right','d'], () => {
    if (player.isFrozen) return;
    player.flipX(false)
    player.move(player.move_speed, 0)
  })

  keyDown(['up','z'], () => { 
    if (player.isFrozen) return;
    player.flipY(true);
    player.move(0, -player.move_speed) 
  })
  
  keyDown(['down','s'], () => { 
    if (player.isFrozen) return;
    player.flipY(false);
    player.move(0, player.move_speed)
  })
  
  

  onKeyPress(['left','q', 'right','d', 'up','z', 'down','s'], () => {
    if (player.isFrozen) return;
    if(isKeyDown("left") || isKeyDown("q") || isKeyDown("right") || isKeyDown("d")) 
    {
      player.play("runX");
    }
    else if(isKeyDown("up") || isKeyDown("z") || isKeyDown("down") || isKeyDown("s"))
    {
      player.play("runY");
    }
  })

  player.onUpdate(() => {
	  camPos(player.pos)
  })
  

  if(etage === 0)
  {
    showDialog("Animation en cours...", 2);
    wait(2, () => 
    {
      showDialog("La tortue nait et rejoint la mer", 3)
    });
    
    wait(15, () => 
    {
      showDialog("Navigation vers la premiere profondeur", 3)
    });
    player.freeze();
    let c = 0;
    
    loop(0.2, () => {
      if(c >= 0 && c < 10) player.move(0, player.move_speed*2);
      else if(c >= 10 && c < 13)
      {
        player.play("runX");
        player.move(player.move_speed*2, 0);
      }
      else if(c >= 13 && c < 40) 
      {
        player.play("runY");
        player.move(0, player.move_speed*2);
      }
      else if(c >= 40 && c < 50) 
      {
        player.play("runX");
        player.flipX(true);
        player.move(-player.move_speed*2, 0);
      }
      else if(c >= 50 && c < 95) 
      {
        player.play("runY");
        player.flipX(false);
        player.move(0, player.move_speed*2);
      }
      else if(c == 95) go("game", { etage: 1 })
      c++;
    })
    //go("game", { etage: 1 })
  }

  //fonction de perte de point de vie (pour la mort aussi)
  function takeDamage(nb){
    if (nb >0) {
      if (player.pv < player.pvMax){
        player.pv += nb
      }
    }
    if(!player.inv){
      player.pv += nb
      shake();
      player.inv = true
      wait(1, () => {
        player.inv = false
      })
    }
    pvLabel.text = player.pv + "/" + player.pvMax;
    if (player.pv == 0) go("menu");
  }

   const pvLabel = add([
    sprite("coeur"),
  	text(player.pv + "/" + player.pvMax),
  	pos(12),
    scale(1.8),
    fixed(),
  ])

  function upSpeed(){
    player.move_speed += 80
  }
  
  onKeyPress("a", upSpeed)
  onKeyPress("b", burp)
  onKeyPress("r", () => {
    go("menu");
  })
})

function showDialog(message = "", delay = 2)
{
  console.log("Dialogue: " + message + ` ${delay}s`)
  // Text bubble
  let textbox = add([
  	rect(width() - 200, 80, { radius: 32 }),
  	origin("center"),
  	pos(center().x, height() - 60),
  	outline(2),
    area(),
    color(0, 0, 0),
    opacity(0.25),
    fixed(),
    "dialogs"
  ])
  
  // Text
  let txt = add([
  	text(message, { size: 32, width: width() - 230 }),
  	pos(textbox.pos),
  	origin("center"),
    fixed(),
    "dialogs"
  ])
  
  textbox.onClick(() => {
    destroyAll("dialogs")
  })

  wait(delay, () => {
    destroyAll("dialogs")
  })
}

go("menu")