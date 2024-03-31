/* Déclaration du thème par défaut */
let mode = 'dark'

/* JS pour le theme sombre et clair */

function lightdark(){
    /* Récuprération des éléments à modifier */
    let button = document.getElementById('darklight');
    let mode = button.value;
    let bordure = document.getElementById('Menu');
    let labels = document.getElementsByTagName('label');
    let titre = document.getElementById('Titre');
    let logo = document.getElementById('Logo');

    /* Animation de transition */
    bordure.style.transition = "box-shadow 1s ease-in-out";
    bordure.style.transition = "border-color 1s ease-in-out";
    document.body.style.transition = "background-image 1s ease-in-out";

    /* Changement de thème */
    if (mode == 'dark'){
        button.value = 'light';
        if (window.location.pathname.endsWith('Apropos.html')){
            button.src = '../img/sun.max.fill.svg'
            document.body.style.backgroundImage = "url(../img/FondApropos_light.png)";
            bordure.style.boxShadow = "0px 0px 15px #000000";
            bordure.style.borderColor = "rgba(195, 209, 220)";
        } else if (window.location.pathname.endsWith('Inscription.html')){
            for(let i = 0; i < labels.length; i++){
                labels[i].style.color = "black";
            }
            button.src = '../img/sun.max.fill.white.svg'
            logo.src = "../img/LogoSiteWeb_white.png";
            document.body.style.backgroundImage = "url(../img/Mosaic_White.png)";
            bordure.style.borderColor = "rgba(0, 0, 0, 0.5)";
            bordure.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
            titre.style.color = "black";
        }
    } else {
        button.value = 'dark';
        if (window.location.pathname.endsWith('Apropos.html')){
            button.src = '../img/moon.fill.svg'
            document.body.style.backgroundImage = "url(../img/FondApropos.png)";
            bordure.style.boxShadow = "0px 0px 15px #F2F29E";
            bordure.style.borderColor = "rgba(255, 255, 220, 0.368)";
        } else if (window.location.pathname.endsWith('Inscription.html')){
            for(let i = 0; i < labels.length; i++){
                labels[i].style.color = "white";
            }
            button.src = '../img/moon.fill.black.svg'
            logo.src = "../img/LogoSiteWeb_dark.png";
            document.body.style.backgroundImage = "url(../img/Mosaic_Black.png)";
            bordure.style.borderColor = "rgba(116, 116, 116, 0.251)";
            bordure.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
            titre.style.color = "white";
        }
    }
}

/* JS pour l'outil de calcul */

function pourcentage(){
    let pourcentage = document.getElementById("pourcentage").value;
    let valeur = document.getElementById("valeur").value;
    let calculpourcentage = (parseFloat(valeur) * parseFloat(pourcentage)) / 100;
    alert(pourcentage + "% de " + valeur + " est égal à : " + calculpourcentage);

}

/* JS pour le diaporama de la page Culture.html */
if (window.location.pathname.endsWith('Culture.html')){

    var images = [
    '../img/Santa Clara de Asis.jpeg',
    '../img/DeSaissetMuseum.png',
    '../img/Levis_Stadium.png',
    '../img/CaliforniasGreatAmerica.png',
    '../img/Intel_Museum.png'
    ];

    var indexCourant = 0;

    function afficherGrandeImage(index) {
    var grandeImage = document.getElementById('grandeImage');
    grandeImage.src = images[index];
    indexCourant = index;
    }

    function previous(){
    var newIndex = indexCourant - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    afficherGrandeImage(newIndex);
    };

    function next(){
    var newIndex = indexCourant + 1;
    if (newIndex >= images.length) newIndex = 0;
    afficherGrandeImage(newIndex);
    };
}

