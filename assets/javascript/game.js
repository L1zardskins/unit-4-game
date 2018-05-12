
// reset game
// select player charicter
// select computer charicter
// set player name by selected image
// attack
// check if win


// $(document).ready(function () {
// Variables
var gameStarted = false;
var nextRound = false;
var gameOver = false;
var maxHealth = 0;
var playerOne = {
    name: "",
    health: 100,
    image: "",
    power: 0,
    index: -1,
};
var computer = {
    name: "",
    health: 100,
    image: "",
    power: 0,
    index: -1,
};
var heroList = [
    "deadpool",
    "drstrange",
    "ghostrider",
    "cap",
    "spiderman",
    "thor"
];
var villainList = [
    "dormammu",
    "drdoom",
    "jugernaut",
    "redskull",
    "ultron",
    "venom",
];
var randomPower = [100, 105, 110, 115, 120, 125]
var selectedFighter = "";
var computerFighter = "";
var readyToFight = 0;
var powerBonus = 0;
var isVillain = false;
var defeatedIndex = [];
var playerOneHealth = 0;


//Set game function



function setUpGame() {
    gameStarted = false;

    document.getElementById("lifebar-row").style.cssText = "visibility: hidden";
    // console.log("this worked?")
    // alert("hello")
    for (let i = 0; i < heroList.length; i++) {
        var targetDiv = document.getElementById("hero-selection");

        var newImg = document.createElement("img");

        var newText = document.createElement("div");

        targetDiv.appendChild(newImg);

        newImg.setAttribute("class", "fighterImage");
        newImg.setAttribute("id", "heroimage");
        newImg.setAttribute("value", heroList[i]);
        newImg.setAttribute("src", "assets/images/" + heroList[i] + "_1.png");

        // targetDiv.appendChild(newText)

        // newText.setAttribute("class", "text-block")
        // $("text-block").text("<h4>" + heroList[i] + "</h4")

    }

    for (let i = 0; i < villainList.length; i++) {
        var targetDiv = document.getElementById("villain-selection");

        var newImg = document.createElement("img");

        var newText = document.createElement("div");

        targetDiv.appendChild(newImg);

        newImg.setAttribute("class", "fighterImage");
        newImg.setAttribute("id", "heroimage");
        newImg.setAttribute("value", villainList[i]);
        newImg.setAttribute("src", "assets/images/" + villainList[i] + "_1.png");
        // newImg.setAttribute("title", "test tool tip");

        // targetDiv.appendChild(newText)

        // newText.setAttribute("class", "text-block")
        // $("text-block").text("<h4>" + heroList[i] + "</h4")

    }
};

// $(document).ready(function () {
//     $(".heroes").click(function () {
//         alert("it works!");
//     });
// });

$(document).ready(function () {

    //select fighter
    $(".fighterImage").on("click", function () {
        fighterName = $(this).attr("value");
        console.log("Selected Fighter: " + $(this).attr("value"));
        // console.log(selectedFighter);
        // selectedFighter = $(this).attr("value");
        if (heroList.indexOf(fighterName) != -1) {
            // console.log("Hero Selected");
            document.getElementById("hero-selection").style.cssText = "visibility: hidden";
            readyToFight++;
            // console.log(readyToFight);
            isVillain = false;
            // playerOne.index = heroList.indexOf(fighterName);

        } else {
            // console.log("villian Selected");
            document.getElementById("villain-selection").style.cssText = "visibility: hidden";
            readyToFight++
            // console.log(readyToFight);
            isVillain = true;
            // playerOne.index = villainList.indexOf(fighterName);

        }
        if (readyToFight == 2) {
            console.log(readyToFight);
            document.getElementById("lifebar-row").style.cssText = "visibility: visible";
            computerFighter = fighterName;
            if (villainList.indexOf(computerFighter) != -1) {
                computer.index = villainList.indexOf(computerFighter);
                startFight();
            } else {
                computer.index = heroList.indexOf(computerFighter);
                startFight();
            }



        } else {
            selectedFighter = fighterName;
            if (villainList.indexOf(selectedFighter) != -1) {
                playerOne.index = villainList.indexOf(selectedFighter);
            } else {
                playerOne.index = heroList.indexOf(selectedFighter);
            }
        }
        console.log("Player1 " + selectedFighter);
        console.log("Computer " + computerFighter);
        console.log(playerOne);
        console.log(computer);

    });

    //Attack function
    $(".playerAttack").on("click", function () {
        // console.log("Attack!!!")
        var attackHP = (Math.floor(Math.random() * 5) + 1) + (playerOne.power / 10);
        if (playerOne.name == "deadpool") {
            attackHP++
        }
        console.log("playerAttack: " + attackHP);
        computer.health = computer.health - attackHP;

        computerAttack();
        calculateLifebar();

    });

    $(".playerHealth").on("click", function () {
        // console.log("Attack!!!")
        if (playerOneHealth > 0) {
            if (playerOne.health < 100) {
                var addLife = playerOne.health + 75;
                playerOne.health = playerOne.health + addLife;
                console.log(playerOne.health)
                playerOneHealth--
                calculateLifebar();
            }
        }


    });


});

