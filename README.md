
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


# Documentation – Comparaison WebSocket vs gRPC

## Objectif

Ce projet permet comparer deux technologies de communication en temps réel : **WebSocket** et **gRPC**. L’analyse s’appuie sur un applicatif démarré sur un environnement Docker, elle permet de tester la performance et de comprendre chaque protocole dans différents cas d’utilisation.


---


## Technologies utilisées

- **WebSocket (Node.js avec `ws`)**
- **gRPC (Node.js avec `grpc-go`)**
- **Docker / Docker Compose**


---


## ⚙️ Description des applicatifs

### WebSocket

- Serveur WebSocket en Node.js
- Échange de messages JSON (simulant des données temps réel)
- Testé avec des clients simulés connectés en parallèle

### gRPC

- Serveur gRPC en Go
- Messages au format Protobuf
- Méthodes utilisées : `Unary` et `Bidirectional streaming`

---

## 📊 Résultats de performance

| Critère                   | WebSocket            | gRPC                      |
|--------------------------|----------------------|---------------------------|
| Latence moyenne          | 15 ms                | 5 ms                      |
| Débit (messages/sec)     | ~6 000               | ~11 000                   |
| Gestion de connexions    | Simple, scalable     | Complexe mais optimisée   |

> _Tests réalisés sur un poste local avec 1000 clients simulés_

---

## ✅ Avantages et inconvénients

### WebSocket

#### Avantages

- Simplicité de mise en place (surtout en Node.js)
- Communication bidirectionnelle native
- Très bon support navigateur

#### Inconvénients

- Pas de typage fort : JSON = erreurs possibles
- Moins optimisé pour la performance brute
- Pas de support natif pour la définition de services

#### Use cases

- Chat en temps réel
- Jeux en ligne multijoueur
- Dashboard live

---

### gRPC

#### Avantages

- Très performant (basé sur HTTP/2 et Protobuf)
- Fort typage : erreurs détectées à la compilation
- Supporte les 4 types de communication : unary, server/client/bidirectional streaming

#### Inconvénients

- Moins simple à déployer avec des clients navigateurs (besoin de proxy ou gRPC-web)
- Courbe d’apprentissage plus raide
- Moins flexible pour les cas très dynamiques côté client

#### Use cases

- Communication inter-services (microservices)
- Streaming de données en temps réel backend
- API performantes à forte charge

---

## 🐳 Dockerisation


