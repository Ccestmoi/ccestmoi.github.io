//Base de données
let xmlhttp = new XMLHttpRequest();
let data = [];

//Définition des variables pour le jeu
let questions_jeu = [];
let currentQuestion = -1;
let maxscore = 0;
let score = 0;
let UserAnswers = [];

//Niveau
let niveau = 1;
let selection = 0;

//Définition des variables pour les statistiques



//Définition des variables pour la pagination
let nbPage = 0;
let pageSize = 5;
let startIndex = 0;
let endIndex = 0;
let page = 1;

//Charge la bdd pour la page apprendre
function loadXMLDoc1() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
        }
    };
    xmlhttp.open("GET", "https://delightful-pond-089795303.4.azurestaticapps.net/projetwebL2/data/bdd.xml", true);
    xmlhttp.send();
}

//Charge la bdd pour la page detail
function loadXMLDocDisplay() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            displayQuestionById();
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
    let theme = document.getElementById("theme");
    let niveau = document.getElementById("niveau");

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
    displayData();
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
        pageLinks += "<input type='button' onclick='loadPage(" + i
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
    if (n == "1") {
        document.getElementById("validation").style.display = "block";
        niveau = 1;
        time = 30;
    } else if (n == "2") {
        niveau = 2;
        time = 20;
    } else if (n == "3") {
        niveau = 3;
        time = 10;
    }
    console.log(niveau);
    document.getElementById("niveau").style.display = "none";
    document.getElementById("question").style.display = "flex";
    startjeu();
}

//Fonction pour démarrer le jeu
function startjeu(){
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    const lot = urlParams.get('lot');

    if (theme) {
        // Charger les questions en fonction du thème
        console.log("Thème sélectionné : " + theme);
        for (let i = 0; i < data.length; i++) {
            if (data[i].getElementsByTagName("theme")[0].textContent === theme) {
                questions_jeu.push(data[i]);
                maxscore += parseInt(data[i].getElementsByTagName("point")[0].textContent);
            }
        }
    }

    if (lot) {
        // Charger les questions en fonction du lot
        console.log("Lot sélectionné : " + lot);
        for (let i = 0; i < data.length; i++) {
            if (data[i].getElementsByTagName("lot")[0].textContent === lot) {
                questions_jeu.push(data[i]);
                maxscore += parseInt(data[i].getElementsByTagName("point")[0].textContent);
            }
        }
    }
    displayQuestion();
};

//Fonction pour afficher les questions dans le jeu
function displayQuestion() {
    if (currentQuestion >= questions_jeu.length - 1) {
        endGame();
        return;
    }
    currentQuestion++;
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
    let question = questions_jeu[currentQuestion];
    let reponseCorrecte = question.getElementsByTagName("bonnereponse")[0].textContent;
    UserAnswers.push(reponse);
    if (reponse == reponseCorrecte) {
        document.body.style.backgroundColor = "rgb(0, 255, 0, 0.5)";
        score += parseInt(question.getElementsByTagName("point")[0].textContent);
    } else {
        document.body.style.backgroundColor = "rgb(255, 0, 0, 0.5)";
        //alert("Mauvaise réponse !");
    }
    let fchaine = Array.from(UserAnswers).join(',');
    localStorage.setItem("reponses", fchaine);

    setTimeout(function() {document.body.style.backgroundColor = "";displayQuestion()}, 1000);
}

//Fonction de création du tableau de correction
function correction() {
    let fchaine = localStorage.getItem("reponses");
    let reponses = fchaine.split(',');
    console.log(reponses);
    let table = "<tr><th>Question</th><th>Réponse correcte</th><th>Réponse donnée</th></tr>";
    for (let i = 0; i < questions_jeu.length; i++) {
        let question = questions_jeu[i];
        let reponseCorrecte = question.getElementsByTagName("bonnereponse")[0].textContent;
        console.log(reponses[i]);
        table += "<tr><td>" +
        question.getElementsByTagName("contenu")[0].textContent +
        "</td><td>" +
        question.getElementsByTagName("reponse" + reponseCorrecte)[0].textContent +
        "</td><td>" +
        question.getElementsByTagName("reponse" + reponses[i])[0].textContent +
        "</td></tr>";
    }
    document.getElementById("table-correction").innerHTML = table;
}

//Fonction fin de jeu
function endGame() {
    correction();
    document.getElementById("question").style.display = "none";
    document.getElementById("choix").style.display = "none";
    document.getElementById("score").innerHTML += score + "/" + maxscore;
    document.getElementById("score").style.display = "flex";
    document.getElementById("table-correction").style.display = "flex";
    localStorage.removeItem("reponses");
}