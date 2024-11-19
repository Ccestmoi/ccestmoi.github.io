//Base de données
let xmlhttp = new XMLHttpRequest();
let data = [];

//Canvas
let canvas;
let ctx;
if (window.location.pathname.endsWith("statistiques.html")) {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
}

//Définition des variables pour le jeu
let questions_jeu = [];
let currentQuestion = -1;
let maxscore = 0;
let score = 0;
let UserAnswers = [];

//Niveau
let niveau = 1;
let selection = 0;

//Définiton de la variable de temps
let time = 0;
let timerInterval;

//Définition des variables pour les statistiques
let historique = new Array();
let partie = [];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

//Définition des variables pour la pagination
let nbPage = 0;
let pageSize = 5;
let startIndex = 0;
let endIndex = 0;
let page = 1;


//Charge la bdd
function loadXMLDoc1() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (window.location.pathname.includes("detail.html")) {
                displayQuestionById();
            } else {
                fetchData();
            }
        }
    };
    xmlhttp.open("GET", "https://delightful-pond-089795303.4.azurestaticapps.net/projetwebL2/data/bdd.xml", true);
    xmlhttp.send();
}

//Appel de la fonction dans la page apprendre
function fetchData() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");

    data = [];
    for (i = 0; i < x.length; i++) {
        data.push(x[i]);
    }

    if (window.location.pathname.endsWith("apprendre.html")) {
        showPageLinks();
        displayData();
    }
}

