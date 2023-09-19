# teste_vr_software

## Instalação

## Banco de dados
### 1. Instale o <a href="https://www.postgresql.org/download/">Postgres</a>
#### a. Siga as instruções padrões do Postgres, e quando estiver em 'Password', lembre-se de guardar bem a senha.
#### b. Defina a porta como 5432 (padrão).
#### c. Finalize a instalação seguindo os passos recomendados.
### 2. Instale um SGBD
#### a. Recomendo o uso do <a href="https://dbeaver.io/download/">DBeaver</a>
#### b. Siga a instalação sugerida
### 3. Crie a conexão e o banco de dados
#### a. Finalizada a instalação, crie uma nova conexão MySQL usando host 'localhost', porta 5432, usuário 'postgres' e use a senha definida na instalação do Postgres
#### b. Entre na conexão criada e abra um novo Script SQL
#### c. Copie o <a href="https://github.com/LeoRogelioSilva/mini_escola/blob/main/scripts/init.sql"> script de iniciação do banco de dados disponível neste repositório em scripts/init.sql</a>
#### d. Cole na página de Script sql do seu SGBD e execute o script

#### Pronto! Banco de dados instalado e operante!

## Clone do repositório
#### Os arquivos de Back End e Front End estão neste repositório, em ./server e ./client respectivamente
### - Faça o clone do projeto na sua área de trabalho: 
``` bash
git clone https://github.com/LeoRogelioSilva/mini_escola
```

### - Edite o arquivo ./server/.env e altere APENAS o campo password com a senha do Postgres

## Instalação do Back End
### 1. Abra um terminal na pasta ./server
### 2. Instale as dependências do projeto:
```bash
npm install
```
### 3. Inicie o servidor Back End:
```bash
npm run start
```

## Instalação do Front End
### 1. Abra um terminal na pasta ./client
### 2. Instale as dependências do projeto:
```bash
npm install
```

### 3. Inicie o servidor Front End:
```bash
npm run start
```

## Pronto! Todo o projeto está instalado e configurado!
## Acesse <a href="http://127.0.0.1:4200/"> Aqui </a> para ver o projeto instalado rodando
