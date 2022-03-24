// Wait for the DOM to finish loading before running
// Get the elements with a class of "btn" & add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    hideMutableChildren();
    let buttons = document.getElementsByClassName("btn");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if ((this.id === "start-btn") || (this.id === "next-level-btn")) {
                startGame();
            } else if (this.id === "monsters-btn") {
                displayAllMonsters();
            } else if (this.id === "rules-btn") {
                displayRules();
            } else if (this.id === "restart-btn") {
                startOver();
            } else if (this.id === "quit-btn") {
                quit();
            } else {
                let weapon = this.id
                resolveBattle(weapon);
            }
        })
    }
})

/**
 * Displays ONLY the monster tables when the
 * 'Meet the Monsters' button is clicked.
 */
function displayAllMonsters() {
    hideMutableChildren();
    let allMonsters = document.getElementById("all-monsters");
    allMonsters.style.display = "";
}

/**
 * Displays ONLY the list of rules when the
 * 'Read the Rules' button is clicked.
 */
function displayRules() {
    hideMutableChildren();
    let rules = document.getElementById("rules");
    rules.style.display = "";
}

/**
 * Hides all elements with the class of
 * "mutable-child".
 */
function hideMutableChildren() {
    let hiddenElements = document.getElementsByClassName("mutable-child");
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
    hideMutableChildren();

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
 * Reads a monster table from the DOM based on the 
 * current level and returns it as an array of objects.
 */
function getMonsterArray() {
    let table;

    let level = document.getElementById("level").textContent;
    if (level === "1") {
        table = document.getElementById("level-one-monsters");
    } else if (level === "2") {
        table = document.getElementById("level-two-monsters");
    } else if (level === "3") {
        table = document.getElementById("level-three-monsters");
    } else {
        alert(`Error! Undefined level: ${level}. Please refresh the page.`);
        throw `Error! Undefined level: ${level}. Aborting!`;
    }

    let tbody = table.getElementsByTagName('tbody')[0];
    let rows = tbody.children;
    
    let monsters = [];
 
    for (let row of rows) {
        let monster = {};
        
        let cells = row.children;
        monster.name = cells[0].textContent;
        monster.image = cells[1].innerHTML;
        let paragraphs = cells[2].children;
        let weaknesses = [];
        for (let p of paragraphs) {
            let weakness = p.textContent;
            weaknesses.push(weakness);
        }
        
        monster.weakness = weaknesses;
        monsters.push(monster);
    }
    
    return monsters;
}

/**
 * Takes the array returned by getMonsterArray()
 * and uses Math.random to return a single,
 * random monster object.
 */
function getRandomMonster() {
    let monsters = getMonsterArray();
    return monsters[Math.floor(Math.random() * monsters.length)];
}

/**
 * Takes the monster object returned by getRandomMonster
 * and writes it to the DOM.
 */
function displayRandomMonster() {
    let monster = getRandomMonster();

    let monsterName = monster.name;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `You are hunting the <span id="monster-name">${monsterName}</span> monster!`;

    let image = document.getElementById("monster-img");
    image.innerHTML = monster.image;

    let monsterWeakness = document.getElementById("monster-weakness");
    let paragraphs = "";
    for (let i of monster.weakness) {
        paragraphs += `<p>${i}</p>`;
    }
    monsterWeakness.innerHTML = paragraphs;
}

/**
 * Reads the active monster's weaknesses from the DOM,
 * compares them with the weapon passed in by the 'click'
 * event listener and calls the appropriate response.
 */
function resolveBattle(weapon) {
    let weaknesses = [];

    let paragraphs = document.getElementById("monster-weakness").children;
    for (let p of paragraphs) {
        let weakness = p.textContent;
        weaknesses.push(weakness);
    }
    
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
    let monsterName = document.getElementById("monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> HAD NO EFFECT! The <span id="monster-name">${monsterName}</span> monster is now hunting you!`;

    let image = document.getElementById("monster-img").children[0];
    image.style.width = "200px";
}

/**
 * Displays the outcome of the user's second failed attempt:
 * a new warning message and the monster image gets bigger.
 */
function failureMessage2(weapon) {
    let monsterName = document.getElementById("monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> HAD NO EFFECT! The <span id="monster-name">${monsterName}</span> monster almost had you that time!`;

    let image = document.getElementById("monster-img").children[0];
    image.style.width = "250px";
}

function defeatMessage(weapon) {
    let monsterName = document.getElementById("monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> HAD NO EFFECT! The <span id="monster-name">${monsterName}</span> monster took one last swipe at you before escaping. Better luck next time!`;

    hideMutableChildren();
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
    let monsterName = document.getElementById("monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `THE <span id="weapon-name">${weapon}</span> WORKED! The <span id="monster-name">${monsterName}</span> monster didn't stand a chance! Are you ready for the next one?`;

    hideMutableChildren();
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
    let monsterName = document.getElementById("monster-name").innerHTML;
    let message = document.getElementById("arena-message").children[0];
    message.innerHTML = `YEAH! Way to handle that <span id="monster-name">${monsterName}</span> monster. Good choice with the <span id="weapon-name">${weapon}</span>! Are you up to taking on one more?`;

    hideMutableChildren();
    let conratsImage = document.getElementById("win-lose-img");
    conratsImage.style.display = "";
    conratsImage.innerHTML = `<img src="assets/images/twirling_xena.gif" alt="An animated image of Xena, warrior princess doing a celebratory twirl">`;

    let nextLevelBtn = document.getElementById("next-level-btn");
    nextLevelBtn.style.display = "";
}

function victoryMessage(weapon) {

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
    hideMutableChildren();
    hideMainDivs();
    let landing = document.getElementById("landing-main");
    let landingHeader = document.getElementById("landing-header");
    landing.style.display = "";
    landingHeader.style.display = "";
    console.log('quit');
}