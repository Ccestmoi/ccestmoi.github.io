let xmlhttp = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", function() {
    loadXMLDoc1();
});

function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
        }
    };
    xmlhttp.open("GET", "https://delightful-pond-089795303.4.azurestaticapps.net/projetwebL2/data/bdd.xml", true);
    xmlhttp.send();
}

function fetchData() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<tr><th>Question</th><th>Reponses</th><th>Nb choix</th></tr>";
    let x = xmlDoc.getElementsByTagName("question");
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("contenu")[0].textContent +
        "</td><td>" +
        x[i].getElementsByTagName("reponse1")[0].textContent + "<br>" + x[i].getElementsByTagName("reponse2")[0].textContent + "<br>" +
        x[i].getElementsByTagName("reponse3")[0].textContent + "<br>" + x[i].getElementsByTagName("reponse4")[0].textContent + "<br>" +
        "</td><td>" +
        x[i].getElementsByTagName("choix")[0].textContent +
        "</td>"         
        "</tr>";
    }
    document.getElementById("data").innerHTML = table;
}

function loadXMLDoc1() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData1();
        }
    };
    xmlhttp.open("GET", "https://delightful-pond-089795303.4.azurestaticapps.net/projetwebL2/data/bdd.xml", true);
    xmlhttp.send();
}

function fetchData1() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<tr><th>Question</th><th>Niveau</th><th>Points</th></tr>";
    let x = xmlDoc.getElementsByTagName("question");
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
        x[i].getElementsByTagName("contenu")[0].textContent +
        "</td><td>" +
        x[i].getElementsByTagName("niveau")[0].textContent +
        "</td><td>" +
        x[i].getElementsByTagName("point")[0].textContent +
        "</td></tr>";
    }
    document.getElementById("data").innerHTML = table;
}

function filtrage() {
    let theme = document.getElementById("theme");
    let niveau = document.getElementById("niveau");

    let choix_theme = theme.value;
    let choix_niveau = niveau.value;

    // Construction d'une nouvelle table
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let i;
            let xmlDoc = xmlhttp.responseXML;
            let table = "<tr><th>Question</th><th>Niveau</th><th>Points</th></tr>";
            let x = xmlDoc.getElementsByTagName("question");
            for (i = 0; i < x.length; i++) {
                let questionTheme = x[i].getElementsByTagName("theme")[0].textContent;
                let questionNiveau = x[i].getElementsByTagName("niveau")[0].textContent;

                if ((choix_theme === "" || questionTheme == choix_theme) && 
                    (choix_niveau === "" || questionNiveau == choix_niveau)) {
                    table += "<tr><td>" +
                    x[i].getElementsByTagName("contenu")[0].textContent + 
                    "</td><td>" +
                    questionNiveau +
                    "</td><td>" +
                    x[i].getElementsByTagName("point")[0].textContent +
                    "</td></tr>";
                }
            }
            document.getElementById("data").innerHTML = table;
        }
    };
    xmlhttp.open("GET", "https://delightful-pond-089795303.4.azurestaticapps.net/projetwebL2/data/bdd.xml", true);
    xmlhttp.send();  
}

function reset() {
    document.getElementById("theme").value = "";
    document.getElementById("niveau").value = "";
    loadXMLDoc1();
}