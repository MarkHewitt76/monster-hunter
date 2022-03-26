// Wait for the DOM to finish loading before running
// Get the elements with a class of "btn" & add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    hideMutableElements();
    let buttons = document.getElementsByClassName("btn");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if ((this.id === "start-btn") || (this.id === "next-level-btn")) {
                startGame();
            } else if (this.id === "monsters-btn") {
                displayAllMonsters();
            } else if (this.id === "rules-btn") {
                displayRules();
            } else if (this.id === "choose-weapon-btn") {
                displayWeapons();
            } else if (this.id === "restart-btn") {
                startOver();
            } else if (this.id === "quit-btn") {
                quit();
            } else { // it's a weapon button
                /* innerText is used here because it's imperative for
                   the proper functioning of resolveBattle() that the
                   returned string matches the values in the weaknesses 
                   array EXACTLY */
                let weapon = this.innerText;
                resolveBattle(weapon);
            }
        })
    }
});

/**
 * Builds and returns a nested data structure comprising 
 * a list (array) of all monsters (objects) by level (array).
 */
 function generateMonsterArray() {
    let levelOneMonsters = [
        {
            name: 'Aglee',
            image: 'assets/images/aglee.jpg',
            weaknesses: ['Dagger', 'Poisoned Blade', 'Pistol'],
            designer: 'Nathan'
        },
        {
            name: 'Agzel',
            image: 'assets/images/agzel.jpg',
            weaknesses: ['Sword', 'Flame Axe', 'Sub-Machine Gun'],
            designer: 'Nathan'
        },
        {
            name: 'Armoul',
            image: 'assets/images/armoul.jpg',
            weaknesses: ['Axe', 'Ice-Tipped Arrow', 'Shotgun'],
            designer: 'Nathan'
        },
        {
            name: 'Pinky',
            image: 'assets/images/pinky.jpg',
            weaknesses: ['Bow & Arrow', 'Flame Axe', 'Sub-Machine Gun'],
            designer: 'Caoimhin'
        },
        {
            name: 'Serpent',
            image: 'assets/images/serpent.jpg',
            weaknesses: ['Dagger', 'Axe', 'Poisoned Blade'],
            designer: 'Nathan'
        }
    ];

    let levelTwoMonsters = [
        {
            name: 'Astaroth',
            image: 'assets/images/astaroth.jpg',
            weaknesses: ['Axe', 'Shotgun'],
            designer: 'Caoimhin'
        },
        {
            name: 'Hopper',
            image: 'assets/images/hopper.jpg',
            weaknesses: ['Bow & Arrow', 'Sub-Machine Gun'],
            designer: 'Nathan'
        },
        {
            name: 'Spectreco',
            image: 'assets/images/spectreco.jpg',
            weaknesses: ['Sword', 'Pistol'],
            designer: 'Nathan'
        },
        {
            name: 'Stompoxer',
            image: 'assets/images/stompoxer.jpg',
            weaknesses: ['Flame Axe', 'Shotgun'],
            designer: 'Nathan'
        },
        {
            name: 'Tentaclucker',
            image: 'assets/images/tentaclucker.jpg',
            weaknesses: ['Ice-Tipped Arrow', 'Poisoned Blade'],
            designer: 'Nathan'
        }
    ];

    let levelThreeMonsters = [
          /* Weaknesses defined as a single item array to allow for
           adding more in future implementations */
        {
            name: 'Cacodemon',
            image: 'assets/images/cacodemon.jpg',
            weaknesses: ['Axe'],
            designer: 'Caoimhin'
        },
        {
            name: 'Demon',
            image: 'assets/images/demon.jpg',
            weaknesses: ['Poisoned Blade'],
            designer: 'Nathan'
        },
        {
            name: 'Dragon',
            image: 'assets/images/dragon.jpg',
            weaknesses: ['Bow & Arrow'],
            designer: 'Nathan'
        },
        {
            name: 'Ice Dragon',
            image: 'assets/images/ice_dragon.jpg',
            weaknesses: ['Flame Axe'],
            designer: 'Nathan'
        },
        {
            name: 'Scorcher',
            image: 'assets/images/scorcher.jpg',
            weaknesses: ['Ice-Tipped Arrow'],
            designer: 'Nathan'
        }
    ];

    let allMonsters = [levelOneMonsters, levelTwoMonsters, levelThreeMonsters];
    return allMonsters;
}

