# Front

Le front permet de visualiser les données du serveur via des graphiques. 

## Installation

```bash
npm install
```

## Lancement

```bash
npm run start
```

## Fonctionnement

Deux inputs de type date permettent de selectionner un intervalle de date. 
Les deux dates ainsi que le token sont envoyés au back avec une requête post sur la route http://localhost:3001/statistique. 
Enfin les données du back-end sont récupérées / formatées puis insérées dans les 4 différents graphiques ( La température, l'hygrométrie, le sens du vent et la force du vent) 




