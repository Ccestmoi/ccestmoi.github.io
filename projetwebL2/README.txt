//ATTRIBUTS ET DESCRIPTION DES QUESTIONS DE LA BDD

Chaque question possède les balises suivantes :

- id : Identifiant unique pour trouver la question dans la base de données.
- theme : Thématique de la question (ex. : nature, transport, énergie, etc.).
- niveau : Difficulté de la question (facile, moyen, difficile).
- contenu : La question sous forme de texte.
- reponse1 : Première réponse possible.
- reponse2 : Deuxième réponse possible.
- reponse3 : Troisième réponse possible.
- reponse4 : Quatrième réponse possible.
- bonnereponse : Numéro de la bonne réponse (1, 2, 3 ou 4).
- point : Points donnés si la réponse est correcte.
- explication : Explication de la réponse après validation des réponses de l'utilisateur.


//UTILISATION DES PAGES WEB

Page index.html:
   -  Barre de navigation avec des liens vers les autres pages du site
   -  Tuiles cliquables pour commencer une partie de jeu en fonction du thème et du lot sélectionné


Page apprendre.html:
   - Barre de navigation avec des liens vers les autres pages du site
   - Sélecteurs de filtrage en fonction du thème et du niveau
   - Sélecteur de tri en fonction des points de la question en ordre croissant/décroissant
   - Table HTML avec 5 questions et son niveau/points par page (54 questions au total)
   - À côté de chaque question, un bouton cliquable pour accéder au détail de la question
   - Boutons de pagination pour changer la page de questions affichées dans la table


Page statistiques.html:
   - Barre de navigation avec des liens vers les autres pages du site
   - Message affiché si aucune partie n'a été jouée
   - Sinon, affichage du nombre de parties jouées et la moyenne générale
   - Affichage de l'historique des moyennes sur 10 par jour sous forme d'un histogramme pour le mois actuel
   - Boutons précédent et suivant pour changer le mois affiché dans l'histogramme


Page jeu.html:
   - Barre de navigation avec un lien vers l'accueil (la progression dans la partie est perdue)
   - Premier choix de l'utilisateur: le niveau (temps plus ou moins court pour répondre à la question
      et possibilité de savoir si la réponse était vraie ou fausse) sous forme d'un bouton cliquable 
      qui lance ensuite la partie
   - Lorsque la partie est lancée, le minuteur, la première question et les réponses possibles sont affichés.
   - Pour le niveau facile, le bouton "Valider" doit être cliqué pour valider la réponse, pour les autres niveaux, 
      un simple clic sur la réponse la valide.
   - Si l'utilisateur arrive à cours de temps, la question est considérée comme non répondue
   - Lorsque toutes les questions sont passées, le score obtenu sur le score maximal ainsi qu'une table avec 
      les questions, la réponse correcte, celle répondue et l'explication, et le bouton de retour à l'accueil 
      sont affichés.
   

// DOCUMENTATION DES FONCTIONS DU JAVASCRIPT

Fonction loadXMLDoc1():
   Description:
      La fonction loadXMLDoc1() est utilisée pour charger une base de données XML contenant les questions du jeu.
      Elle envoie une requête HTTP pour récupérer le fichier XML.

   Fonctionnement:
      1. Crée une nouvelle instance de  XMLHttpRequest .
      2. Si la requête est terminée avec succès ( readyState == 4  et  status == 200 ), elle vérifie la page actuelle :
         - Si la page est  detail.html , elle appelle la fonction  displayQuestionById .
         - Sinon, elle appelle la fonction  fetchData .
      3. Envoie la requête HTTP pour récupérer le fichier XML à partir de l'URL spécifiée.


Fonction fetchData():
   Description:
      La fonction fetchData() est utilisée pour extraire les données des questions de la bdd et les place dans un tableau.
      Elle affiche les questions si la page est  apprendre.html .

   Fonctionnement:
      1. Initialise un tableau vide  data .
      2. Récupère le document XML.
      3. Parcourt tous les éléments  <question>  du document XML et les ajoute au tableau  data .
      4. Si la page actuelle est  apprendre.html , elle appelle les fonctions  showPageLinks()  et  displayData()  pour l'affichage des questions.


