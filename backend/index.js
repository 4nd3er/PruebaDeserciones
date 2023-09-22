// const express = require('express');
import express from 'express';
// Al momento de poner el "type module" se debe ahora hacer la sintaxis de js que es importando, en este caso, express
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import ofertaRoutes from './routes/ofertaRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
conectarDB();

// Routing -> Metodo CRUD
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/ofertas', ofertaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Desde el puerto ${PORT}`);
})