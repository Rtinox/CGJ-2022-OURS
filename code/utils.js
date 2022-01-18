export function entierAleatoire(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function loadAssets() {
  loadSound("roblox", "sounds/bruitRoblox.mp3");
  loadSprite("bean", "sprites/bean.png");
  loadSprite("wall", "sprites/wall.png");
  loadSprite("decoration", "sprites/decoration.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 7,
        loop: true,
        pingpong: true,
      },
    },
  });
  loadSprite("pierre", "sprites/pierre.png", {
    sliceX: 2,
    sliceY: 1
  });
  loadSprite("jambon", "sprites/jambon.png");
  loadSprite("palme", "sprites/palme.png");
  loadSprite("coeur", "sprites/coeur.png");
  loadSprite("harpon", "sprites/harpon.png");
  loadSprite("perle", "sprites/perle.png");
  loadSprite("courone", "sprites/courone.png");
  loadSprite("trident", "sprites/trident.png");
  loadSprite("anemone", "sprites/anemone.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 7,
        loop: true,
        pingpong: true,
      }
    }
  });
  loadSprite("menuBackground", "sprites/menuBackground.png");
  loadSprite("sortie", "sprites/sortie.png");
  loadSprite("eau2", "sprites/eau2.png");
  loadSprite("eau", "sprites/eau.png", {
    sliceX: 3,
    sliceY: 1
  });
  loadSprite("algues", "sprites/algues.png", {
    sliceX: 8,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 7,
        loop: true,
        pingpong: true,
      },
    },
  });
  loadSprite("mur", "sprites/mur.png", {
    sliceX: 2,
    sliceY: 1
  });
  loadSprite("murSable", "sprites/murSable.png", {
    sliceX: 2,
    sliceY: 1
  });
  loadSprite("sand", "sprites/sand.png", {
    sliceX: 2,
    sliceY: 1
  });
  loadSprite("projectil", "sprites/projectil.png", {
    sliceX: 4,
    sliceY: 1
  });
  loadSprite("trident", "sprites/trident.png", {
    sliceX: 4,
    sliceY: 1
  });
  loadSprite("morsure", "sprites/morsure.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
      mord: {
        from: 0,
        to: 5,
        loop: true
      }
    }
  });
  loadSprite("piranha", "sprites/piranha.png", {
    sliceX: 24,
    sliceY: 1,
    anims: {
      runY: {
        from: 0,
        to: 6,
        loop: true
      },
      runX: {
        from: 7,
        to: 13,
        loop: true
      },
      damageX: {
        from: 14,
        to: 18,
        loop: false
      },
      damageX: {
        from: 19,
        to: 23,
        loop: false
      },
    },
  });
  loadSprite("turtle", "sprites/turtle.png", {
    sliceX: 22,
    sliceY: 1,
    anims: {
      runX: {
        from: 6,
        to: 11,
        loop: true,
      },
      runY: {
        from: 0,
        to: 5,
        loop: true,
      },
      damageX: {
        from: 12,
        to: 16,
        loop: false,
      },
      damageX: {
        from: 17,
        to: 21,
        loop: false,
      }
    },
  });
  loadSprite("crab", "sprites/crab.png", {
    sliceX: 12,
    sliceY: 1,
    anims: {
      runX: {
        from: 6,
        to: 11,
        loop: true
      },
      runY: {
        from: 0,
        to: 5,
        loop: true
      }
    },
  });
  loadSprite("pieuvre", "sprites/pieuvre.png", {
    sliceX: 19,
    sliceY: 1,
    anims: {
      runX: {
        from: 0,
        to: 3,
        loop: true
      },
      runY: {
        from: 0,
        to: 3,
        loop: true
      },
      attack: {
        from: 4,
        to: 7,
        loop: false
      },
      damage: {
        from: 14,
        to: 18,
        loop: false
      }
    },
  });
}

export function crabeMouvement(speed = 60, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isTop() || col.isBottom()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(0, speed * dir)
		},
	}
}