# 🐺 Game of Thrones - The Ultimate Fan App 🐉

![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Una aplicación móvil no oficial de **Juego de Tronos (Game of Thrones)** creada con **React Native** y **Expo**. Sumérgete en Westeros descubriendo a tus personajes favoritos, reviviendo los momentos más épicos a través de YouTube, y pon a prueba tus conocimientos en un desafiante Quiz para reclamar el Trono de Hierro.

---

## ✨ Características Principales

* **🎭 Enciclopedia de Personajes**: Explora información detallada, historia, citas célebres y detalles clave de las grandes casas (Stark, Lannister, Targaryen, etc).
* **🎬 Momentos Épicos**: Revive las mejores escenas de la serie (La Boda Roja, la Batalla de los Bastardos, el origen de Hodor) mediante un reproductor de YouTube incrustado y altamente optimizado.
* **⚔️ Quiz y Recompensas**: 
  * Un juego de trivia desafiante con temporizador.
  * Efectos de sonido integrados y vibración háptica (Haptics).
  * Obtén diferentes **títulos nobiliarios** basados en tu puntuación (desde Salvaje hasta Rey de los Ándalos).
  * Recompensas visuales personalizadas (ej. Daenerys Targaryen o el Rey de la Noche).
* **🎵 Ambientación Inmersiva**: Música épica en la pantalla principal y un menú de configuración dedicado para activar/desactivar audio y efectos de sonido.
* **📱 UI/UX Premium**: 
  * Navegación fluida (Stack y Drawer Navigators).
  * Diseño dinámico que cambia las icónicas citas de los personajes al estilo de un carrusel cada 5 segundos.
  * Tema oscuro y estético enfocado en la usabilidad y los tonos dorados y oscuros característicos de la serie.

---

## 🛠️ Tecnologías y Librerías

* **React Native / Expo**: Framework principal.
* **Zustand**: Manejo de estado global ligero y rápido (almacenamiento de puntos, títulos y preferencias de audio persistidas con AsyncStorage).
* **React Navigation**: Manejo del enrutamiento interno (`@react-navigation/native`, `drawer`, `stack`).
* **Expo AV & Haptics**: Reproducción de audios (música de fondo y SFX) y retroalimentación táctil de dispositivo.
* **React Native Youtube Iframe**: Reproducción fluida e incrustada de escenas en alta definición sin incrementar el tamaño de compilación (APK).
* **Linear Gradient & Reanimated**: Interfaces ricas con transiciones y degradados adaptativos.

---

## 🚀 Instalación y Uso

Si quieres probar, modificar o correr este proyecto de forma local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Davidcx8/App-Game-Of-Thrones.git
   cd App-Game-Of-Thrones
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```
   *(Asegúrate de instalar los módulos compatibles usando `npx expo install --fix` en caso de discrepancia de SDK)*.

3. **Ejecutar en desarrollo:**
   ```bash
   npx expo start
   ```
   *Escanea el código QR en la aplicación **Expo Go** en Android o usa un emulador para interactuar con la app.*

4. **Compilar el APK (Android):**
   ```bash
   eas build -p android --profile preview
   ```

---

## 📄 Licencia

Este proyecto se distribuye bajo la [Licencia MIT](./LICENSE).

*Nota: Esta es una aplicación hecha por fans y para fans. Todos los personajes, nombres y referencias relacionadas a "Game of Thrones" o "Juego de Tronos" pertenecen a HBO.*
