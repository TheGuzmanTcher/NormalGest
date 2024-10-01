const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar la carpeta para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Manejar la ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Cambia 'index.html' por el nombre de tu archivo HTML
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
