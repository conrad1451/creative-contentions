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
  time: 0,
  night: false,
  sunPos: 1000, // Initialize sunPos

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

  progressTime: function(halfDayLength) {
    if (this.time > halfDayLength * 1) {
      this.night = true;
    } else {
      this.night = false;
    }
    if (this.time === halfDayLength * 2) {
      this.time = 0;
    }
  },

  drawDaySky: function(halfDayLength) {
    if (this.time > 0 && this.time < 250) {
      background(255, 209, 94);
    } else {
      background(189, 206, 255);
    }

    fill(253, 255, 191);
    stroke(255, 255, 255);
    strokeWeight(5);

    if (this.time <= 5000) {
      this.sunPos -= 0.5;
      rect(300, this.sunPos / 70 + 100, 50, 50);
    } else if (this.time >= 5000) {
      this.sunPos = 1000;
      rect(300, (this.time + 3000) / 50 - 150, 50, 50);
    }
  },

  drawNightSky: function(halfDayLength) {
    background(10, 0, 56);

    fill(255, 255, 255);
    stroke(209, 209, 209);
    strokeWeight(5);

    if (this.time <= 15000) {
      this.sunPos -= 0.5;
      rect(300, this.sunPos / 70 + 100, 50, 50);
    } else if (this.time >= 1.5 * halfDayLength) {
      this.sunPos = 1000;
      rect(300, (this.time - 10800) / 50 - 150, 50, 50);
    }
  },

