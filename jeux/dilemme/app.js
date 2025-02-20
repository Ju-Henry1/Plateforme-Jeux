fetch('/jeux/dilemme/dilemmes.json')
    .then(response => response.json())
    .then(data => {
        window.dilemmes = data;
        nouveauDilemme();
    });

function nouveauDilemme() {
    let dilemme = window.dilemmes[Math.floor(Math.random() * window.dilemmes.length)];
    document.getElementById('dilemme').textContent = dilemme.question;
    document.getElementById('option1').textContent = dilemme.option1;
    document.getElementById('option2').textContent = dilemme.option2;

    // Mise à jour des événements de clic pour passer au dilemme suivant
    document.getElementById('option1').onclick = () => choisir();
    document.getElementById('option2').onclick = () => choisir();
}

function choisir() {
    nouveauDilemme(); // Passer directement au dilemme suivant
}