//Fonction pour afficher les données dans la page apprendre
function displayData() {
    let table = "<tr><th>Question</th><th>Niveau</th><th>Points</th></tr>";

    //Calculer nbPage    
    nbPage = Math.ceil(data.length / pageSize);
    //Calculer startIndex et endIndex
    startIndex = (page-1)*pageSize;
    endIndex = startIndex + pageSize;

    //Affichage du tableau
    for (i = startIndex; (i < endIndex && i < data.length); i++) {
        table += "<tr><td>" +
        data[i].getElementsByTagName("contenu")[0].textContent +
        "<a href='detail.html?id=" +
        data[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +
        "'><img src='info.svg' width='20px'></a>"  +
        "</td><td>" +
        data[i].getElementsByTagName("niveau")[0].textContent +
        "</td><td>" +
        data[i].getElementsByTagName("point")[0].textContent +
        "</td></tr>";
    }
    document.getElementById("data").innerHTML = table;
    showPageLinks(); // Mettre à jour les liens de pagination
}

//Filtrage de la table dans la page apprendre
function filtrage() {
    //Récupérer les valeurs des champs de filtrage
    let theme = document.getElementById("theme");
    let niveau = document.getElementById("niveau");

    //Filtrer les données
    let choix_theme = theme.value;
    let choix_niveau = niveau.value;

    let i;
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("question");

    data = [];
    for (i = 0; i < x.length; i++) {
        if ((choix_theme === "" || x[i].getElementsByTagName("theme")[0].textContent === choix_theme) &&
            (choix_niveau === "" || x[i].getElementsByTagName("niveau")[0].textContent === choix_niveau)) {
            data.push(x[i]);
        }
    }

    // Trier les données si un tri est sélectionné
    sortData();
}

//Bouton pour afficher tout le tableau dans la page apprendre
function reset() {
    document.getElementById("theme").value = "";
    document.getElementById("niveau").value = "";
    document.getElementById("sort").value = "";
    loadXMLDoc1();
}

//Fonctions de tri
function triPoints(a, b) {
    if (a.getElementsByTagName("point")[0].textContent < b.getElementsByTagName("point")[0].textContent) {
        return -1;
    }
    if (a.getElementsByTagName("point")[0].textContent > b.getElementsByTagName("point")[0].textContent) {
        return 1;
    }
    return 0;
}

//Fonction pour trier les données
function sortData() {
    let n = document.getElementById("sort").value;
    if (n === "Pasc"){
        data.sort(triPoints);
    }
    else if (n === "Pdesc") {
        data.sort(triPoints).reverse();
    }
    displayData();
}

//Fonction pour changer la page des questions dans apprendre
function loadPage(pageNumber) {
    //Mettre à jour la valeur de page en fonction de pageNumber
    page = pageNumber;
    filtrage();
}

//Boutons de paginations dans la page apprendre
function showPageLinks() {
    let divpl = document.getElementById("pageLinks");
    divpl.style.display = "flex";
    var pageLinks = "";
    page = 1;

    for (i = 1; i <= nbPage; i++) {
        pageLinks += "<input type='button' class='btn btn-primary' onclick='loadPage(" + i
        +")' value='"+i+"'></input>";
        
    }
    divpl.innerHTML = pageLinks;
}

//Appel de la fonction dans la page detail
function displayQuestionById() {    
    let questionid;
    
    //Récupérer id  dans la chaîne de requête
    const urlParams = new URLSearchParams(window.location.search);
    questionid = urlParams.get("id");

    let i;        
    let xmlDoc = xmlhttp.responseXML;    
    let x = xmlDoc.getElementsByTagName("question");    
    
    for (i = 0; i < x.length; i++) {        
        if (x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == questionid){
            let question = x[i].getElementsByTagName("contenu")[0].childNodes[0].nodeValue;
            document.getElementById("question").innerHTML = "<h4>Question</h4>" + question;
            document.getElementById("reponses").innerHTML = "<h4>Reponses</h4>";
            // Ajouter chaque réponse possible
            for (let j = 1; j <= 4; j++) {
                let reponse = x[i].getElementsByTagName("reponse" + j)[0].childNodes[0].nodeValue;
                document.getElementById("reponses").innerHTML += "<p>" + reponse + "</p>";
            }
            document.getElementById("reponse").innerHTML  = "<h4>Explication</h4>" + x[i].getElementsByTagName("explication")[0].childNodes[0].nodeValue;
        }
    }
} 

//Fonction de choix de niveau
function Niveau(n) {
    //Définition du niveau
    if (n == "1") {
        document.getElementById("validation").style.display = "block";
        niveau = 1;
    } else if (n == "2") {
        niveau = 2;
    } else if (n == "3") {
        niveau = 3;
    }

    //Affichage des divisions du jeu
    document.getElementById("niveau").style.display = "none";
    document.getElementById("timer").style.display = "flex";
    document.getElementById("question").style.display = "flex";
    startjeu();
}

//Fonction pour démarrer le jeu
function startjeu(){
    //Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    const lot = urlParams.get('lot');

    if (theme) {
        // Charger les questions en fonction du thème
        for (let i = 0; i < data.length; i++) {
            if (data[i].getElementsByTagName("theme")[0].textContent === theme) {
                questions_jeu.push(data[i]);
                maxscore += parseInt(data[i].getElementsByTagName("point")[0].textContent);
            }
        }
    }

    if (lot) {
        // Charger les questions en fonction du lot
        for (let i = 0; i < data.length; i++) {
            if (data[i].getElementsByTagName("lot")[0].textContent === lot) {
                questions_jeu.push(data[i]);
                maxscore += parseInt(data[i].getElementsByTagName("point")[0].textContent);
            }
        }
    }

    displayQuestion();
};

//Fonction pour le timer
function timer() {
    timerInterval = setInterval(function() {
        time--;
        if (time > -1) {
            document.getElementById("timer-value").innerHTML = time;
        } else {
            clearInterval(timerInterval); // Arrêt du timer
            displayQuestion();
        }
    }, 1000);
}

//Fonction pour afficher les questions dans le jeu
function displayQuestion() {
    if (currentQuestion >= questions_jeu.length - 1) {
        endGame();
        return;
    }
    currentQuestion++;

    //Timer
    if (niveau == 1) {
        time = 30;
        document.getElementById("timer-value").innerHTML = 30;
    } else if (niveau == 2) {
        time = 20;
        document.getElementById("timer-value").innerHTML = 20;
    } else if (niveau == 3) {
        time = 5;
        document.getElementById("timer-value").innerHTML = 5;
    }
    timer();

    let question = questions_jeu[currentQuestion];
    document.getElementById("question").innerHTML = "<h4>Question</h4><br>" + question.getElementsByTagName("contenu")[0].textContent;
    document.getElementById("reponses-choix").innerHTML = "<br><h4>Reponses</h4>";
    // Ajouter chaque réponse possible
    for (let j = 1; j <= 4; j++) {
        let reponse = question.getElementsByTagName("reponse" + j)[0].textContent;
        if (niveau > 1) {
            document.getElementById("reponses-choix").innerHTML += "<button type='button' class='btn btn-outline-primary' onclick='checkAnswer(" + j + ")'>" + reponse + "</button>";
        } else {
            document.getElementById("reponses-choix").innerHTML += "<button type='button' class='btn btn-outline-primary' onclick='selectionReponse(" + j + ")'>" + reponse + "</button>";
        }
    }

    
}

// Fonction selection de la réponse
function selectionReponse(n) {
    selection = n;
    // Retirer la classe 'selected-button' de tous les boutons
    let buttons = document.querySelectorAll('#reponses-choix button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected-button');
    }

    // Ajouter la classe 'selected-button' au bouton sélectionné
    buttons[n - 1].classList.add('selected-button');
}

