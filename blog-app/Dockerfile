# 1. Usa l'immagine ufficiale Node.js LTS
FROM node:20-alpine

# 2. Imposta la working directory all'interno del container
WORKDIR /app

# 3. Copia i file package.json e package-lock.json (se esiste) e installa le dipendenze
COPY package*.json ./
RUN npm install

# 4. Copia tutto il resto del backend
COPY . .

# 5. Espone la porta del server
EXPOSE 3000

# 6. Comando per avviare l'app
CMD ["node", "server.js"]