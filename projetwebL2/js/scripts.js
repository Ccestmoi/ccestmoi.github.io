let xmlhttp = new XMLHttpRequest();

function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
        }
    };
    xmlhttp.open("GET", "https://obiwan.univ-brest.fr/~e22304494/data/bdd.xml", true);
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