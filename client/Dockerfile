# Use uma imagem base que tenha o Node.js e o npm instalados
FROM node:14 AS build

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Execute o comando de build do Angular (geralmente 'ng build')
RUN npm run start

# Etapa de produção
FROM nginx:alpine

# Copie os arquivos de build do Angular da etapa anterior para a pasta de publicação do Nginx
COPY --from=build /app/dist/ /usr/share/nginx/html

# Exponha a porta 80 para o tráfego da web
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["npm", "start"]
