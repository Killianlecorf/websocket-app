
# Lancer le Projet

## Étape 1 : Démarrer le service gRPC

1. Ouvrir un terminal.
2. Aller dans le dossier `grpc` :

```bash
   cd grpc
```

3. Lancer le service avec Docker Compose :

```bash
   docker compose up -d --build
```

## Étape 2 : Démarrer le service WebSocket

1. Ouvrir un terminal.
2. Aller dans le dossier `websocket` :

```bash
   cd websocket
```

3. Lancer le service avec Docker Compose :

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

Le WebSocket est un protocole de communication réseau qui permet d'établir une connexion bidirectionnelle persistante entre un client (comme un navigateur web) et un serveur. Contrairement au protocole HTTP, qui fonctionne sur un modèle requête/réponse, WebSocket permet au serveur d'envoyer des données au client à tout moment, sans que celui-ci ait besoin de faire une nouvelle requête.

Cela le rend particulièrement adapté pour les applications en temps réel comme les chats en ligne, les jeux multi-joueurs, les tableaux de bord dynamiques ou les notifications instantanées.

#### Avantages 

- **Temps réel:** communication instantanée dans les deux sens (client ↔ serveur).

- **Connexion persistante:** une seule connexion TCP ouverte, évite les multiples requêtes HTTP.

- **Faible latence:** idéal pour les applis réactives comme les chats ou jeux en ligne.

- **Simplicité d’implémentation** dans les navigateurs modernes

#### Inconvénients

- Moins standardisé pour la gestion des erreurs et des contrats d'API (vs REST/gRPC).

- Pas de typage fort : pas de vérification automatique des messages échangés.

- Moins adapté pour les systèmes très structurés ou à grande échelle (maintenabilité).

- Sécurité à gérer manuellement (auth, validation, etc.).

#### Cas d'utilisation

WebSocket est particulièrement adapté aux applications qui nécessitent une communication en temps réel entre le client et le serveur. Voici quelques exemples concrets:

- **Applications de messagerie instantanée:** pour permettre des échanges de messages sans latence entre utilisateurs.

### Qu'est-ce que le GRPC ?

gRPC (Google Remote Procedure Call) est un framework de communication hautement performant et open-source qui permet à des applications distribuées de communiquer entre elles via des appels de fonctions distants, comme si elles étaient locales.

Basé sur le protocole HTTP/2 et utilisant Protocol Buffers (protobuf) comme format de sérialisation, gRPC est idéal pour les architectures microservices, grâce à sa rapidité, sa faible latence, et son support natif du streaming bidirectionnel.

#### Avantages 

- **Performant et efficace:** rapide, léger, basé sur HTTP/2 et protobuf.

- **Typage fort avec Protocol Buffers:** fiabilité des échanges + génération automatique de code.

- **Streaming natif:** gère le flux de données en continu dans les deux sens.

- **Multi-langages:** facile à intégrer dans des systèmes polyglottes.

- ***Sécurisé:** support natif de TLS.

#### Inconvénients

- Plus complexe à mettre en place que REST ou WebSocket.

- Moins accessible depuis les navigateurs (pas de support natif sans proxy ou wrapper).

- Dépendance aux fichiers .proto : nécessite une gestion du schéma centralisé.

- Débogage moins intuitif que les API REST (messages binaires, pas lisibles directement).

#### Cas d'utilisation

gRPC est conçu pour les communications performantes, structurées et sécurisées entre services. Il est souvent utilisé dans les architectures modernes à base de microservices. Exemples:

- **Échange de données entre microservices:** gRPC permet des appels rapides et typés entre services backend.

---

## Objectif des applications

Ce projet permet comparer deux technologies de communication en temps réel : **WebSocket** et **gRPC**. L’analyse s’appuie sur deux applicatif développé en Nodejs et démarré sur un environnement Docker, elle permet de tester la performance et de comprendre chaque protocole dans différents cas d’utilisation.

## Technologies utilisées

- **WebSocket (Node.js + `ws`)**
- **gRPC (Node.js + `grpc-go`)**
- **Docker / Docker Compose**


## 📊 Résultats de performance

| Critère                   | WebSocket            | gRPC                      |
|--------------------------|----------------------|---------------------------|
| Latence moyenne          | 787 ms               | 0.68 ms                  |
| Débit (messages/sec)     | ~50 000              | ~11 000                   |
| Idéal pour               | Jeux, chats simples  | Microservices, streamings  |

> _Tests réalisés sur un poste local avec un clients simulés qui envoie 100 000 messages_

## Observation

Ce phénomène est normal et s'explique par la différence fondamentale entre WebSocket et gRPC.

1. WebSocket: léger et rapide
WebSocket utilise TCP avec peu de surcharges. Les messages sont envoyés sous forme brute (texte ou buffer) sans encodage complexe ni validation stricte. Cela permet d'atteindre des débits très élevés, avec un traitement immédiat, mais au prix d’une latence plus élevée.

2. gRPC: structuré et fiable
gRPC repose sur HTTP/2 et Protobuf, qui imposent des étapes supplémentaires d'encodage, de vérification et de gestion du flux. Ces mesures assurent fiabilité et latence faible, mais ralentissent le nombre de messages envoyés par seconde, car chaque message est plus « lourd » à traiter.