/* JS pour le diaporama de la page Entreprises.html */
if (window.location.pathname.endsWith('Entreprises.html')){
    let auto = setInterval(next2, 2000);

    var images2 = [
    '../img/Intel_logo.svg',
    '../img/AMD_Logo.svg',
    '../img/Sun_Microsystems_Logo.svg',
    '../img/Nvidia_logo.svg',
    '../img/Dell_logo.svg',
    '../img/PaloAltoNetworks_Logo.svg',
    '../img/Oracle_logo.svg',
    '../img/McAfee_logo.svg'
    ];

    var indexCourant2 = 0;

    function afficherGrandeImage2(index) {
    var grandeImage2 = document.getElementById('Logos');
    grandeImage2.src = images2[index];
    indexCourant2 = index;
    }

    function previous2(){
    var newIndex = indexCourant2 - 1;
    if (newIndex < 0) newIndex = images2.length - 1;
    afficherGrandeImage2(newIndex);
    };

    function next2(){
    var newIndex = indexCourant2 + 1;
    if (newIndex >= images2.length) newIndex = 0;
    afficherGrandeImage2(newIndex);
    };
}
/* Animation Pacman */

if (window.location.pathname.endsWith('Apropos.html')){
    Animate();

    let positionpac = 0;
    let positionghosts = -0;
    let aller = true;

    function Animate() {
        let mouvement = setInterval(move, 5);
    }

    function move() {
        let pacman = document.getElementById('Pacman');
        let pac = document.getElementById('Pac');
        let ghost = document.getElementById('Ghost');
        let largeur = window.innerWidth;

        if (positionpac == largeur + 200){
            aller = false;
        } 
    
        if (positionpac == -200){
            aller = true;
        }

        if (aller){
            positionpac += 1;
            pacman.style.left = positionpac + 'px';
            pac.src = "../img/pacman_chased.gif";
            ghost.src = "../img/ghosts_chasing.gif";
        } else {
            positionpac -= 1;
            pacman.style.left = positionpac + 'px';
            pac.src = "../img/pacman_chasing.gif";
            ghost.src = "../img/ghosts_chased.gif";
        }
    }
}

/* Formulaire d'inscription */

function Validation(){
    /* Récupération des valeurs des champs */

    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let annee = document.getElementById('age').value;
    let sexe = document.getElementById('sexe').value;
    let numero = document.getElementById('numero').value;
    let mail = document.getElementById('email').value;

    /* Définition des expressions régulières */
    let regexp = /^[A-Za-z]+$/;
    let regexp2 = /^[0-9]+$/;
    let regexp3 = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i

    let message = "";

    /* Vérification des champs */

    if (nom == ""){
        message += "- Veuillez saisir votre nom\n";
    }

    if (!regexp.test(nom)){
        message += "- Le nom doit contenir uniquement des caractères alphabétiques\n";
    }
    
    if (prenom == ""){
        message += "- Veuillez saisir votre prénom\n";
    }

    if (!regexp.test(prenom)){
        message += "- Le prénom doit contenir uniquement des caractères alphabétiques\n";
    }

    if (annee == ""){
        message += "- Veuillez saisir votre année de naissance\n";
    }

    if (!regexp2.test(annee)){
        message += "- L'année de naissance doit contenir uniquement des chiffres\n";
    }

    if (annee > 2005){
        message += "- Vous devez être majeur pour vous inscrire\n";
    }

    if (sexe == ""){
        message += "- Veuillez saisir votre sexe\n";
    }

    if (numero == ""){
        message += "- Veuillez saisir votre numéro de téléphone\n";
    }

    if (!regexp2.test(numero)){
        message += "- Le numéro de téléphone doit contenir uniquement des chiffres\n";
    }

    if(numero.length != 10){
        message += "- Le numéro de téléphone doit contenir 10 chiffres\n";
    }

    if (mail == ""){
        message += "- Veuillez saisir votre adresse mail\n";
    }

    if (!regexp3.test(mail)){
        message += "- L'adresse mail n'est pas valide\n";
    }
    
    if (message != ""){
        alert(message);
    } else {
        Clear();
        document.getElementById('Formulaire').style.display = 'none';
        document.getElementById('OK').style.display = 'flex';
        setTimeout(function(){
            document.getElementById('Formulaire').style.display = 'flex';
            document.getElementById('OK').style.display = 'none';
        }, 2000);
    }
}

function Clear(){
    document.getElementById('nom').value = "";
    document.getElementById('prenom').value = "";
    document.getElementById('age').value = "";
    document.getElementById('sexe').checked = false;
    document.getElementById('numero').value = "";
    document.getElementById('email').value = "";
}