Fonction displayData():
   Description:
      La fonction displayData() est utilisée pour afficher les questions du tableau data, dans un tableau HTML.
      Elle gère les index de la pagination.

   Fonctionnement:
      1. Initialise une variable  table  avec les en-têtes du tableau HTML.
      2. Calcule le nombre total de pages ( nbPage ) en fonction de la taille de la page ( pageSize ).
      3. Calcule les indices de début ( startIndex ) et de fin ( endIndex ) pour les questions à afficher sur la page actuelle.
      4. Parcourt les questions de  startIndex  à  endIndex  et ajoute chaque question au tableau HTML.
      5. Met à jour le contenu de l'élément HTML avec l'ID  data  avec le tableau HTML généré.
      6. Appelle la fonction  showPageLinks  pour mettre à jour les liens de pagination.


Fonction filtrage():
   Description:
      La fonction filtrage est utilisée pour filtrer les questions affichées sur la page  apprendre.html  en fonction des critères sélectionnés par l'utilisateur,
      tels que le thème et le niveau de difficulté des questions.

   Fonctionnement:
      1. Récupère les valeurs des filtres sélectionnés par l'utilisateur (thème et niveau).
      2. Parcourt toutes les questions dans le tableau  data  et vérifie si elles correspondent aux critères de filtrage.
      3. Si une question correspond aux critères, elle est ajoutée à  filteredData .
      4. Met à jour le tableau  data  avec les questions filtrées.
      5. Appelle la fonction  displayData  pour afficher les questions filtrées.


Fonction reset():
   Description:
      La fonction  reset  est utilisée pour réinitialiser les filtres appliqués aux questions et afficher toutes les questions disponibles sur la page  apprendre.html .

   Fonctionnement:
      1. Réinitialise les valeurs des filtres de thème et de niveau.
      2. Réinitialise le tableau  data  avec toutes les questions initialement chargées.
      3. Appelle la fonction  displayData  pour afficher toutes les questions sans aucun filtrage.


Fonction triPoints(a,b):
   Description:
      La fonction  triPoints  est utilisée pour trier les questions en fonction du nombre de points attribués à chaque question.
      Elle organise les questions par ordre croissant ou décroissant de points.

   Fonctionnement:
      1. Compare les points de deux questions.
      2. Retourne une valeur négative, zéro ou positive pour déterminer l'ordre de tri :
         - Retourne une valeur négative si les points de la première question sont inférieurs à ceux de la deuxième question.
         - Retourne zéro si les points des deux questions sont égaux.
         - Retourne une valeur positive si les points de la première question sont supérieurs à ceux de la deuxième question.


Fonction sortData():
   Description:
      La fonction  sortData  est utilisée pour trier les questions affichées sur la page  apprendre.html  en fonction du critère de tri sélectionné par l'utilisateur.

   Fonctionnement:
      1. Récupère la valeur du critère de tri sélectionné par l'utilisateur.
      2. Trie le tableau  data  en fonction du critère sélectionné :
        - Si le critère est "Pasc", utilise la fonction  triPoints  pour trier les questions par nombre de points en ordre croissant.
        - Si le critère est "Pdesc", utilise la fonction  triPoints  pour trier les questions par nombre de points en ordre décroissant.
      3. Appelle la fonction  displayData  pour afficher les questions triées.


Fonction loadPage(pageNumber):
   Description:
      La fonction  loadPage  est utilisée pour changer la page des questions affichées sur la page  apprendre.html .
      Elle permet de naviguer entre les différentes pages de questions en fonction du numéro de page sélectionné.

   Fonctionnement:
      1. Met à jour la valeur de la variable  page  en fonction du numéro de page ( pageNumber ) passé en paramètre.
      2. Appelle la fonction  filtrage  pour appliquer les filtres et afficher les questions de la page sélectionnée.


