const express = require('express');
const path = require('path');
const { router } = require('./api.js');

const app = express();

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

app.use(express.static(path.join(basedir, 'public')));

app.use('/api', router);

module.exports = app; // Export the app instance
