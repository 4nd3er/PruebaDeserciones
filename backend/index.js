// const express = require('express');
import express from 'express';
// Al momento de poner el "type module" se debe ahora hacer la sintaxis de js que es importando, en este caso, express
import conectarDB from './config/db.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
conectarDB();

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`Desde el puerto ${PORT}`);
})