/**
 * Gets the array returned by generateMonsterArray() and passes it to 
 * generateMonsterGalleryHtml(), takes the result and writes it
 * to the DOM as a 'gallery' of all monsters, then displays ONLY 
 * that gallery when the 'Meet the Monsters' button is clicked.
 */
 function displayAllMonsters() {
    let allMonsters = generateMonsterArray();

    let monsterHtml = [];
    for (let monsters of allMonsters) {
        monsterHtml.push(generateMonsterGalleryHtml(monsters));
    }

    let monsterGalleryDiv = document.getElementsByClassName("monster-gallery-div");
    for (let i in monsterHtml) {
        monsterGalleryDiv[i].innerHTML = monsterHtml[i];    
    }

    hideMutableElements();
    let monsterGallery = document.getElementById("monster-gallery");
    monsterGallery.style.display = "";
}

/**
 * Operates on the array of 'monster' objects passed to it, in 
 * order to generate and return the html for the 
 * 'Meet the Monsters' section.
 */
function generateMonsterGalleryHtml (monsterArray) {
    let monsterHtml = "";

    for (let monster of monsterArray) {
        monsterHtml += `
        <figure class="monster-image">
            <figcaption>${monster.name}</figcaption>
            <img src="${monster.image}" alt="A drawing of the ${monster.name} monster by ${monster.designer}">
        </figure>
        `;
    }
    
    return monsterHtml;
}

/**
 * Displays ONLY the list of rules when the
 * 'Read the Rules' button is clicked.
 */
function displayRules() {
    hideMutableElements();
    let rules = document.getElementById("rules");
    rules.style.display = "";
}

/**
 * Hides all elements with the class of
 * "mutable-element".
 */
function hideMutableElements() {
    let hiddenElements = document.getElementsByClassName("mutable-element");
    for (let element of hiddenElements) {
        if (element.style.display !== "none") {
            element.style.display = "none";
        }
    }
}

/**
 * The main game function, called by the click events 
 * on both the Let's Hunt! and Next Level buttons.
 * Sets the initial states for the  attacks counter 
 * and increments the level counter each time it's called. 
 * Displays ONLY the main game section with a
 * random monster written in by displayRandomMonster().
 */
function startGame() {
    hideMainDivs();
    hideMutableElements();

    let mainGame = document.getElementById("game-main");
    let arena = document.getElementById("arena");
    mainGame.style.display = "";
    arena.style.display = "";

    document.getElementById("attacks").textContent = "3";

    incrementLevel();
    displayRandomMonster();
}

/**
 * Let's the user restart the game from level one.
 * Called with the 'click' event on the Start Over button.
 */
function startOver() {
    document.getElementById("level").textContent = "0"; 
    startGame();
}

/**
 * Hides all elements with the class of
 * "mutable".
 */
function hideMainDivs() {
    let hiddenDivs = document.getElementsByClassName("mutable");
    for (let mutableDiv of hiddenDivs) {
        if (mutableDiv.style.display !== "none") {
            mutableDiv.style.display = "none";
        }
    }
}

/**
 * Takes the array returned by generateMonsterArray(), reads 
 * the current level from the DOM and uses Math.random to 
 * return a single, random monster object based on that level.
 */
