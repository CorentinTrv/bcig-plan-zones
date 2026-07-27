# BCIG — Plan des zones

Outil interne de test (croquis), pas un produit officiel BCIG. Hébergé temporairement (quelques jours)
le temps de l'ajuster et de le montrer, sans coût (GitHub Pages gratuit).

- Toutes les données (affaires, câbleurs) restent **uniquement dans le navigateur** de l'appareil qui l'ouvre
  (`localStorage`), rien n'est partagé entre appareils pour l'instant.
- Zones réelles Palettier/Module/E/A/B/C/T/I inspirées du plan papier ; numéros d'affaires, chargés
  d'affaires et câbleurs sont **inventés** pour le test.
- Installable sur mobile/tablette via « Ajouter à l'écran d'accueil » (Safari/Chrome), grâce au
  `manifest.json` et au `sw.js`.
- **Mise à jour** : après un nouveau déploiement, l'appli garde l'ancienne version tant qu'elle n'a pas
  été fermée complètement (le service worker n'appelle jamais `skipWaiting`, choix volontaire pour éviter
  qu'un changement s'applique en silence pendant une saisie en cours).
