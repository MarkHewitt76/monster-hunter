/* This method of grouping event listeners was inspired by 
the Code Institute 'Love Maths' walkthrough project*/
// Wait for the DOM to finish loading before running
document.addEventListener("DOMContentLoaded", function() {
    hideMutableElements();
    // Get the elements with a class of "btn" & add event listeners to them
    let buttons = document.getElementsByClassName("btn");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            // -------- Homepage click events
            // Go to game page
            if (this.id === "game-page-link") {
                window.location.href = "game.html";
            }
            /* Toggle display of the monster gallery or game 
               rules and change the button text */ 
            else if (this.textContent === "Meet the Monsters") {
                displayAllMonsters();
                this.textContent = "Hide the Monsters";
                document.getElementById("rules-btn").textContent = "Read the Rules";
            } else if (this.textContent === "Hide the Monsters") {
                hideMutableElements();
                this.textContent = "Meet the Monsters";
                document.getElementById("rules-btn").textContent = "Read the Rules";
            } else if (this.textContent === "Read the Rules") {
                displayRules();
                this.textContent = "Hide the Rules";
                document.getElementById("monsters-btn").textContent = "Meet the Monsters";
            } else if (this.textContent === "Hide the Rules") {
                hideMutableElements();
                this.textContent = "Read the Rules";
                document.getElementById("monsters-btn").textContent = "Meet the Monsters";
            }
            // --------- Game page click events
            // Enter an optional username
            else if (this.id === "submit-name") {
                storeUsername();
            }
            // Return to the Homepage
            else if (this.id === "back-btn" || this.id === "quit-btn") {
                window.location.href = "index.html";
            }
            // Start the game
            else if (this.id === "game-start" || this.id === "next-level-btn") {
                startGame();
            }
            // In-game actions
            else if (this.id === "new-monster-btn") {
                displayRandomMonster();
            } else if (this.id === "choose-weapon-btn") {
                window.location.href = "#score-area";
                let buttonText = this.textContent;
                if (buttonText === "Ready Your Weapons") {
                    displayWeapons();    
                } else {
                    hideWeapons();
                }
            } else if (this.id === "new-game-btn") {
                newGame();
            } else { // it's a weapon button
                let weapon = this.children[0].textContent;
                resolveBattle(weapon);
            }
        });
    }

    /* Add a listener to the 'Enter Your First Name' input 
       box and call getUsername() if the 'Enter' key is 
       pressed. Use both .key and .code for cross-browser
       compatability. (There was initially an issue with this 
       when navigating back to the homepage. Because the button's 
       not on that page, this threw a 'Cannot read property 
       'addEventListener' of null...' error. I found the solution of using 'username &&...' on StackOverflow, here: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null). */
    let username = document.getElementById("username");
    username && username.addEventListener("keydown", function(event) {
        if ((event.key === "Enter") || (event.code === "Enter")) {
            storeUsername();
        }
    })
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
 * Gets the array returned by generateMonsterArray(), breaks it down 
 * and passes it to generateMonsterGalleryHtml(). Takes the result 
 * and writes it to the DOM as a 'gallery' of all monsters. Displays 
 * ONLY that gallery when the 'Meet the Monsters' button is clicked.
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
 * Operates on the array of 'monster' objects passed to it 
 * in order to generate and return the html for the 
 * 'Meet the Monsters' gallery section.
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
 * Hides all elements with the class of "mutable-element" 
 * by setting their display properties to "none". Each function
 * that calls it can then remove 'display: none;' from the 
 * relevant element(s).
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
 * Gets the name inputted by the user, if any, and writes
 * it to the DOM as temporary storage.
 */
function storeUsername() {
    let input = document.getElementById("username");
    let username = input.value;
    document.getElementById("added-name").textContent = username;

    if (input.value !== "") {
        input.value = "";
        input.placeholder = "Name entered. Thanks!";
    }

    document.getElementById("name-entry").style.display = "";
}

/**
 * The main game function, called by the click events 
 * on both the 'Find a Monster' and 'Next Level' buttons.
 * Sets the initial state for the attacks counter 
 * and increments the level counter each time it's 
 * called. Displays ONLY the main game section with a
 * random monster's name and image written in by 
 * displayRandomMonster().
 */
function startGame() {
    document.getElementById("game-landing").style.display = "none";
    hideMutableElements();

    let mainGame = document.getElementById("game-main");
    let arena = document.getElementById("arena");
    mainGame.style.display = "";
    arena.style.display = "";

    incrementLevel();
    displayRandomMonster();
    window.location.href="#game-main";
}

/**
 * Let's the user restart the game from level one.
 * Called with the 'click' event on the New Game button.
 */