function startFight() {
    console.log("Player1 " + selectedFighter);
    console.log("Computer " + computerFighter);
    // $("#fightButtons").attr("visibility: visible;")
    document.getElementById("fightButtons").style.cssText = "visibility: visible";

    var playerOneDiv = document.getElementById("gameplay-column1");
    var computerDiv = document.getElementById("gameplay-column2");

    var playerOneFighter = document.createElement("img");
    var computerOneFighter = document.createElement("img");

    playerOneDiv.appendChild(playerOneFighter);
    computerDiv.appendChild(computerOneFighter);


    // playerOneFighter.setAttribute("class", "fighterImage");
    playerOneFighter.setAttribute("id", "selectedFighter");
    playerOneFighter.setAttribute("value", selectedFighter);
    playerOneFighter.setAttribute("src", "assets/images/" + selectedFighter + "_fight.png");

    // playerOneFighter.setAttribute("class", "fighterImage");
    computerOneFighter.setAttribute("id", "computerFighter");
    computerOneFighter.setAttribute("value", computerFighter);
    computerOneFighter.setAttribute("src", "assets/images/" + computerFighter + "_fight.png");

    //set player power
    var rando = Math.floor(Math.random() * 5) + 1;
    playerOne.power = randomPower[rando];
    playerOne.name = selectedFighter;
    if (playerOne.name == "deadpool") {
        playerOne.power = playerOne.power + 50;
    }
    console.log(playerOne);
    //set computer power
    var rando = Math.floor(Math.random() * 5) + 1;
    computer.power = randomPower[rando];
    computer.name = computerFighter;
    if (computer.name == "deadpool") {
        computer.power = computer.power + 50;
    }
    console.log(computer)

};

function computerAttack() {
    var attackHP = (Math.floor(Math.random() * 5) + 1) + (computer.power / 10);
    if (computer.name == "deadpool") {
        attackHP++
    }
    console.log("computerAttack: " + attackHP);
    playerOne.health = playerOne.health - attackHP;
};

function calculateLifebar() {
    console.log("Computer: " + computer.health);
    console.log("Player: " + playerOne.health);
    // console.log(computer.health / 100);
    var computerLife = computer.health;
    var computerDeath = 100 - computerLife;
    $("#computerLife").attr("style", "width: " + computerLife + "%");
    $("#computerDeath").attr("style", "width: " + computerDeath + "%");
    var playerLife = playerOne.health;
    var playerDeath = 100 - playerLife;
    $("#playerLife").attr("style", "width: " + playerLife + "%");
    $("#playerDeath").attr("style", "width: " + playerDeath + "%");
    winOrLose();
};

function winOrLose() {

    if (computer.health <= 0) {
        console.log("Computer Died!");
        alert("You defeated " + computer.name + "!!! Get Ready For Your Next Fight!");
        if (isVillain) {
            villainList.splice(computer.index, 1)
            console.log(villainList)
        } else {
            heroList.splice(computer.index, 1)
            console.log(heroList)
        }
        playerOneHealth++
        playerOne.power++
        nextAttacker("computer");
    } else if (playerOne.health <= 0) {
        console.log("Player Died!");
        if (isVillain) {
            villainList.splice(playerOne.index, 1)
            console.log(villainList)
        } else {
            heroList.splice(playerOne.index, 1)
            console.log(heroList)
        }

        // nextAttacker("player");
    };

};

function nextAttacker(playerOrComputer) {

    if (playerOrComputer == "computer") {

        if (isVillain) {
            var length = villainList.length
        } else {
            var length = heroList.length
        }
        // var randoAgain = Math.floor(Math.random() * length);
        // console.log(randoAgain)

        var computerFighter = villainList[Math.floor(Math.random() * length)];
        computer.index = villainList.indexOf(computerFighter);

        // console.log(villainList)
        console.log(computerFighter)
        computer.health = 100

        // computerOneFighter.setAttribute("id", "computerFighter");
        $("#computerFighter").attr("value", computerFighter);
        $("#computerFighter").attr("src", "assets/images/" + computerFighter + "_fight.png");
        $("#computerLife").attr("style", "width: " + computer.health + "%");
        $("#computerDeath").attr("style", "width: 0%");


        var rando = Math.floor(Math.random() * 5) + 1;
        computer.power = randomPower[rando];
        computer.name = computerFighter;
        if (computer.name == "deadpool") {
            computer.power = computer.power + 50;
        }
    }
}

// $("#heroimage").on("click", function () {
//     console.log($(this).text());
// });

// });


// IF statement
// if (heroList.indexOf(fighterName) != -1) {
//     console.log($(this).attr("value"));
// }