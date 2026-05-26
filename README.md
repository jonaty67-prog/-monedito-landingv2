# 🎉 Monedito - Landing Page

Landing page moderna e interactiva para Monedito con animaciones, temas dinámicos y carrusel de pantallas.

## 📋 Estructura del proyecto

```
/
├── server.js           # Servidor Express
├── package.json        # Dependencias Node.js
├── README.md           # Este archivo
└── public/
    ├── index.html      # Página principal
    ├── styles.css      # Estilos
    ├── app.js          # Lógica JavaScript
    └── logo.png        # Logo del proyecto
```

## 🚀 Instrucciones para desplegar en Replit

### Paso 1: Crear un nuevo Repl en Replit
1. Ve a [replit.com](https://replit.com)
2. Haz clic en "Create Repl" o "+ Create"
3. Selecciona **Node.js** como lenguaje
4. Dale un nombre (ej: "monedito-landing")
5. Haz clic en "Create Repl"

### Paso 2: Subir los archivos
Tienes dos opciones:

**Opción A: Subir archivo ZIP (MÁS FÁCIL)**
1. Descarga esta carpeta como ZIP
2. En Replit, haz clic en el icono de carpeta (izquierda)
3. Arrastra y suelta el ZIP en la ventana
4. Replit los extraerá automáticamente

**Opción B: Copiar/pegar manualmente**
1. En Replit, crea los archivos:
   - `server.js`
   - `package.json`
   - Carpeta `public/` con: `index.html`, `styles.css`, `app.js`, `logo.png`
2. Copia el contenido de cada archivo desde aquí

### Paso 3: Ejecutar el proyecto
1. Replit debería detectar automáticamente que es un proyecto Node.js
2. Haz clic en el botón verde "Run" en la parte superior
3. Verás el mensaje: `🎉 Servidor Monedito corriendo en puerto 3000`
4. Se abrirá automáticamente una nueva ventana con tu landing page

### Paso 4: Compartir el enlace
Una vez que esté corriendo:
- Replit genera una URL pública automáticamente (en la parte superior)
- Ejemplo: `https://monedito-landing.replit.dev`
- **Comparte ese enlace con quien quieras** ✅

## 💻 Ejecutar localmente (en tu máquina)

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar el servidor
npm start

# 3. Abre http://localhost:3000 en tu navegador
```

## ✨ Características

- ✅ Carrusel de pantallas interactivo con swipe/drag
- ✅ Selector de temas dinámicos (Rosa, Azul, Dark)
- ✅ Cursor personalizado con efecto lag
- ✅ Parallax en blobs del hero
- ✅ Tilt 3D en tarjetas
- ✅ Confetti en botones primarios
- ✅ Scroll reveal animado
- ✅ Contador animado en el balance
- ✅ Menú mobile responsive
- ✅ Accesibilidad con navegación por teclado

## 🛠️ Troubleshooting

**El servidor no inicia:**
- Verifica que `package.json` y `server.js` estén en la raíz
- En Replit, abre la terminal y ejecuta: `npm install && npm start`

**Faltan archivos:**
- Asegúrate de que `public/` contiene: `index.html`, `styles.css`, `app.js`, `logo.png`

**El enlace público no funciona:**
- Espera unos segundos después de hacer clic en "Run"
- Refresca la página con F5

## 📱 Responsive

El proyecto es completamente responsive y funciona en:
- ✅ Desktop (1920x1080, 1366x768, etc.)
- ✅ Tablet (768px y superior)
- ✅ Mobile (320px y superior)

## 🎨 Personalización

Puedes editar:
- **Colores**: En `styles.css` busca las variables CSS (`:root`)
- **Contenido**: En `index.html` modifica el HTML
- **Animaciones**: En `app.js` y `styles.css`

## 📞 Ayuda

Si tienes problemas:
1. Verifica la consola del navegador (F12) por errores
2. Abre la terminal de Replit y lee los logs
3. Asegúrate de que todos los archivos estén en su lugar

---

**Hecho con ❤️ por monedito**
