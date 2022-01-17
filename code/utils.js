export function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function loadAssets()
{
  loadSprite("bean", "sprites/bean.png")
  loadSprite("sand", "sprites/sand.png");
  loadSprite("corail", "sprites/corail.png");
  loadSprite("sable", "sprites/sable.png", {
		sliceX: 2,
	  sliceY: 1
  });
  loadSprite("piranha", "sprites/piranha.png", {
    sliceX: 21,
    sliceY: 1,
    anims: {
        down: {
            from: 0,
            to: 6,
            loop: true
        },
        right: {
            from: 7,
            to: 13,
            loop: true
        },
        up: {
            from: 14,
            to: 20,
            loop: true
        }
    },
  });
}  