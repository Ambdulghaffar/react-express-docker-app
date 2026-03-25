# On part d'une image légère de Node
FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# On copie d'abord les fichiers de dépendances pour optimiser le cache
COPY package*.json ./

# Installation des dépendances
RUN npm install

# On copie le reste du code
COPY . .

# On expose le port 3000
EXPOSE 3000

# Commande pour lancer le serveur
CMD ["npm", "start"]