Fonction showPageLinks():
   Description:
      La fonction  showPageLinks  est utilisée pour afficher les liens de pagination sur la page  apprendre.html .
      Elle permet de naviguer entre les différentes pages de questions.

   Fonctionnement:
      1. Récupère l'élément HTML avec l'ID  pageLinks  et applique le mode flex.
      2. Initialise une variable  pageLinks  pour stocker les boutons de pagination.
      3. Réinitialise la valeur de la variable  page  à 1.
      4. Parcourt le nombre total de pages ( nbPage ) et génère un bouton de pagination pour chaque page.
      5. Met à jour le contenu de l'élément HTML avec les boutons de pagination générés.


Fonction displayQuestionById():
   Description:
      La fonction  displayQuestionById  est utilisée pour afficher les détails d'une question spécifique sur la page  detail.html .
      Elle récupère l'identifiant de la question à partir de l'URL et affiche le contenu de la question, les réponses possibles et l'explication.

   Fonctionnement:
      1. Récupère l'identifiant de la question ( id ) à partir des paramètres de l'URL.
      2. Parcourt les éléments  <question>  du document XML pour trouver la question correspondant à l'identifiant récupéré.
      3. Affiche le contenu de la question, les réponses possibles et l'explication dans les éléments HTML appropriés.


Fonction Niveau(n):
   Description:
      La fonction  Niveau  est utilisée pour définir le niveau de difficulté du jeu et initialiser les paramètres en fonction du niveau sélectionné.

   Fonctionnement:
      1. Définit le niveau de difficulté ( niveau ) en fonction du paramètre  n  passé à la fonction.
      2. Si le niveau est "1", affiche le bouton avec l'ID  validation.
      3. Cache la division HTML avec l'ID  niveau.
      4. Affiche les divisions HTML avec les ID  timer  et  question .
      5. Appelle la fonction  startjeu  pour démarrer le jeu.


Fonction startjeu():
   Description:
      La fonction  startjeu  est utilisée pour démarrer le jeu en chargeant les questions en fonction des paramètres de l'URL.

   Fonctionnement:
      1. Récupère les paramètres  theme  et  lot  de l'URL.
      2. Si un thème est spécifié, charge les questions correspondant à ce thème et calcule le score maximum (maxscore).
      3. Si un lot est spécifié, charge les questions correspondant à ce lot et calcule le score maximum (maxscore).
      4. Appelle la fonction  displayQuestion  pour afficher la première question du jeu.


Fonction timer():
   Description:
      La fonction  timer  est utilisée pour gérer le temps restant pour répondre à la question.
      Elle décrémente le temps restant à interval de 1s et met à jour l'affichage du timer.
      Lorsque le temps est écoulé, elle arrête le timer et passe à la question suivante.

   Fonctionnement:
      1. Initialise un intervalle qui décrémente la variable  time  toutes les secondes.
      2. Met à jour l'affichage de l'élément HTML avec l'ID  timer-value  pour refléter le temps restant.
      3. Si le temps est écoulé ( time  <= 0), arrête l'intervalle et appelle la fonction  displayQuestion  pour passer à la question suivante.


Fonction displayQuestion():
   Description:
      La fonction  displayQuestion  est utilisée pour afficher la question actuelle et ses réponses possibles dans le jeu.
      Elle démarre le timer pour chaque question et vérifie si le jeu est terminé.

   Fonctionnement:
      1. Vérifie si toutes les questions ont été affichées. Si oui, appelle la fonction  endGame  pour terminer le jeu.
      2. Incrémente l'index de la question actuelle ( currentQuestion ).
      3. Initialise le timer en fonction du niveau de difficulté sélectionné.
      4. Affiche le contenu de la question et les réponses possibles dans les éléments HTML appropriés.
      5. Ajoute des boutons pour chaque réponse possible et configure les événements  onclick  pour vérifier la réponse sélectionnée.


