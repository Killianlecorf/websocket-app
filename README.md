
# Lancer le Projet


## Technologies utilisées

- **WebSocket (Node.js + `ws`)**
- **gRPC (Node.js + `grpc`)**
- **Docker / Docker Compose**


## Étape 1 : Démarrer le service gRPC

1. Ouvrir un terminal.
2. Aller dans le dossier `grpc` :

```bash
   cd grpc
```

3. Installer les modules

```bash
   npm i
```

4. Lancer le service avec Docker Compose :

```bash
   docker compose up -d --build
```

## Étape 2 : Démarrer le service WebSocket

1. Ouvrir un terminal.
2. Aller dans le dossier `websocket` :

```bash
   cd websocket
```

3. Installer les modules

```bash
   npm i
```

4. Lancer le service avec Docker Compose :

```bash
    docker compose up -d --build
```

## Arrêter les services

Pour arrêter les services :

```bash
    docker-compose down
```

À faire dans chaque dossier (grpc et websocket).

---

# Documentation – Comparaison WebSocket vs gRPC

## WebSocket et GRPC: Présentation et Fonctionnement

### Qu'est-ce que WebSocket ?

Le WebSocket utilise un protocole de communication réseau qui permettant d'établir une connexion bidirectionnelle entre un 
client et un serveur, cela permet de pourvoir envoyer et recevoir des informations à tous moment. Contrairement au protocole 
HTTP, qui fonctionne sur un modèle requête/réponse, le WebSocket peut envoyé des données serveur au client a tout moment car la 
connexion ne ce ferme jamais, c'est une méthode 
appellé le full-duplex.

#### Avantages 

- **Temps réel:** communication très rapide dans les deux sens.

- **Faible latence:** idéal pour les applis réactives comme de simple jeux en ligne.

- **Simplicité d’implémentation**

- **Supporter par tout les navigateurs récent** 

#### Inconvénients

- Pas de typage native: pas de vérification de typage sur les informations échangés.

- Moins adapté pour les systèmes très structurés ou à grande échelle.

- Sécurité à gérer entirement manuellement.

#### Cas d'utilisation

- **Applications de messagerie instantanée:** pour permettre des échanges de messages sans latence entre utilisateurs.

### Qu'est-ce que le GRPC ?

gRPC est un framework de communication, qui permet à des applications distribuées de communiquer entre elles via des appels de procédures à distance (le RPC).

il est basé sur le protocole HTTP/2 et utilisant Protocol Buffers comme format de sérialisation, le gRPC est souvent utilisé pour 
les architectures microservices, grâce à sa rapidité mais aussi grâce sa faible latence.

#### Avantages 

- **Performant et efficace:** rapide, léger.

- **Typage fort:** fiabilité des échanges, basé sur HTTP/2 et protobuf.

- **Streaming natif:** gère le flux de données en continu dans les deux sens.

- ***Sécurisé:** support natif de TLS.

#### Inconvénients

- Plus complexe à mettre en place que du WebSocket.

- Utilisation OBLIGATOIRE du protocole http2 pour du gRPC web ou utilisation d'un proxy ce qu'il le rend plus complexe.

- Dépendance aux fichiers proto: nécessite une gestion du schéma centralisé et impossibilité d'autre format.

- Débogage moins intuitif à cause du binaire qu'il renvoye.

- protocole plus récent (2016) avec moins de maturité comparer au websocket

#### Cas d'utilisation

- **Échange de données entre microservices:** gRPC permet des appels rapides et typés entre services backend.

---

## Objectif des applications

Ce projet permet comparer ces deux technologies de communication en temps réel. Il n'éxiste pas de
de comparaison de performance publique, alors ces applications sont destiner à montrer le pour et le contre de chacun.
L’analyse s’appuie sur deux applicatif développé en Nodejs et démarré sur un environnement Docker, 
elle permet de tester la performance et de comprendre chaque protocole dans ces différents cas d’utilisation. En prenant en 
compte que cela peut être differents en fonction des languages/technos utilisés.

## Résultats de performance

| Critère                  | WebSocket            | gRPC                      |
|--------------------------|----------------------|---------------------------|
| Latence moyenne          | 787 ms               | 0.68 ms                   |
| Débit (messages/sec)     | ~50 000              | ~11 000                   |
| Idéal pour               | Jeux, chats simples  | Microservices, streamings |

> _Tests réalisés sur un poste local avec un clients simulés qui envoie 100 000 messages_

## Observation

1. WebSocket:
WebSocket utilise TCP avec peu de surcharges. Les messages sont envoyés sous forme brute sans encodage complexe 
ni étapes de validation. Cela permet d'atteindre des débits plus élevés, avec un traitement immédiat, mais au prix d’une latence 
plus élevée.

2. gRPC:
le gRPC reposant sur HTTP/2 et Protobuf, imposent des étapes supplémentaires d'encodage, de vérification et de gestion du flux. 
Ces mesures assurent fiabilité et latence faible, mais ralentissent le nombre de messages envoyés par seconde, car chaque message 
est plus « lourd » à traiter. c'est notament pour ca que pour le flux vidéo ce n'est pas le plus optimiser, car le temps de 
traiter la donner cela donne un temps de traitement trop long donc moins de fps.

## Conclusion:

Pour conclure, le websocket et le gRPC à chacun leurs particularité et répondent à des besoins différents, le choix dépend 
finalement plus son besoins.