// Liste des mots : Correct pour tous les innocents et Incorrect pour l'imposteur
const words = [
  { correct: "Chat", incorrect: "Chien" },
  { correct: "Pizza", incorrect: "Pasta" },
  { correct: "Voiture", incorrect: "Vélo" },
  { correct: "Maison", incorrect: "Appartement" },
  { correct: "Lune", incorrect: "Soleil" },
  { correct: "Fleur", incorrect: "Arbre" },
  { correct: "Avion", incorrect: "Hélicoptère" },
  { correct: "Mer", incorrect: "Lac" },
  { correct: "Neige", incorrect: "Pluie" },
  { correct: "Été", incorrect: "Hiver" },
  { correct: "Télévision", incorrect: "Radio" },
  { correct: "Table", incorrect: "Chaise" },
  { correct: "Banane", incorrect: "Pomme" },
  { correct: "Football", incorrect: "Basketball" },
  { correct: "Souris", incorrect: "Clavier" },
  { correct: "Montagne", incorrect: "Colline" },
  { correct: "Poisson", incorrect: "Viande" },
  { correct: "Tigre", incorrect: "Lion" },
  { correct: "Guitare", incorrect: "Piano" },
  { correct: "Ordinateur", incorrect: "Téléphone" }
];

let numPlayers = 0;
let players = [];
let currentPlayerIndex = 0;
let excludedPlayers = [];

// Passer à l'étape 2 : Saisie du nombre de joueurs
function nextStep() {
  numPlayers = document.getElementById("numPlayers").value;
  if (numPlayers < 2 || numPlayers > 10) {
      alert("Le nombre de joueurs doit être entre 2 et 10.");
      return;
  }

  document.getElementById("step-1").classList.add("hidden");
  document.getElementById("step-2").classList.remove("hidden");

  generatePlayerInputs();
}

// Générer les champs de saisie des noms de joueurs
function generatePlayerInputs() {
  const playersInputsDiv = document.getElementById("players-inputs");
  playersInputsDiv.innerHTML = "";  // Clear previous inputs

  for (let i = 0; i < numPlayers; i++) {
      const playerInput = document.createElement("input");
      playerInput.type = "text";
      playerInput.placeholder = `Nom du joueur ${i + 1}`;
      playerInput.id = `player-${i}`;
      playersInputsDiv.appendChild(playerInput);
      playersInputsDiv.appendChild(document.createElement("br"));
  }

  // Ajouter un bouton pour valider les noms
  const assignButton = document.createElement("button");
  assignButton.textContent = "Attribuer les mots";
  assignButton.onclick = assignWords;
  playersInputsDiv.appendChild(assignButton);
}

// Attribuer les mots aux joueurs
function assignWords() {
  players = [];
  for (let i = 0; i < numPlayers; i++) {
      const playerName = document.getElementById(`player-${i}`).value;
      if (!playerName) {
          alert("Tous les joueurs doivent entrer leur nom.");
          return;
      }
      players.push({ name: playerName, word: "", excluded: false });
  }

  // Attribuer les mots en fonction du nombre de joueurs
  assignWordsToPlayers(numPlayers);

  // Passer à l'étape 3
  document.getElementById("step-2").classList.add("hidden");
  document.getElementById("step-3").classList.remove("hidden");

  displayCurrentPlayer();
}

// Fonction pour attribuer les mots aux joueurs
function assignWordsToPlayers(numPlayers) {
  let selectedWordPair = words[Math.floor(Math.random() * words.length)];

  if (numPlayers <= 5) {
      let incorrectPlayerIndex = Math.floor(Math.random() * numPlayers);
      players.forEach((player, index) => {
          player.word = index === incorrectPlayerIndex ? selectedWordPair.incorrect : selectedWordPair.correct;
      });
  } else if (numPlayers === 7) {
      let incorrectIndexes = getRandomIndexes(numPlayers, 2);
      players.forEach((player, index) => {
          player.word = incorrectIndexes.includes(index) ? selectedWordPair.incorrect : selectedWordPair.correct;
      });
  } else if (numPlayers === 8) {
      let noWordIndex = Math.floor(Math.random() * numPlayers);
      let incorrectIndexes = getRandomIndexes(numPlayers, 2, [noWordIndex]);
      players.forEach((player, index) => {
          if (index === noWordIndex) {
              player.word = "";
          } else if (incorrectIndexes.includes(index)) {
              player.word = selectedWordPair.incorrect;
          } else {
              player.word = selectedWordPair.correct;
          }
      });
  }
}

// Obtenir des index aléatoires sans répétition
function getRandomIndexes(max, count, exclude = []) {
  let indexes = [];
  while (indexes.length < count) {
      let randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex) && !exclude.includes(randomIndex)) {
          indexes.push(randomIndex);
      }
  }
  return indexes;
}

// Afficher le joueur actuel (nom et mot)
function displayCurrentPlayer() {
  const currentPlayer = players[currentPlayerIndex];
  document.getElementById("currentPlayerName").textContent = `Joueur: ${currentPlayer.name}`;
  document.getElementById("role").textContent = "";
}

// Passer au joueur suivant
function nextPlayer() {
  const currentPlayer = players[currentPlayerIndex];

  if (document.getElementById("role").textContent === "") {
      document.getElementById("role").textContent = `Mot: ${currentPlayer.word}`;
  } else {
      currentPlayerIndex++;
      if (currentPlayerIndex < players.length) {
          displayCurrentPlayer();
      } else {
          document.getElementById("step-3").classList.add("hidden");
          document.getElementById("step-4").classList.remove("hidden");
          updatePlayersList();
      }
  }
}

// Afficher la liste des joueurs restants
function updatePlayersList() {
  const playersList = document.getElementById("playersList");
  playersList.innerHTML = "";

  players.forEach(player => {
      if (!player.excluded) {
          const li = document.createElement("li");
          li.textContent = `${player.name}`;
          playersList.appendChild(li);
      }
  });
}

// Sélectionner un joueur à exclure
function selectPlayerToExclude() {
  const playersList = document.getElementById("playersList");

  const select = document.createElement("select");
  select.id = "playerToExclude";
  players.forEach((player, index) => {
      if (!player.excluded) {
          const option = document.createElement("option");
          option.value = index;
          option.textContent = `${player.name}`;
          select.appendChild(option);
      }
  });

  playersList.innerHTML = "";
  playersList.appendChild(select);

  const excludeButton = document.createElement("button");
  excludeButton.textContent = "Exclure ce joueur";
  excludeButton.onclick = () => excludeSelectedPlayer(select.value);
  playersList.appendChild(excludeButton);
}

// Exclure le joueur sélectionné et vérifier la fin de partie
function excludeSelectedPlayer(playerIndex) {
  const player = players[playerIndex];
  player.excluded = true;
  excludedPlayers.push(player);
  players = players.filter(p => !p.excluded);

  alert(`${player.name} a été exclu.`);
  updatePlayersList();
  checkEndGame();
}

// Arrêter la partie et retourner au menu
function stopGame() {
  const confirmation = confirm("Es-tu sûr de vouloir arrêter la partie ?");
  if (confirmation) {
      window.location.href = "../../jeux.html"; // Retourner au menu
  }
}
