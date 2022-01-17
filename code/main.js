import kaboom from "kaboom"
import { maps } from "./etages"
import { entierAleatoire, loadAssets } from "./utils"

// initialize context
kaboom({
  fullscreen: true,
})

//init player vars
let MOVE_SPEED = 180

// load assets
loadAssets();

scene("game", (etage = 0) => {
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
			sprite("sand"),
			area(),
			solid(),
		],
		"c": () => [
			sprite("corail"),
			area(),
			solid(),
      scale(2),
		],
    any(ch) {
			return [
        sprite("sable", { frame: ~~rand(0, 2) }),
        scale(2)
      ]
		},
	})

  addLevel(mapLoaded, {
		width: 64,
		height: 64,
    "p": () => 
    [
      sprite("piranha"),
      area(),
      "enemy",
    ],
  })

  // ==================== MOBS ======================= 
  const player = add([
    sprite("piranha"),  // renders as a sprite
    pos(120, 80),    // position in world
    area(),          // has a collider
    solid(),
    scale(2)
  ]);

  player.onCollide("enemy", (enemy) => {
	  destroy(enemy)
    upSpeed()
  })

  // ============== DEPLACEMENTS =================

  keyDown(['left','q'], () => {
    player.flipX(true)
    player.move(-MOVE_SPEED, 0)
  })
  onKeyPress(['left','q'], () => player.play('right'))

  keyDown(['right','d'], () => {
    player.flipX(false)
    player.move(MOVE_SPEED, 0)
  })
  onKeyPress(['right','d'], () => player.play('right'))

  keyDown(['up','z'], () => { player.move(0, -MOVE_SPEED) })
  onKeyPress(['up','z'], () => player.play("up"))

  keyDown(['down','s'], () => { player.move(0, MOVE_SPEED) })
  onKeyPress(['down','s'], () => player.play("down"))

  
  onKeyPress("a", upSpeed)
})



// burp on "b"
onKeyPress("b", burp)


//boost de la vitesse
function upSpeed(){
  //if (MOVE_SPEED <= 120){MOVE_SPEED = 360}
  //else {MOVE_SPEED = 120}
  MOVE_SPEED = 360
  wait(10, () => {
    MOVE_SPEED = 120
  })
  
}

go("game")