//Fonction de validation
function validateAnswer() {
    checkAnswer(selection);
}

//Fonction pour vérifier la réponse
function checkAnswer(reponse) {
    clearInterval(timerInterval);

    let question = questions_jeu[currentQuestion];
    let reponseCorrecte = question.getElementsByTagName("bonnereponse")[0].textContent;
    UserAnswers.push(reponse);
    if (reponse == reponseCorrecte) {
        if (niveau != 3) {
            document.body.style.backgroundColor = "rgb(0, 255, 0, 0.5)";
        }
        score += parseInt(question.getElementsByTagName("point")[0].textContent);
    } else {
        if (niveau != 3) {
            document.body.style.backgroundColor = "rgb(255, 0, 0, 0.5)";
        }
    }
    let fchaine = Array.from(UserAnswers).join(',');
    localStorage.setItem("reponses", fchaine);

    setTimeout(function() {document.body.style.backgroundColor = "";displayQuestion()}, 1000);
}

//Fonction de création du tableau de correction
function correction() {
    //Récupération des réponses utilisateur
    let fchaine = localStorage.getItem("reponses");
    let reponses = [];

    if (fchaine) {
        reponses = fchaine.split(",");
    } else {
        reponses = new Array(questions_jeu.length).fill(undefined);
    }

    //Création du tableau
    let table = "<tr><th>Question</th><th>Réponse correcte</th><th>Réponse donnée</th><th>Explication</th></tr>";
    for (let i = 0; i < questions_jeu.length; i++) {
        let question = questions_jeu[i];
        let reponseCorrecte = question.getElementsByTagName("bonnereponse")[0].textContent;

        //Gestion des réponses utilisateur
        let ReponseUser = reponses[i];
        if (ReponseUser == undefined) {
            ReponseUser = "Pas de réponse";
        } else {
            ReponseUser = question.getElementsByTagName("reponse" + ReponseUser)[0].textContent;
        }

        //Création du tableau
        table += "<tr><td>" +
        question.getElementsByTagName("contenu")[0].textContent +
        "</td><td>" +
        question.getElementsByTagName("reponse" + reponseCorrecte)[0].textContent +
        "</td><td>" +
        ReponseUser +
        "</td><td>" +
        question.getElementsByTagName("explication")[0].textContent +
        "</td></tr>";
    }
    document.getElementById("table-correction").innerHTML = table;
}

//Fonction fin de jeu
function endGame() {
    //Récupération de l'historique
    let fchaine1 = localStorage.getItem("historique");
    if (fchaine1 == null) {
        historique = [];
    } else {
        historique = JSON.parse(fchaine1);
    }

    //Récupération de la date
    let now = new Date();
    let date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    //Calcul du score
    let scoreSur10 = (score/maxscore) * 10;
    scoreSur10 = scoreSur10.toFixed(2);

    //Enregistrement de la partie
    partie = [scoreSur10, date];

    //Enregistrement de la partie dans l'historique
    historique.push(partie);
    let fchaine = JSON.stringify(historique);
    console.log(fchaine);
    localStorage.setItem("historique", fchaine);
    
    correction();
    document.getElementById("question").style.display = "none";
    document.getElementById("choix").style.display = "none";
    document.getElementById("timer").style.display = "none";
    document.getElementById("score").innerHTML += score + "/" + maxscore;
    document.getElementById("fin").style.display = "flex";
    localStorage.removeItem("reponses");
}

