
# PilotSeries – Frontend

**PilotSeries** es una app web para descubrir, seguir y puntuar series. Permite a los usuarios gestionar sus series favoritas, dejar reseñas, ver recomendaciones y disfrutar de una interfaz cómoda, rápida y responsive. Este repositorio corresponde al **frontend**, realizado en React + Vite.

---

## 🚀 Funcionalidades principales

- **Registro/Login** con JWT (sesión persistente)
- **Catálogo de series** (filtros por plataforma y género)
- **Perfil de usuario** (listas de seguidas, finalizadas, favoritas)
- **Publicar y gestionar reseñas** con puntuación y likes
- **Recomendaciones personalizadas** según hábitos
- **Panel admin** (gestión de usuarios, series, reseñas)
- **Subida de imágenes** para avatar y series (opcional, Cloudinary)
- **Buen diseño UX/UI** (Chakra UI + SCSS, responsive, feedback visual)

---

## 🛠️ Tecnologías principales

- [React 18](https://react.dev/) (Vite)
- [Chakra UI](https://chakra-ui.com/)  
- SCSS/SASS  
- React Router DOM 6  
- Context API & custom hooks  
- Axios o Fetch  
- React Icons, react-slick/swiper  
- ESLint, Prettier

---

## 📂 Estructura del proyecto

- `/src/components/`: Componentes organizados por dominio (Auth, Series, Profile, Admin…)
- `/src/pages/`: Páginas principales
- `/src/routes/`: Configuración de rutas protegidas
- `/src/context/`: Contextos globales (auth, usuario…)
- `/src/services/`: Llamadas a la API (series, usuarios, reseñas)
- `/src/hooks/`: Hooks personalizados
- `/src/styles/`: Estilos globales, variables SCSS
- `/src/utils/`: Utilidades varias

---

## ⚡ Instalación y ejecución local

1. **Clona el repo y entra en la carpeta**  
   ```bash
   git clone <REPO_FRONTEND_URL>
   cd pilotseries-frontend
   ```

2. **Instala dependencias**  
   ```bash
   npm install
   ```

3. **Configura variables de entorno**  
   Crea un archivo `.env.local` en la raíz:  
   ```
   VITE_BACKEND_URL=http://localhost:3001
   ```
   (Ajusta la URL a la de tu backend si es distinto)

4. **Arranca el servidor de desarrollo**  
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🧑‍💻 Notas de uso y diseño

- La sesión se mantiene mientras no cierres sesión manualmente.
- El sistema de roles protege rutas y opciones admin.
- Formularios y acciones dan feedback visual con Chakra UI.
- Totalmente responsive para móvil/tablet/desktop.
- Código organizado para fácil mantenimiento/escalabilidad.

---

## 🔗 Backend/API

Recuerda que necesitas el [backend de PilotSeries](#) corriendo y correctamente configurado para usar la app.

---

## 📣 Autoría

Proyecto realizado como entrega final para el bootcamp de Rock The Code en The Power.
Desarrollado por Àrian Castro.

---