Fonction selectionReponse(n):
   Description:
      La fonction  selectionReponse  est utilisée pour gérer la sélection d'une réponse par l'utilisateur dans le jeu.
      Elle met à jour la classe CSS du bouton pour indiquer la réponse sélectionnée.

   Fonctionnement:
      1. Met à jour la variable  selection  avec le numéro de la réponse sélectionnée.
      2. Retire la classe CSS  selected-button  de tous les boutons de réponse pour désélectionner toute réponse précédemment sélectionnée.
      3. Ajoute la classe CSS  selected-button  au bouton correspondant à la réponse sélectionnée pour indiquer visuellement la sélection.


Fonction validateAnswer():
   Description:
      La fonction  validateAnswer  est utilisée pour valider la réponse sélectionnée par l'utilisateur.
      Elle appelle la fonction  checkAnswer  avec la réponse sélectionnée pour vérifier si elle est correcte.

   Fonctionnement
      1. Appelle la fonction  checkAnswer  avec la réponse sélectionnée ( selection ).


Fonction checkAnswer(reponse):
   Description:
      La fonction  checkAnswer  est utilisée pour vérifier si la réponse sélectionnée par l'utilisateur est correcte ou non.
      Elle met à jour le score, change la couleur de fond de page en fonction de la réponse correcte ou incorrecte,
      et passe à la question suivante après 1s.

   Fonctionnement:
      1. Arrête le timer en cours.
      2. Récupère la question actuelle et la réponse correcte à partir des données chargées.
      3. Ajoute la réponse de l'utilisateur au tableau  UserAnswers .
      4. Compare la réponse de l'utilisateur avec la réponse correcte :
         - Si la réponse est correcte, met à jour le score et affiche un indicateur visuel de succès.
         - Si la réponse est incorrecte, affiche un indicateur visuel d'échec.
      5. Enregistre les réponses de l'utilisateur dans le  localStorage .
      6. Après un court délai, réinitialise l'indicateur visuel et appelle la fonction  displayQuestion  pour afficher la question suivante.

Fonction correction():
   Description:
      La fonction  correction  est utilisée pour créer un tableau de correction affichant les questions, les réponses correctes,
      les réponses données par l'utilisateur et les explications pour chaque question du quiz.

   Fonctionnement:
      1. Récupère les réponses de l'utilisateur depuis le  localStorage .
      2. Si aucune réponse n'est trouvée, crée un tableau de réponses vides.
      3. Crée un tableau HTML avec les colonnes suivantes :
         - Question
         - Réponse correcte
         - Réponse donnée par l'utilisateur
         - Explication
      4. Pour chaque question :
         - Récupère la réponse correcte
         - Récupère la réponse donnée par l'utilisateur (ou "Pas de réponse" si aucune réponse)
         - Ajoute une ligne au tableau avec les informations correspondantes
      5. Affiche le tableau de correction dans la table HTML avec l'ID  table-correction .


Fonction endGame():
   Description:
      La fonction  endGame  est utilisée pour gérer la fin d'une partie. Elle enregistre le score et la date de la partie dans l'historique,
      affiche le tableau de correction et met à jour l'interface utilisateur pour montrer l'écran de fin de jeu.

   Fonctionnement:
      1. Récupère l'historique des parties depuis le  localStorage 
         - Si aucun historique n'existe, crée un nouveau tableau vide
         - Sinon, parse l'historique existant en JSON
      2. Enregistre la nouvelle partie :
         - Récupère la date actuelle
         - Calcule le score sur 10 points
         - Crée un tableau avec le score et la date
         - Ajoute la partie à l'historique
         - Sauvegarde l'historique mis à jour dans le  localStorage 
      3. Met à jour l'interface utilisateur :
         - Appelle la fonction  correction  pour afficher le tableau de correction
         - Cache les éléments du jeu (question, choix, timer)
         - Affiche le score final
         - Affiche l'écran de fin de jeu
         - Supprime les réponses temporaires du  localStorage 


