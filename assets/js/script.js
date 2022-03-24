// Wait for the DOM to finish loading before running
// Get the elements with a class of "btn" & add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    hideMutableChildren();
    let buttons = document.getElementsByClassName("btn");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if ((this.id === "start-btn") || (this.id === "restart-btn")) {
                startGame();
            } else if (this.id === "monsters-btn") {
                displayAllMonsters();
            } else if (this.id === "rules-btn") {
                displayRules();
            } else if (this.id === "next-level-btn") {
                nextLevel();
            } else if (this.id === "quit-btn") {
                quit();
            } else {
                let weapon = this.id
                resolveBattle(weapon);
            }
        })
    }
})

function displayAllMonsters() {
    hideMutableChildren();
    let allMonsters = document.getElementById("all-monsters");
    allMonsters.style.display = "";
}

function displayRules() {
    hideMutableChildren();
    let rules = document.getElementById("rules");
    rules.style.display = "";
}

function hideMutableChildren() {
    let hiddenElements = document.getElementsByClassName("mutable-child");
    for (let element of hiddenElements) {
        if (element.style.display !== "none") {
            element.style.display = "none";
        }
    }
}

function startGame() {
    hideMainDivs();
    let mainGame = document.getElementById("game-main");
    let arena = document.getElementById("arena");
    mainGame.style.display = "";
    arena.style.display = "";
    console.log('start game');
}

function hideMainDivs() {
    let hiddenDivs = document.getElementsByClassName("mutable");
    for (let mutableDiv of hiddenDivs) {
        if (mutableDiv.style.display !== "none") {
            mutableDiv.style.display = "none";
        }
    }
}

function getMonsterArray() {

}

function getRandomMonster() {

}

function displayRandomMonster() {

}

function resolveBattle(weapon) {
    console.log(weapon);
}

function decrementAttacks() {

}

function displayFailureMessage() {

}

function failureMessage1() {

}

function failureMessage2() {

}

function defeatMessage() {

}

function displayWinMessage() {

}

function winMessage1() {
    
}

function winMessage2() {

}

function victoryMessage() {

}

function nextLevel() {
    console.log('next level');
}

function incrementLevel() {

}

function quit() {
    hideMutableChildren();
    hideMainDivs();
    let landing = document.getElementById("landing-main");
    let landingHeader = document.getElementById("landing-header");
    landing.style.display = "";
    landingHeader.style.display = "";
    console.log('quit');
}