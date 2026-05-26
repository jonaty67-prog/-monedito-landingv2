const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto dinámico para Replit y otros servicios
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🎉 Servidor Monedito corriendo en puerto ${PORT}`);
  console.log(`📱 Abre: http://localhost:${PORT}`);
});
