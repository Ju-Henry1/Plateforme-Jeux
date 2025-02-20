// Variables du jeu
let nombreMystere = Math.floor(Math.random() * 100) + 1; // Nombre aléatoire entre 1 et 100
let essaisRestants = 10;

// Sélection des éléments HTML
const input = document.getElementById("userGuess");
const checkButton = document.getElementById("checkGuess");
const restartButton = document.getElementById("restartGame");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");

// Fonction pour vérifier la réponse du joueur
function verifierNombre() {
    let valeurJoueur = parseInt(input.value);

    if (isNaN(valeurJoueur) || valeurJoueur < 1 || valeurJoueur > 100) {
        message.textContent = "⚠️ Entrez un nombre valide entre 1 et 100.";
        message.style.color = "red";
        return;
    }

    essaisRestants--;
    attemptsDisplay.textContent = essaisRestants;

    if (valeurJoueur === nombreMystere) {
        message.textContent = `🎉 Bravo ! Le nombre était bien ${nombreMystere}.`;
        message.style.color = "green";
        finDePartie(true);
    } else if (valeurJoueur < nombreMystere) {
        message.textContent = "🔼 Plus ! Essayez encore.";
        message.style.color = "orange";
    } else {
        message.textContent = "🔽 Moins ! Essayez encore.";
        message.style.color = "orange";
    }

    if (essaisRestants === 0 && valeurJoueur !== nombreMystere) {
        message.textContent = `❌ Perdu ! Le nombre était ${nombreMystere}.`;
        message.style.color = "red";
        finDePartie(false);
    }
}

// Fonction pour finir la partie
function finDePartie(gagne) {
    input.disabled = true;
    checkButton.disabled = true;
    restartButton.style.display = "inline-block"; // Affiche le bouton "Rejouer"
}

// Fonction pour recommencer une partie
function rejouer() {
    nombreMystere = Math.floor(Math.random() * 100) + 1;
    essaisRestants = 10;
    attemptsDisplay.textContent = essaisRestants;
    message.textContent = "Devinez le nombre mystère entre 1 et 100 !";
    message.style.color = "black";
    input.value = "";
    input.disabled = false;
    checkButton.disabled = false;
    restartButton.style.display = "none";
}

// Événements sur les boutons
checkButton.addEventListener("click", verifierNombre);
restartButton.addEventListener("click", rejouer);
