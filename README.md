# 📱 Configuración y Ejecución del Proyecto Expo

Este documento describe los pasos para levantar el proyecto Expo, instalar las dependencias necesarias y configurar la conexión con la api para poder consumir los servicios.
---

## 🚀 Instalación de Dependencias

1. **Clonar el repositorio:**
   ```sh
   git clone https://github.com/RyanCFX/todo-mobile.git
   cd todo-mobile
   ```

2. **Instalar dependencias:**
   ```sh
   npm install
   ```
   o si prefieres usar `yarn`:
   ```sh
   yarn install
   ```

3. **Instalar Expo CLI globalmente (si no lo tienes instalado):**
   ```sh
   npm install -g expo-cli
   ```
   o con `yarn`:
   ```sh
   yarn global add expo-cli
   ```

---

## 🔧 Configuración del API_URL

El `API_URL` debe configurarse en dos archivos dentro de la carpeta `utils/`.

### 1️⃣ Configurar `API_URL`

Ubica los archivos `utils/http.ts` y `utils/taskSocket.ts` y asegúrate de que tenga la siguiente configuración:

```ts
const API_URL = "https://api.com";
```

En caso de que no esté leyendo las variables de entorno, puede poner la url del api en duro en estos 2 archivos, siendo los unicos que la utilizan.

---

## ▶️ Ejecutar el Proyecto

1. **Iniciar el servidor de desarrollo:**
   ```sh
   npm start
   ```

2. **Abrir en un emulador o dispositivo:**
   - Para Android: Pulsa `a`
   - Para iOS: Pulsa `i` (solo en macOS con Xcode instalado)
   - Escanea el código QR con la aplicación Expo Go

---

## 🛠️ Solución de Problemas

- Si el proyecto no arranca correctamente, intenta:
  ```sh
  expo start --clear
  ```
- Si hay problemas con dependencias, intenta reinstalar:
  ```sh
  rm -rf node_modules && npm install
  ```
- Si hay problemas por dependencias legacy, intenta:
  ```sh
  rm -rf node_modules && npm install --legacy-peer
  ```

---

¡Listo! Ahora el proyecto Expo está configurado y en funcionamiento. 🚀

