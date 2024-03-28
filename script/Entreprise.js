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