// Fonction de chargement des statistiques
function loadStats() {
    // Récupération des statistiques
    let fchaine = localStorage.getItem("historique");

    if (fchaine) {
        historique = JSON.parse(fchaine);
    } else {
        document.getElementById("stats").innerHTML = "<br><h2>Statistiques</h2><br> Pas de statistiques disponibles";
        return;
    }

    // Affichage des statistiques
    let nb_parties = historique.length;
    let scoremoyen = 0;

    for (let i = 0; i < nb_parties; i++) {
        scoremoyen += parseFloat(historique[i][0]);
    }

    scoremoyen = scoremoyen / nb_parties;

    document.getElementById("nb_parties").innerHTML += nb_parties;
    document.getElementById("score_moy").innerHTML += scoremoyen.toFixed(2);

    updateHistogram();
}

// Fonction pour mettre à jour l'histogramme
function updateHistogram() {
    let now = new Date(currentYear, currentMonth);
    let month_year = now.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

    // Mettre la première lettre du mois en majuscule
    month_year = month_year.charAt(0).toUpperCase() + month_year.slice(1);

    document.getElementById("histogramme").innerHTML = "<button class='btn btn-primary' onclick='prevMonth()'>Précédent</button>" + month_year + "<button class='btn btn-primary' onclick='nextMonth()'>Suivant</button>";

    // Affichage du graphique
    drawHistogram();
}

// Fonction pour passer au mois précédent
function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    updateHistogram();
}

// Fonction pour passer au mois suivant
function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    updateHistogram();
}

// Fonction de dessin de l'histogramme
function drawHistogram() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let max_height = 400;
    let colonne_width = 10;
    let vertical_offset = 20; // Décalage vertical

    // Dessiner l'axe vertical avec des graduations jusqu'à 10
    ctx.beginPath();
    ctx.moveTo(50, vertical_offset);
    ctx.lineTo(50, max_height + vertical_offset);
    ctx.stroke();

    for (let i = 0; i <= 10; i++) {
        let y = max_height - (i * 40) + vertical_offset;
        ctx.moveTo(45, y);
        ctx.lineTo(55, y);
        ctx.stroke();
        ctx.fillText(i, 30, y + 5);
    }

    // Dessiner l'axe horizontal avec 30 ou 31 jours en fonction du mois
    let now = new Date(currentYear, currentMonth);
    let daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    ctx.beginPath();
    ctx.moveTo(50, max_height + vertical_offset);
    ctx.lineTo(70 + (daysInMonth * (colonne_width + 15)), max_height + vertical_offset);
    ctx.stroke();

    for (let i = 1; i <= daysInMonth; i++) {
        let x = 50 + (i * (colonne_width + 15));

        // Formater la date sous la forme "DD/MM"
        if (i % 2 == 0) {
            let date = new Date(now.getFullYear(), now.getMonth(), i);
            let dateString = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
            ctx.fillText(dateString, x - 15, max_height + vertical_offset + 20);
        }
    }

    // Calculer la moyenne des scores pour chaque jour
    let scoresByDay = Array(daysInMonth).fill(0);
    let countsByDay = Array(daysInMonth).fill(0);

    for (let i = 0; i < historique.length; i++) {
        let date = new Date(historique[i][1]);
        if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
            let day = date.getDate() - 1;
            scoresByDay[day] += parseFloat(historique[i][0]);
            countsByDay[day]++;
        }
    }

    let averagesByDay = scoresByDay.map((total, index) => countsByDay[index] ? total / countsByDay[index] : 0);

    // Dessiner l'histogramme à partir des moyennes calculées
    for (let i = 0; i < daysInMonth; i++) {
        let x = 42 + ((i + 1) * (colonne_width + 15)); // Ajuster la position horizontale
        let height = -averagesByDay[i] * 40; // Ajuster l'échelle si nécessaire
        ctx.fillRect(x, max_height + vertical_offset, colonne_width, height);
    }

    for (let i = 0; i < historique.length; i++) {
        let date = new Date(historique[i][1]);
        if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
            let day = date.getDate() - 1;
            scoresByDay[day] += parseFloat(historique[i][0]);
            countsByDay[day]++;
        }
    }
}

//Fonction thème aléatoire
//function randomTheme() {
//    let themes = ["nature", "dechets", "monde", "energie", "transport", "numerique"];
//    let random = Math.floor(Math.random() * themes.length);
//    let theme = themes[random];
//    window.location.href = "jeu.html?theme=" + theme;
//}
//Fonction lot aléatoire
//function randomLot() {
//    let lots = ["1", "2", "3"];
//    let random = Math.floor(Math.random() * lots.length);
//    let lot = lots[random];
//    window.location.href = "jeu.html?lot=" + lot;
//}