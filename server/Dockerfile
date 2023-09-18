# Use a imagem de node.js como base
FROM node:alpine

WORKDIR /server

# Copie o script wait-for-it.sh para o contêiner
COPY /server/wait-for-it.sh /server/wait-for-it.sh

# Dê permissão de execução ao script
RUN chmod +x /server/wait-for-it.sh

# Copie e instale as dependências do Node.js
COPY package*.json ./
RUN npm install

# Copie o código-fonte da aplicação
COPY . .

# Defina o comando de inicialização
CMD ["/server/wait-for-it.sh", "postgres:5432", "--", "npm", "start"]