normalMode: function() {
  this.sunPos--;
  this.time++;

  var halfDayLength = 10000;

  this.progressTime(halfDayLength);

  strokeWeight(2);

  if (this.isOverWorld) { // Corrected condition: Overworld logic
    if (this.night) {
      this.drawNightSky(halfDayLength);
    } else {
      this.drawDaySky(halfDayLength);
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


drawDebugMenu: function(thetextSize) {
  let textColor;
  if (!this.isOverWorld || this.night) {
    textColor = color(255, 255, 255);
  } else {
    textColor = color(0, 0, 0);
  }
  fill(textColor);
  textSize(thetextSize);

  text("Minecraft Khan Academy edition " + version, 10, 0 + (20 / 13) * thetextSize);
  text("Bennimus Studios", 10, 10 + (20 / 13) * thetextSize);

  text("Key Code: " + keyCode, 10, 30 + (20 / 13) * thetextSize);
  text("Mouse Button: " + mouseButton, 10, 40 + (20 / 13) * thetextSize);

  text("Inventory: " + inventory, 10, 50 + (20 / 13) * thetextSize);
  text("Current block: " + world[a][b], 10, 60 + (20 / 13) * thetextSize);
  text("Time: " + this.time, 120, 30 + (20 / 13) * thetextSize);

  text("Sun Pos: " + this.sunPos.toFixed(0, 0), 120, 60);
  text("Crouching: " + isSitting, 120, 50 + (20 / 13) * thetextSize);

  text("Blocks generated: " + world[0].length, 120, 80);
  text("Asteroids spawned: " + mobs.length, 120, 90);
  text("Position: " + place, 240, 50);

  text("Jump: " + jump, 240, 60);
  text("Inside block: " + world[posA][posB], 240, 70);
  text("Blocks fallen: " + blocksFallen, 240, 80);

  text("x: " + posB + " (cursor " + b + ")", 10, 100);
  text("y: " + posA + " (cursor " + a + ")", 10, 110);
  text("x2: " + posB2, 10, 120);
  text("y2: " + posA2, 10, 130);

  text("Key ticks: " + keyTimer, 240, 90);
  text("Sprinting: " + isSprinting, 240, 100);
},

drawFurnaceDebugMenu: function(thetextSize) {
  let textColor;
  if (!this.isOverWorld || this.night) {
    textColor = color(255, 255, 255);
  } else {
    textColor = color(0, 0, 0);
  }
  fill(textColor);
  textSize(thetextSize);

  var choice = 0;

  if (choice === 0) {
    // furnaceDebugOpt1(thetextSize);
    // Assuming furnaceDebugOpt2 is defined elsewhere
    if (typeof furnaceDebugOpt2 === 'function') {
      furnaceDebugOpt2(thetextSize);
    } else {
      text("furnaceDebugOpt2 is not defined", 10, 10 + (20 / 13) * thetextSize);
    }
  }
},

printChest: function(curChest) {
  var fullText = "";
  for (var l = 0; l < curChest.length; ++l) {
    var theRowNow = curChest[l];
    var sectionText = "";
    for (var m = 0; m < theRowNow.length - 1; ++m) {
      var unitText = "";
      var theUnit = theRowNow[m];
      unitText += ("[" + theUnit + "]" + ", ");
      sectionText += unitText;
    }

    sectionText += ("[" + theRowNow[theRowNow.length - 1] + "]");

    println("[");
    println(sectionText);

    if (l === curChest.length - 1) {
      println("]");
    } else {
      println("],");
    }
  }
},

saveWorld: function() {
  broadcast("World saved and printed.");
  broadcast("Copy the code over var world.");
  println("var world = [");

  if (this.isOverWorld) {
    printWorld(world);
  } else {
    printWorld(overWorld);
  }

  println("var netherWorld = [");

  if (this.isOverWorld) {
    printWorld(netherWorld);
  } else {
    printWorld(world);
  }

  println("\n\n\n");

  println("var recordOfChests = [[");
  if (recordOfChests.length > 0) {
    this.printChest(recordOfChests[recordOfChests.length - 1]);
  }

  println("]]");
  println("\n\n\n");
  printInventoryData();
  keyCode = 0;
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

// Initialize gameState properties used in these methods
gameState.time = 0;
gameState.night = false;
gameState.sunPos = 1000;

// Start the game loop
requestAnimationFrame(gameLoop);

// Example of how to switch to special mode:
// gameState.setGamePlayMode("specialMode");

// Example of how to switch back to normal mode:
// gameState.setGamePlayMode("normalMode");


 ifAKeyIsPressed: function() {
    if (!chatOpened || keyCode === SHIFT) {
      keys[keyCode] = true;
    } else {
      switch (keyCode) {
        case ENTER:
          chatOpened = false;
          if (input !== "") {
            if (input.substr(0, 1) === "/") {
              executeCommands();
            } else {
              broadcast("<" + username + "> " + input);
            }
          }
          input = "";
          break;

        case 32:
          input += " ";
          break;

        case 48:
          charInput(")", "0");
          break;

        case 49:
          charInput("!", "1");
          break;

        case 50:
          charInput("@", "2");
          break;

        case 51:
          charInput("#", "3");
          break;

        case 52:
          charInput("$", "4");
          break;

        case 53:
          charInput("%", "5");
          break;

        case 54:
          charInput("^", "6");
          break;

        case 55:
          charInput("&", "7");
          break;

        case 56:
          charInput("*", "8");
          break;

        case 57:
          charInput("(", "9");
          break;

        case 65:
          charInput("A", "a");
          break;

        case 66:
          charInput("B", "b");
          break;

        case 67:
          charInput("C", "c");
          break;

        case 68:
          charInput("D", "d");
          break;

        case 69:
          charInput("E", "e");
          break;

        case 70:
          charInput("F", "f");
          break;

        case 71:
          charInput("G", "g");
          break;

        case 72:
          charInput("H", "h");
          break;

        case 73:
          charInput("I", "i");
          break;

        case 74:
          charInput("J", "j");
          break;

        case 75:
          charInput("K", "k");
          break;

        case 76:
          charInput("L", "l");
          break;

        case 77:
          charInput("M", "m");
          break;

        case 78:
          charInput("N", "n");
          break;

        case 79:
          charInput("O", "o");
          break;

        case 80:
          charInput("P", "p");
          break;

        case 81:
          charInput("Q", "q");
          break;

        case 82:
          charInput("R", "r");
          break;

        case 83:
          charInput("S", "s");
          break;

        case 84:
          charInput("T", "t");
          break;

        case 85:
          charInput("U", "u");
          break;

        case 86:
          charInput("V", "v");
          break;

        case 87:
          charInput("W", "w");
          break;

        case 88:
          charInput("X", "x");
          break;

        case 89:
          charInput("Y", "y");
          break;

        case 90:
          charInput("Z", "z");
          break;

        case 186:
          charInput(":", ";");
          break;

        case 187:
          charInput("+", "=");
          break;

        case 188:
          charInput("<", ",");
          break;

        case 189:
          charInput("_", "-");
          break;

        case 190:
          charInput(">", ".");
          break;

        case 191:
          charInput("?", "/");
          break;

        case 192:
          charInput("~", "`");
          break;

        case 219:
          charInput("{", "[");
          break;

        case 220:
          charInput("|", "\\");
          break;

        case 221:
          charInput("}", "]");
          break;

        case 222:
          charInput('"', "'");
          break;
        
        case CONTROL:
          input = input.substr(0,input.length-1);
          break;
      }
    }
};
