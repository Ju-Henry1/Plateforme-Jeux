// Liste des couleurs disponibles pour le jeu avec leur nom
const colors = ["red", "blue", "green", "yellow", "purple", "brown"];
let colorSequence = []; // La séquence des couleurs à mémoriser
let playerSequence = []; // La séquence que le joueur entre
let currentRound = 0; // Le round actuel
let isGameActive = false;
let score = 0; // Score du joueur

const colorBoxes = document.getElementById("colorBoxes");
const startButton = document.getElementById("startGame");
const statusMessage = document.getElementById("statusMessage");
const scoreElement = document.getElementById("score");
const roundElement = document.getElementById("round");

// Crée les boîtes de couleurs
function createColorBoxes() {
    colors.forEach(color => {
        const box = document.createElement("div");
        box.classList.add("color-box");
        box.style.backgroundColor = color; // Utilise la couleur avec le nom
        box.addEventListener("click", () => handlePlayerClick(color)); // Clic sur la couleur
        colorBoxes.appendChild(box);
    });
}

// Commence un nouveau round du jeu
function startGame() {
    colorSequence = [];
    playerSequence = [];
    currentRound = 1;
    score = 0;
    updateScoreAndRound();
    isGameActive = true;
    statusMessage.textContent = `Round ${currentRound}: Mémorise la séquence !`;
    nextRound();
}

// Passe au round suivant en ajoutant une nouvelle couleur à la séquence
function nextRound() {
    playerSequence = []; // Réinitialise la séquence du joueur
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    colorSequence.push(randomColor);

    // Affiche la séquence pour le joueur
    showSequence();
}

// Affiche la séquence des couleurs à mémoriser
function showSequence() {
    let index = 0;
    const interval = setInterval(() => {
        const color = colorSequence[index];
        highlightColor(color);

        index++;

        if (index >= colorSequence.length) {
            clearInterval(interval); // Arrête l'affichage de la séquence
            statusMessage.textContent = `Round ${currentRound}: Maintenant, à toi de jouer !`;
        }
    }, 1000); // Chaque couleur clignote toutes les 1 seconde
}

// Fait clignoter une couleur pour la mettre en évidence
function highlightColor(color) {
    const box = Array.from(colorBoxes.children).find(box => box.style.backgroundColor === color);
    box.style.opacity = 1; // Rendre la couleur plus visible
    setTimeout(() => box.style.opacity = 0.6, 500); // Remettre l'opacité après 500ms
}

// Gère le clic du joueur pour comparer sa réponse
function handlePlayerClick(color) {
    if (!isGameActive) return;
    
    playerSequence.push(color);
    
    // Si la couleur du joueur est incorrecte
    if (playerSequence[playerSequence.length - 1] !== colorSequence[playerSequence.length - 1]) {
        statusMessage.textContent = `Perdu ! La séquence était : ${colorSequence.join(", ")}`;
        statusMessage.classList.add("incorrect");
        isGameActive = false;
        return;
    }

    // Si le joueur a bien reproduit toute la séquence
    if (playerSequence.length === colorSequence.length) {
        currentRound++;
        score++; // Augmente le score
        statusMessage.textContent = `Bravo ! Passons au round ${currentRound}.`;
        statusMessage.classList.remove("incorrect");
        statusMessage.classList.add("correct");
        updateScoreAndRound();
        setTimeout(nextRound, 1000); // Passer au round suivant
    }
}

// Met à jour le score et le round affichés
function updateScoreAndRound() {
    scoreElement.textContent = score;
    roundElement.textContent = currentRound;
}

// Initialisation du jeu
createColorBoxes();
startButton.addEventListener("click", startGame);
