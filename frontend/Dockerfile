FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# On expose le port par défaut de Vite
EXPOSE 5173

# On lance Vite en mode "host" pour qu'il soit accessible depuis l'extérieur du container
CMD ["npm", "run", "dev", "--", "--host"]