function getRandomMonster() {
    let allMonsters = generateMonsterArray();
    let level = document.getElementById("level").textContent;

    let monsters;
    if (level === "1") {
        monsters = allMonsters[0];
    } else if (level === "2") {
        monsters = allMonsters[1];
    } else if (level === "3") {
        monsters = allMonsters[2];
    } else {
        alert(`Error! Undefined level: ${level}. Please refresh the page.`);
        throw `Error! Undefined level: ${level}. Aborting!`;
    }

    return monsters[Math.floor(Math.random() * monsters.length)];
}

/**
 * Sets the initial state for the attacks counter.
 * Takes the monster object returned by getRandomMonster()
 * and writes its relevant values to the DOM.
 */
function displayRandomMonster() {
    hideMutableElements();
    let arena = document.getElementById("arena");
    arena.style.display = "";
    document.getElementById("attacks").textContent = "3";
    
    let monster = getRandomMonster();

    let monsterName = monster.name;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `You are hunting the <span id="active-monster-name">${monsterName}</span> monster!`;

    let image = document.getElementById("active-monster-img");
    image.innerHTML = `
    <img src="${monster.image}" alt="A drawing of the ${monster.name} monster by ${monster.designer}">
    `;
    image.style.display = "";
}

/**
 * Hides the active monster image and displays the weapon buttons.
 */
 function displayWeapons() {
    let monsterImage = document.getElementById("active-monster-img");
    monsterImage.style.display = "none";
    let weaponsList = document.getElementById("weapons-list");
    weaponsList.style.display = "";
}

/**
 * Reads the active monster's name from the DOM, searches 
 * for it in the monster array and returns the matching 
 * monster object.
 */
 function getActiveMonster() {
    let activeMonster = document.getElementById("active-monster-name").textContent;
    let allMonsters = generateMonsterArray();
    
    let monster;
    for (let x in allMonsters) {
        let monsters = allMonsters[x];
        for (let y in monsters) {
            if (monsters[y].name === activeMonster) {
                monster = monsters[y];
            }
        }
    }

    return monster;
}

/**
 * Gets the active monster's weaknesses from getActiveMonster(),
 * compares them with the weapon passed in by the 'click'
 * event listener and calls the appropriate response.
 */
function resolveBattle(weapon) {
    console.log(weapon);
    let weaknesses = getActiveMonster().weaknesses;
    console.log(weaknesses);
    if (weaknesses.includes(weapon) === false) {
        decrementAttacks();
        displayFailureMessage(weapon);
    } else {
        displayWinMessage(weapon);
    }
}

/**
 * Reduces the number of remaining attacks by 1.
 */
function decrementAttacks() {
    let attacks = parseInt(document.getElementById("attacks").textContent);
    document.getElementById("attacks").textContent = --attacks;
}

/**
 * Calls for the failure message displayed by the 
 * functions below, based on the number of remaining
 * attacks.
 */
function displayFailureMessage(weapon) {
    let attacks = document.getElementById("attacks").textContent;
    if (attacks === "2") {
        failureMessage1(weapon);
    } else if (attacks === "1") {
        failureMessage2(weapon);
    } else if (attacks === "0") {
        defeatMessage(weapon);
    } else {
        alert(`Error! Undefined number: ${attacks}. Please refresh the page.`);
        throw `Error! Undefined number: ${attacks}. Aborting!`;
    }
}

/**
 * Displays the outcome of the user's first failed attempt:
 * gives a warning message and enlarges the image of the
 * active monster.
 */
function failureMessage1(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> HAD NO EFFECT! The <span id="active-monster-name">${monsterName}</span> monster is now hunting you!`;

    let image = document.getElementById("active-monster-img").children[0];
    image.style.width = "200px";
}

/**
 * Displays the outcome of the user's second failed attempt:
 * a new warning message and the monster image gets bigger.
 */
function failureMessage2(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> HAD NO EFFECT! The <span id="active-monster-name">${monsterName}</span> monster almost had you that time!`;

    let image = document.getElementById("active-monster-img").children[0];
    image.style.width = "250px";
}

