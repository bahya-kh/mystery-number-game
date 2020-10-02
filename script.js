// Elements du DOM
var divVies = document.querySelector(".vies");
var message = document.getElementById("message");
var formulaire = document.getElementById("inputBox");
var input = document.getElementById("number");
var essayerBtn = document.getElementById("essayerBtn");
var rejouerBtn = document.getElementById("rejouer");
var body = document.getElementsByTagName("body")[0];

// Modèle de coeurs
var coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
var coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond
var bgFroid = "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
var bgTiede = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
var bgChaud = "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)";
var bgBrulant = "linear-gradient(to top, #ff0844 0%, #ffb199 100%)";

var bgWin =
    "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)";
var bgLoose = "linear-gradient(60deg, #29323c 0%, #485563 100%)";

// PLAY :
var play = function() {
    // nombre aléatoire
    var randomNumber = Math.floor(Math.random() * 101); // 3
    var totalVies = 6;
    var vies = totalVies;
    console.log(randomNumber);

    // Actualisation à chaque essai - TOUTE LA LOGIQUE
    formulaire.addEventListener("submit", (e) => {
        e.preventDefault();
        var valeurInput = parseInt(input.value);

        if (valeurInput < 0 || valeurInput > 100) return;

        if (valeurInput === randomNumber) {
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
            essayerBtn.setAttribute("disabled", "");
        }

        if (valeurInput !== randomNumber) {
            if (
                randomNumber < valeurInput + 3 &&
                randomNumber > valeurInput - 3
            ) {
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
            } else if (
                randomNumber < valeurInput + 6 &&
                randomNumber > valeurInput - 6
            ) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud ! 🔥 ";
            } else if (
                randomNumber < valeurInput + 11 &&
                randomNumber > valeurInput - 11
            ) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède 😐 ";
            } else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est Froid ❄️ ";
            }
            vies--;
            verifyLoose();
        }

        actualiseCoeurs(vies);
    });

    var verifyLoose = function() {
        if (vies === 0) {
            body.style.backgroundImage = bgLoose;
            body.style.color = "#990000";
            essayerBtn.setAttribute("disabled", "");
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    };

    var actualiseCoeurs = function (vies){
        // total : 6; vies : 4
        divVies.innerHTML = "";
        var tableauDeVies = [];
        for (let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for (let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach((coeur) => {
            divVies.innerHTML += coeur;
        });
    };
    actualiseCoeurs(vies);

    rejouerBtn.addEventListener("click", () => {
        message.style.display = "none";
        document.location.reload(true);
    });
};

play();