Fonction loadStats():
   Description:
      La fonction  loadStats  est utilisée pour charger et afficher les statistiques des parties jouées.
      Elle calcule et affiche le nombre total de parties jouées ainsi que le score moyen des joueurs.

   Fonctionnement:
      1. Récupère l'historique des parties depuis le  localStorage 
         - Si aucun historique n'existe, affiche un message "Pas de statistiques disponibles"
         - Sinon, parse l'historique existant en JSON
      2. Calcule les statistiques :
         - Compte le nombre total de parties jouées
         - Calcule le score moyen sur toutes les parties :
           * Additionne tous les scores (stockés en position 0 de chaque partie)
           * Divise par le nombre total de parties
           * Arrondit à 2 décimales
      3. Met à jour l'interface utilisateur :
         - Affiche le nombre total de parties dans l'élément avec l'ID  nb_parties 
         - Affiche le score moyen dans l'élément avec l'ID  score_moy 
         - Appelle la fonction  updateHistogram  pour mettre à jour l'histogramme


Fonction updateHistogram():
   Description:
      La fonction  updateHistogram  est utilisée pour mettre à jour l'affichage de l'histogramme des statistiques.
      Elle gère l'affichage du mois et de l'année en cours ainsi que les boutons de navigation du mois.

   Fonctionnement:
      1. Crée un objet Date avec l'année et le mois actuels (stockés dans les variables globales  currentYear  et  currentMonth )
      2. Formate la date pour afficher le mois en toutes lettres et l'année en français
      3. Capitalise la première lettre du mois
      4. Met à jour l'interface utilisateur :
         - Ajoute un bouton "Précédent" pour naviguer vers le mois précédent
         - Affiche le mois et l'année en cours
         - Ajoute un bouton "Suivant" pour naviguer vers le mois suivant
      5. Appelle la fonction  drawHistogram  pour dessiner l'histogramme des scores


Fonction prevMonth():
   Description:
      La fonction  prevMonth  est utilisée pour naviguer vers le mois précédent dans l'affichage de l'histogramme des statistiques.
      Elle gère également le changement d'année lorsque nécessaire.

   Fonctionnement:
      1. Vérifie si le mois actuel est janvier (mois 0)
         - Si oui :
           * Change le mois à décembre (mois 11)
           * Décrémente l'année
         - Si non :
           * Décrémente simplement le mois actuel
      2. Appelle la fonction  updateHistogram  pour mettre à jour l'affichage


Fonction nextMonth():
   Description:
      La fonction  nextMonth  est utilisée pour naviguer vers le mois suivant dans l'affichage de l'histogramme des statistiques.
      Elle gère également le changement d'année si nécessaire.

   Fonctionnement:
      1. Vérifie si le mois actuel est décembre (mois 11)
         - Si oui :
           * Change le mois à janvier (mois 0)
           * Incrémente l'année
         - Si non :
           * Incrémente simplement le mois actuel
      2. Appelle la fonction  updateHistogram  pour mettre à jour l'affichage


Fonction drawHistogram():
   Description:
      La fonction  drawHistogram  est utilisée pour dessiner l'histogramme des scores dans un canvas HTML.
      Elle crée une représentation graphique des scores moyens par jour pour le mois sélectionné.

   Fonctionnement:
      1. Configuration initiale :
         - Efface le canvas
         - Définit les dimensions et paramètres de base (hauteur maximale, largeur des colonnes, décalage vertical)
      2. Dessin de l'axe vertical (Y) :
         - Trace une ligne verticale
         - Ajoute des graduations de 0 à 10
         - Ajoute les valeurs numériques pour chaque graduation
      3. Dessin de l'axe horizontal (X) :
         - Calcule le nombre de jours dans le mois sélectionné
         - Trace une ligne horizontale
         - Ajoute des marqueurs pour chaque jour
         - Ajoute les dates (format DD/MM) tous les deux jours
      4. Calcul et affichage des données :
         - Calcule la moyenne des scores pour chaque jour du mois
         - Dessine une colonne pour chaque jour, dont la hauteur représente le score moyen

      Paramètres de dessin:
      -  max_height  : Hauteur maximale du graphique (400 pixels)
      -  colonne_width  : Largeur de chaque colonne (10 pixels)
      -  vertical_offset  : Décalage vertical (20 pixels)