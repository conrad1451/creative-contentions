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
  }
};

const character = {
  name: "Hero",
  health: 100,
  attackPower: 10,
  uniformArmorLevel: 3, // Initialized to 3
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
      if (this.uniformArmorLevel === 3) { // all diamond
        this.armorType.helmetType = 328;
        this.armorType.shieldType = 329;
        this.armorType.pantsType = 330;
        this.armorType.shoesType = 331;
      } else if (this.uniformArmorLevel === 2) { // all gold
        this.armorType.helmetType = 324;
        this.armorType.shieldType = 325;
        this.armorType.pantsType = 326;
        this.armorType.shoesType = 327;
      } else if (this.uniformArmorLevel === 1) { // all iron
        this.armorType.helmetType = 320;
        this.armorType.shieldType = 321;
        this.armorType.pantsType = 322;
        this.armorType.shoesType = 323;
      } else { // all leather, lowest protection
        this.armorType.helmetType = 332;
        this.armorType.shieldType = 333;
        this.armorType.pantsType = 334;
        this.armorType.shoesType = 335;
      }
      console.log("Best Armor Hack triggered! Armor types updated.");
    } else {
      // Optionally reset armor types or keep the initial values
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
      // You might want to calculate effective armor based on the specific armor types here
      return this.uniformArmorLevel * 10; // Example of increased armor
    } else {
      return this.uniformArmorLevel;
    }
  },

  getArmorDetails: function() {
    return `Helmet Type: ${this.armorType.helmetType}, Shield Type: ${this.armorType.shieldType}, Pants Type: ${this.armorType.pantsType}, Shoes Type: ${this.armorType.shoesType}`;
  }
  // Add other character properties and methods as needed
};

// Initial state
console.log("Character:", character);
console.log("Initial Armor Details:", character.getArmorDetails());

// Activate bestArmorHack and update armor types
character.bestArmorHack = true;
character.updateArmorTypes();
console.log("\nBest Armor Hack Activated!");
console.log("Updated Armor Details:", character.getArmorDetails());
console.log("Effective Armor:", character.getEffectiveArmor());

// Deactivate bestArmorHack and update armor types
character.bestArmorHack = false;
character.updateArmorTypes();
console.log("\nBest Armor Hack Deactivated!");
console.log("Updated Armor Details:", character.getArmorDetails());
console.log("Effective Armor:", character.getEffectiveArmor());
