// Wait for the DOM to finish loading before running
// Get the elements with a class of "btn" & add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
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
                chooseWeapon();
            }
        })
    }
})

function displayAllMonsters() {
    console.log('display monsters');
}

function displayRules() {
    console.log('display rules');
}

function hideDiv() {
    
}


function startGame() {
    console.log('start game');
}

function getMonsterArray() {

}

function getRandomMonster() {

}

function displayRandomMonster() {

}

function chooseWeapon() {
    console.log('choose weapon');
}

function resolveBattle() {

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
    console.log('quit');
}