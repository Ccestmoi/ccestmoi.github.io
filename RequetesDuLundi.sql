--1. Requêtes d'ajout des données d'un profil + compte associé
INSERT INTO t_compte_cpt (cpt_pseudo, cpt_mot_de_passe) VALUES ('flo.bred', MD5('abjdzkalp&@'));
INSERT INTO t_profil_pfl (pfl_nom, pfl_prenom,pfl_email,pfl_etat,pfl_validite,pfl_date,cpt_pseudo) VALUES ('Florian', 'Bredow','flo.bred@pm.me','R','D',curdate(),'flo.bred');

--2. Requête de mdofication de validité d'un profil (pseudo connu)
UPDATE t_profil_pfl SET pfl_validite = 'D' WHERE cpt_pseudo = 'flo.bred';

--3. Requête(s) supprimant un profil (pseudo connu)
DELETE FROM t_profil_pfl WHERE cpt_pseudo = 'flo.bred';

--4a. Requête(s) listant tous les noms, prénoms et validité des profils (ordre alphabétique)
SELECT pfl_nom, pfl_prenom, pfl_validite FROM t_profil_pfl ORDER BY pfl_nom ASC, pfl_prenom ASC;

--4b. Requête(s) listant tous les noms, prénoms et validité des profils (par statut)
SELECT pfl_nom, pfl_prenom, pfl_validite FROM t_profil_pfl ORDER BY pfl_validite;

--5. Liste des profils avec le statut 'R'
SELECT pfl_nom, pfl_prenom,cpt_pseudo  FROM t_profil_pfl WHERE pfl_validite = 'R' ORDER BY pfl_prenom DESC;

--6. Liste des id, titre et date des actualités (2023 puis 2024)
SELECT new_id, new_titre, new_date FROM t_news_new WHERE new_date BETWEEN '2023-01-01' AND '2023-12-31' OR new_date BETWEEN '2024-01-01' AND '2024-12-31';

--Autre version de la requête 6
SELECT new_id, new_titre, new_date FROM t_news_new WHERE YEAR(new_date) IN (2023, 2024);

--7. Ajout d'un profil avec la date du jour
INSERT INTO t_profil_pfl (pfl_nom, pfl_prenom,pfl_email,pfl_etat,pfl_validite,pfl_date,cpt_pseudo) VALUES ('Florian', 'Bredow','flo.bred@pm.me','R','D',curdate(),'flo.bred');

--8. Numéro de la dernière actualité ajoutée
SELECT MAX(new_id) FROM t_news_new;

--9. Profils ajoutés entre deux dates
SELECT * FROM t_profil_pfl WHERE pfl_date BETWEEN '2023-01-01' AND '2024-12-31';

--10. Dénombrer les Rédacteurs puis les Gestionnaires
SELECT COUNT(*) AS 'Rédacteurs' FROM t_profil_pfl WHERE pfl_etat = 'R';
SELECT COUNT(*) AS 'Gestionnaires' FROM t_profil_pfl WHERE pfl_etat = 'G';

--11. Déterminer les différents états d'une actualité
SELECT DISTINCT new_etat FROM t_news_new;

--12. Requête de vérification des données de connexion (pseudo et mot de passe), c’est à dire requête qui vérifie l’existence (ou non) du couple pseudo / mot de passe (profil activé)
SELECT pfl_validite, cpt_pseudo, cpt_mot_de_passe FROM t_profil_pfl JOIN t_compte_cpt USING (cpt_pseudo) WHERE pfl_validite = 'A' AND cpt_pseudo = 'flo.bred' AND cpt_mot_de_passe IS NOT NULL;

--13. Suppression de toutes les données de l'utilisateur de pseudo "mdurand@univ-brest.fr"
DELETE FROM t_profil_pfl WHERE cpt_pseudo = "mdurand@univ-brest.fr";
-- Supprimer les actualités de l'utilisateur et les infos créés par l'utilisateur avant de supprimer le compte
DELETE FROM t_news_new WHERE cpt_pseudo = "mdurand@univ-brest.fr";
DELETE FROM t_info_ifo WHERE cpt_pseudo = "mdurand@univ-brest.fr";
DELETE FROM t_compte_cpt WHERE cpt_pseudo = "mdurand@univ-brest.fr";

--14. Requête de vérification du nombre de profils et de comptes égaux
SELECT (SELECT COUNT(*) FROM t_profil_pfl) = (SELECT COUNT(*) FROM t_compte_cpt) AS comptes_correspondent; --Renvoie vrai si les deux sont égaux, faux sinon

--15. Requête de suppressions des comptes sans profil ni d'actualités et d'infos associés
DELETE FROM t_compte_cpt WHERE cpt_pseudo NOT IN (SELECT cpt_pseudo FROM t_profil_pfl) AND cpt_pseudo NOT IN (SELECT cpt_pseudo FROM t_news_new) AND cpt_pseudo NOT IN (SELECT cpt_pseudo FROM t_info_ifo);

--16. Liste de tous les pseudos existants + informations associées et données associées
SELECT * FROM t_compte_cpt LEFT JOIN t_profil_pfl USING (cpt_pseudo)
LEFT JOIN t_info_ifo USING (cpt_pseudo);

SELECT * FROM t_compte_cpt LEFT JOIN t_profil_pfl USING (cpt_pseudo)
LEFT JOIN t_news_new USING (cpt_pseudo);