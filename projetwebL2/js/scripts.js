let xmlhttp = new XMLHttpRequest();

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
            fetchData1();
            showPageLinks();
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
function fetchData1(choix_theme = "", choix_niveau = "") {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<tr><th>Question</th><th>Niveau</th><th>Points</th></tr>";
    let x = xmlDoc.getElementsByTagName("question");

    // Filtrer les questions en fonction des choix de thème et de niveau
    let filteredQuestions = [];
    for (i = 0; i < x.length; i++) {
        let questionTheme = x[i].getElementsByTagName("theme")[0].textContent;
        let questionNiveau = x[i].getElementsByTagName("niveau")[0].textContent;

        if ((choix_theme === "" || questionTheme === choix_theme) && 
            (choix_niveau === "" || questionNiveau === choix_niveau)) {
            filteredQuestions.push(x[i]);
        }
    }

    //Calculer nbPage    
    nbPage = Math.ceil(filteredQuestions.length / pageSize);
    //Calculer startIndex et endIndex
    startIndex = (page-1)*pageSize;
    endIndex = startIndex + pageSize;

    //Affichage du tableau
    for (i = startIndex; (i < endIndex && i < filteredQuestions.length); i++) {
        table += "<tr><td>" +
        filteredQuestions[i].getElementsByTagName("contenu")[0].textContent +
        "<a href='detail.html?id=" +
        filteredQuestions[i].getElementsByTagName("id")[0].childNodes[0].nodeValue +
        "'>Details</a>"  +
        "</td><td>" +
        filteredQuestions[i].getElementsByTagName("niveau")[0].textContent +
        "</td><td>" +
        filteredQuestions[i].getElementsByTagName("point")[0].textContent +
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


    // Appeler fetchData1 avec les paramètres de filtre
    fetchData1(choix_theme, choix_niveau);
}

//Bouton pour afficher tout le tableau dans la page apprendre
function reset() {
    document.getElementById("theme").value = "";
    document.getElementById("niveau").value = "";
    loadXMLDoc1();
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
    divpl.style.display = "block";
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
    
    //Récupérer bookId  dans la chaîne de requête
    const urlParams = new URLSearchParams(window.location.search);
    questionid = urlParams.get("id");

    let i;        
    let xmlDoc = xmlhttp.responseXML;    
    let x = xmlDoc.getElementsByTagName("question");    
    
    for (i = 0; i < x.length; i++) {        
        if (x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue == questionid){
            let question = x[i].getElementsByTagName("contenu")[0].childNodes[0].nodeValue;
            document.getElementById("question").innerHTML = question;
            document.getElementById("reponse").innerHTML  = x[i].getElementsByTagName("explication")[0].childNodes[0].nodeValue;
        }
    }
    
} 