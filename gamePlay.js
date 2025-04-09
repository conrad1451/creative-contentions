const overWorldMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
  [0, 1, 2, 3, 3, 3, 3, 2, 1, 0],
  [0, 1, 2, 2, 2, 2, 2, 2, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const netherWorldMap = [
  ["stone", "stone", "stone", "stone", "stone"],
  ["stone", "fire", "lava", "fire", "stone"],
  ["stone", "lava", "obsidian", "lava", "stone"],
  ["stone", "fire", "lava", "fire", "stone"],
  ["stone", "stone", "stone", "stone", "stone"]
];

const gameState = {
  overWorld: overWorldMap,
  netherWorld: netherWorldMap,
  currentWorld: overWorldMap,
  isOverWorld: true,
  gamePlayMode: "normalMode",
  shieldsShowing: false,
  shieldsShowingCount: 0,
  heartsShowing: true,
  onFire: false,

  toggleWorld: function() {
    if (this.isOverWorld) {
      this.currentWorld = this.netherWorld;
      this.isOverWorld = false;
      console.log("Teleported to the Netherworld.");
    } else {
      this.currentWorld = this.overWorld;
      this.isOverWorld = true;
      console.log("Teleported to the Overworld.");
    }
  },

  setGamePlayMode: function(mode) {
    if (mode === "normalMode" || mode === "specialMode") {
      this.gamePlayMode = mode;
      console.log(`Game mode set to: ${this.gamePlayMode}`);
    } else {
      console.warn(`Invalid game mode: ${mode}. Please use 'normalMode' or 'specialMode'.`);
    }
  },

  isNormalMode: function() {
    return this.gamePlayMode === "normalMode";
  },

  isSpecialMode: function() {
    return this.gamePlayMode === "specialMode";
  },

  normalMode: function() {
    sunPos--;
    time++;

    var halfDayLength = 10000;

    progressTime(halfDayLength);

    strokeWeight(2);

    if (!nether) {
      if (night) {
        drawNightSky(halfDayLength);
      } else {
        drawDaySky(halfDayLength);
      }
    } else {
      // Conrad: Nether background color
      background(173, 43, 0);
    }
  },

  specialMode: function() {
    // Conrad: changes sky color for special mode
    background(10, 0, 56);

    if (!this.shieldsShowing) {
      this.shieldsShowingCount = 1000;
      this.shieldsShowing = true;
    } else {
      this.shieldsShowingCount--;

      if (this.shieldsShowingCount < 0) {
        this.heartsShowing = false;
        this.shieldsShowing = false;
        this.onFire = true;
      }
      // Conrad: changes sun color for special mode
      strokeWeight(5);
      fill(255, 255, 255);
      stroke(184, 184, 184);
      rect(300, 400 - (this.shieldsShowingCount / 10) - 200, 50, 50);
    }
  }
};

const character = {
  name: "Hero",
  health: 100,
  attackPower: 10,
  uniformArmorLevel: 3,
  inventory: [],
  position: { x: 1, y: 1 },
  bestArmorHack: false,
  armorType: {
    helmetType: "",
    shieldType: "",
    pantsType: "",
    shoesType: ""
  },

  updateArmorTypes: function() {
    if (this.bestArmorHack) {
      if (this.uniformArmorLevel === 3) {
        this.armorType.helmetType = 328;
        this.armorType.shieldType = 329;
        this.armorType.pantsType = 330;
        this.armorType.shoesType = 331;
      } else if (this.uniformArmorLevel === 2) {
        this.armorType.helmetType = 324;
        this.armorType.shieldType = 325;
        this.armorType.pantsType = 326;
        this.armorType.shoesType = 327;
      } else if (this.uniformArmorLevel === 1) {
        this.armorType.helmetType = 320;
        this.armorType.shieldType = 321;
        this.armorType.pantsType = 322;
        this.armorType.shoesType = 323;
      } else {
        this.armorType.helmetType = 332;
        this.armorType.shieldType = 333;
        this.armorType.pantsType = 334;
        this.armorType.shoesType = 335;
      }
      console.log("Best Armor Hack triggered! Armor types updated.");
    } else {
      this.armorType.helmetType = 332; 
      this.armorType.shieldType = 321; 
      this.armorType.pantsType = 330; 
      this.armorType.shoesType = 335; 
      console.log("Best Armor Hack is inactive. Armor types reset.");
    }
  },

  getEffectiveArmor: function() {
    if (this.bestArmorHack) {
      console.log("Best Armor Hack is active. Effective armor might be influenced by armor types.");
      return this.uniformArmorLevel * 10;
    } else {
      return this.uniformArmorLevel;
    }
  },

  getArmorDetails: function() {
    return `Helmet Type: ${this.armorType.helmetType}, Shield Type: ${this.armorType.shieldType}, Pants Type: ${this.armorType.pantsType}, Shoes Type: ${this.armorType.shoesType}`;
  }
};


// Example of how to call normalMode and specialMode within your game loop:
function gameLoop() {
  if (gameState.isNormalMode()) {
    gameState.normalMode();
  } else if (gameState.isSpecialMode()) {
    gameState.specialMode();
  }

  // Your other game loop logic (rendering the world, character, UI, etc.)
  // would go here. For example:
  // drawWorld();
  // showCharacter();
  // drawHUD();

  // Request the next frame (if using requestAnimationFrame)
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Example of how to switch to special mode:
// gameState.setGamePlayMode("specialMode");

// Example of how to switch back to normal mode:
// gameState.setGamePlayMode("normalMode");