function newGame() {
    let newMonsterBtn = document.getElementById("new-monster-btn");
    newMonsterBtn.style.display = "";
    document.getElementById("level").textContent = "0"; 
    startGame();
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
 * Gets the current user's name from the DOM.
 * Takes the monster object returned by getRandomMonster()
 * and writes its relevant values to the DOM along with 
 * the current user's name, if any.
 */
function displayRandomMonster() {
    hideMutableElements();
    let arena = document.getElementById("arena");
    arena.style.display = "";
    document.getElementById("attacks").textContent = "3";
    
    let monster = getRandomMonster();
    let monsterName = monster.name;

    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = currentName + " is";
    } else {
        activeName = "You are";
    }
    
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    <span id="active-username" class="active-username-style">${activeName}</span> hunting the <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster!
    `;
    
    let image = document.getElementById("active-monster-img");
    image.innerHTML = `
    <img src="${monster.image}" alt="A drawing of the ${monster.name} monster by ${monster.designer}">
    `;
    image.style.display = "";
}

/**
 * Hides the active monster image, displays the weapon 
 * buttons and changes the text of the 'choose weapon' 
 * button.
 */
 function displayWeapons() {
    let monsterImage = document.getElementById("active-monster-img");
    monsterImage.style.display = "none";
    let weaponsList = document.getElementById("weapons-list");
    weaponsList.style.display = "";
    document.getElementById("choose-weapon-btn").textContent = "Choose Your Weapon";
}

/**
 * Hides weapon buttons, displays the active monster 
 * image and changes the text of the 'choose weapon' 
 * button.
 */
function hideWeapons() {
    let weaponsList = document.getElementById("weapons-list");
    weaponsList.style.display = "none";
    document.getElementById("choose-weapon-btn").textContent = "Ready Your Weapons";
    let monsterImage = document.getElementById("active-monster-img");
    monsterImage.style.display = "";
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
 * Calls hideWeapons() to hide the weapons buttons and remove 
 * 'display: none; from the active monster image in case it's needed.
 * Gets the active monster's weaknesses from getActiveMonster(),
 * compares them with the 'weapon' string passed in by the 
 * 'click' event listener on the weapons buttons and calls the 
 * appropriate function, passing it the 'weapon' string.
 */
function resolveBattle(weapon) {
    window.location.href="#game-main";
    hideWeapons();

    let weaknesses = getActiveMonster().weaknesses;
    
    if (weaknesses.includes(weapon) === false) {
        decrementAttacks();
        displayFailureMessage(weapon);
    } else {
        displayWinMessage(weapon);
    }
}

/**
 * Increases the current level by 1.
 */
function incrementLevel() {
    let level = parseInt(document.getElementById("level").textContent);
    /* The idea to put the '++' before the variable to be 
    incremented so that it happens before it's written to 
    the DOM came from the Code Institute 'Love Maths' 
    walthrough project. The idea is repeated with '--' in 
    decrementAttacks(), below. */
    document.getElementById("level").textContent = ++level;
}

/**
 * Reduces the number of remaining attacks by 1.
 */
function decrementAttacks() {
    let attacks = parseInt(document.getElementById("attacks").textContent);
    document.getElementById("attacks").textContent = --attacks;
}

/**
 * Calls for the relevant failure message displayed by 
 * the functions below, based on the number of remaining
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
        alert(`Error! Undefined number of attacks: ${attacks}. Please refresh the page.`);
        throw `Error! Undefined number of attacks: ${attacks}. Aborting!`;
    }
}

/**
 * Displays the outcome of the user's first failed attempt:
 * a warning message which includes the selected weapon's
 * name. It also includes the current user's name, if entered, 
 * and the name of the currently active monster (both read 
 * from the DOM). Enlarges the image of the active monster.
 */
function failureMessage1(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;

    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = ", " + currentName;
    } else {
        activeName = "";
    }

    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    THE <span id="weapon-name" class="weapon-name-style">${weapon}</span> HAD NO EFFECT! The <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster is now hunting you<span id="active-username" class="active-username-style">${activeName}</span>!
    `;

    let image = document.getElementById("active-monster-img").children[0];
    image.style.height = "200px";
}

/**
 * Displays the outcome of the user's second failed attempt:
 * a new warning message which includes the selected weapon's 
 * name. It also includes the current user's name, if entered, 
 * and the name of the currently active monster (both read 
 * from the DOM). Enlarges the image of the active monster.
 */
