/* Déclaration du thème par défaut */
let mode = 'dark'

/*
window.addEventListener('load', function(){
    let loading = document.getElementById('loading');
    if(loading){
        loading.style.display = 'flex';
    }
});*/

function lightdark(){
    let button = document.getElementById('darklight');
    let mode = button.value;
    let bordure = document.getElementById('Menu');
    bordure.style.transition = "box-shadow 1s ease-in-out";
    document.body.style.transition = "background-image 1s ease-in-out";

    if (mode == 'dark'){
        button.value = 'light';
        button.src = '../img/sun.max.fill.svg'
        document.body.style.backgroundImage = "url(../img/FondApropos_light.png)";
        bordure.style.boxShadow = "0px 0px 15px #000000";
        bordure.style.borderColor = "rgba(195, 209, 220)";
    } else {
        button.value = 'dark';
        button.src = '../img/moon.fill.svg'
        document.body.style.backgroundImage = "url(../img/FondApropos.png)";
        bordure.style.boxShadow = "0px 0px 15px #F2F29E";
        bordure.style.borderColor = "rgba(255, 255, 220, 0.368)";
    }
}

function pourcentage(){
    let pourcentage = document.getElementById("pourcentage").value;
    let valeur = document.getElementById("valeur").value;
    let calculpourcentage = (parseFloat(valeur) * parseFloat(pourcentage)) / 100;
    alert(pourcentage + "% de " + valeur + " est égal à : " + calculpourcentage);

}

/* JS pour le diaporama de la page Culture.html */

var images = [
    '../img/Santa Clara de Asis.jpeg',
    '../img/DeSaissetMuseum.png',
    '../img/Levis_Stadium.png',
    '../img/CaliforniasGreatAmerica.png',
    '../img/Intel_Museum.png'
];

var indexCourant = 0;

function initialiserDiaporama(){
    for (var i = 0; i < images.length; i++) {
        var img = document.createElement('img');
        img.src = images[i];
        afficherGrandeImage(ind);
    }
    afficherGrandeImage(0);
};

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

/* JS pour le diaporama de la page Entreprises.html */

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

let auto = setInterval(next2, 2000);

function initialiserDiaporama(){
    for (var i = 0; i < images2.length; i++) {
        var img = document.createElement('img');
        img.src = images2[i];
    }
};


function afficherGrandeImage2(index) {
    var grandeImage = document.getElementById('Logos');
    grandeImage.src = images2[index];
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