/**
 * Hides the main game area and displays a commiseration 
 * message and animated gif upon losing the game.
 */
function defeatMessage(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> HAD NO EFFECT! The <span id="active-monster-name">${monsterName}</span> monster took one last swipe at you before escaping. Better luck next time!`;

    hideMutableElements();
    let finalOutcome = document.getElementById("win-lose-img");
    finalOutcome.style.display = "";
    finalOutcome.innerHTML = `<img src="assets/images/upset_emoji.gif" alt="An animated emoji, crying and thumping its fists">`;
}

/**
 * Calls for the success message displayed by the 
 * functions below, based on the current level.
 */
function displayWinMessage(weapon) {
    let level = document.getElementById("level").textContent;
    if (level === "1") {
        winMessage1(weapon);
    } else if (level === "2") {
        winMessage2(weapon);
    } else if (level === "3") {
        victoryMessage(weapon);
    } else {
        alert(`Error! Undefined level: ${level}. Please refresh the page.`);
        throw `Error! Undefined level: ${level}. Aborting!`;
    }
}

/**
 * Hides the main game area and displays a congratulatory
 * message and animated gif upon passing level 1. 
 * Reveals the Next Level button for the user to progress.
 */
function winMessage1(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> WORKED! The <span id="active-monster-name">${monsterName}</span> monster didn't stand a chance! Are you ready for the next one?`;

    hideMutableElements();
    let conratsImage = document.getElementById("win-lose-img");
    conratsImage.style.display = "";
    conratsImage.innerHTML = `<img src="assets/images/angry_skeleton.gif" alt="An animated image of a skeleton in a coffin saying, 'Leave me alone, I'm dead'">`;

    let nextLevelBtn = document.getElementById("next-level-btn");
    nextLevelBtn.style.display = "";
}

/**
 * Hides the main game area and displays a congratulatory
 * message and animated gif upon passing level 2. 
 * Reveals the Next Level button for the user to progress.
 */
function winMessage2(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `YEAH! Way to handle that <span id="active-monster-name">${monsterName}</span> monster. Good choice with the <span id="weapon-name">${weapon}</span>! Are you up to taking on one more?`;

    hideMutableElements();
    let conratsImage = document.getElementById("win-lose-img");
    conratsImage.style.display = "";
    conratsImage.innerHTML = `<img src="assets/images/twirling_xena.gif" alt="An animated image of Xena, warrior princess doing a celebratory twirl">`;

    let nextLevelBtn = document.getElementById("next-level-btn");
    nextLevelBtn.style.display = "";
}

/**
 * Hides the main game area and displays a congratulatory
 * message and animated gif upon finishing the game.
 */
function victoryMessage(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `YEEEEESSSSS! YOU DID IT!! Even the <span id="active-monster-name">${monsterName}</span> monster was no match for you. You sure know how to handle that <span id="weapon-name">${weapon}</span>! Congratulations on a perfect hunt!`;

    hideMutableElements();
    let conratsImage = document.getElementById("win-lose-img");
    conratsImage.style.display = "";
    conratsImage.innerHTML = `<img src="assets/images/lit_baby.gif" alt="An animated image of a baby at a sports game, appearing to cheer and fist pump as enthusiastically as any adult fan">`;
}

/**
 * Increases the current level by 1.
 */
function incrementLevel() {
    let level = parseInt(document.getElementById("level").textContent);
    document.getElementById("level").textContent = ++level;
}

/**
 * Hides all content then displays ONLY
 * the original landing content.
 * Simulates reloading the game.
 */
function quit() {
    document.getElementById("level").textContent = "0";
    hideMutableElements();
    hideMainDivs();
    let landing = document.getElementById("landing-main");
    let landingHeader = document.getElementById("landing-header");
    landing.style.display = "";
    landingHeader.style.display = "";
}