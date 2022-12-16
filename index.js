// Importando módulos
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const database_PORT = process.env.DATABASE_PORT;
const teamRoutes = require('./routes/team');

// Conectando ao mongoDB
mongoose.connect(mongoString);
const database = mongoose.connection;

// Checando conexão do mongoDB
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Configurando o express
const app = express();

app.use(express.json());
app.use('/team', teamRoutes)

// Rota padrão
app.get('/', function(req, res) {
  res.send('The application is working!');
});

// Configurando a porta do BD
app.listen(database_PORT, () => {
    console.log(`Server Started at ${3000}`)
})