function failureMessage2(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;

    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = ", " + currentName;
    } else {
        activeName = "";
    }

    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    THE <span id="weapon-name" class="weapon-name-style">${weapon}</span> HAD NO EFFECT! The <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster almost had you that time<span id="active-username" class="active-username-style">${activeName}</span>!!
    `;

    let image = document.getElementById("active-monster-img").children[0];
    image.style.height = "250px";
}

/**
 * Hides the main game area and displays a commiseration 
 * message and animated gif upon losing the game. The 
 * message includes the selected weapon's name. It also 
 * includes the current user's name, if entered, and 
 * the name of the currently active monster (both read 
 * from the DOM). Switches the 'New Monster' button for 
 * the 'New Game' button.
 */
function defeatMessage(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;

    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = ", " + currentName;
    } else {
        activeName = "";
    }
    
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    THE <span id="weapon-name" class="weapon-name-style">${weapon}</span> HAD NO EFFECT! The <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster took one last swipe at you before escaping. Better luck next time<span id="active-username" class="active-username-style">${activeName}</span>!
    `;

    hideMutableElements();
    let finalOutcome = document.getElementById("win-lose-img");
    finalOutcome.style.display = "";
    finalOutcome.innerHTML = `
    <img src="assets/images/upset_emoji.gif" alt="An animated emoji, crying and thumping its fists">
    `;

    let newMonsterBtn = document.getElementById("new-monster-btn");
    newMonsterBtn.style.display = "none";
    let newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.style.display = "";
}

/**
 * Calls for the relevant success message displayed by 
 * the functions below, based on the current level.
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
 * message and animated gif upon passing level 1. The 
 * message includes the selected weapon's name. It also 
 * includes the current user's name, if entered, and 
 * the name of the currently active monster (both read 
 * from the DOM).Reveals the 'Next Level' button for the 
 * user to progress.
 */
function winMessage1(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;

    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = ", " + currentName;
    } else {
        activeName = "";
    }

    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    THE <span id="weapon-name" class="weapon-name-style">${weapon}</span> WORKED! The <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster didn't stand a chance against you<span id="active-username" class="active-username-style">${activeName}</span>! Are you ready for the next one?
    `;

    hideMutableElements();
    let congratsImage = document.getElementById("win-lose-img");
    congratsImage.style.display = "";
    congratsImage.innerHTML = `
    <img src="assets/images/angry_skeleton.gif" alt="An animated image of a skeleton in a coffin saying, 'Leave me alone, I'm dead'">
    `;

    let nextLevelBtn = document.getElementById("next-level-btn");
    nextLevelBtn.style.display = "";
}

/**
 * Hides the main game area and displays a congratulatory
 * message and animated gif upon passing level 2. The 
 * message includes the selected weapon's name. It also 
 * includes the current user's name, if entered, and 
 * the name of the currently active monster (both read 
 * from the DOM). Reveals the 'Next Level' button for the 
 * user to progress.
 */
function winMessage2(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;
    
    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = ", " + currentName;
    } else {
        activeName = "";
    }

    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    YEAH! Way to handle that <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster<span id="active-username" class="active-username-style">${activeName}</span>. Good choice with the <span id="weapon-name" class="weapon-name-style">${weapon}</span>! Are you up to taking on one more?
    `;

    hideMutableElements();
    let congratsImage = document.getElementById("win-lose-img");
    congratsImage.style.display = "";
    congratsImage.innerHTML = `
    <img src="assets/images/twirling_xena.gif" alt="An animated image of Xena, warrior princess doing a celebratory twirl">
    `;

    let nextLevelBtn = document.getElementById("next-level-btn");
    nextLevelBtn.style.display = "";
}

/**
 * Hides the main game area and displays a congratulatory
 * message and animated gif upon finishing the game. The 
 * message includes the selected weapon's name. It also 
 * includes the current user's name, if entered, and 
 * the name of the currently active monster (both read 
 * from the DOM). Switches the 'New Monster' button for the 
 * 'New Game' button.
 */
function victoryMessage(weapon) {
    let monsterName = document.getElementById("active-monster-name").innerHTML;

    let activeName;
    let currentName = document.getElementById("added-name").textContent;
    if (currentName !== "") {
        activeName = ", " + currentName;
    } else {
        activeName = "";
    }

    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `
    YEEEEESSSSS! YOU DID IT!! Even the <span id="active-monster-name" class="monster-name-style">${monsterName}</span> monster was no match for you. You sure know how to handle that <span id="weapon-name" class="weapon-name-style">${weapon}</span>! Congratulations<span id="active-username" class="active-username-style">${activeName}</span>, on a perfect hunt!
    `;

    hideMutableElements();
    let congratsImage = document.getElementById("win-lose-img");
    congratsImage.style.display = "";
    congratsImage.innerHTML = `
    <img src="assets/images/lit_baby.gif" alt="An animated image of a baby at a sports game, appearing to cheer and fist pump as enthusiastically as any adult fan">
    `;

    let newMonsterBtn = document.getElementById("new-monster-btn");
    newMonsterBtn.style.display = "none";
    let newGameBtn = document.getElementById("new-game-btn");
    newGameBtn.style.display = "";
}