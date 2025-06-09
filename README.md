# Timer Widget - SolidJS

Un widget de temporizador moderno y elegante construido con SolidJS.

## 🚀 Características

- Interfaz de usuario moderna y minimalista
- Temporizador preciso con animaciones suaves
- Diseño responsive
- Construido con SolidJS para un rendimiento óptimo
- Utiliza CountUp.js para animaciones de números
- Soporte para múltiples temporizadores mediante parámetros de URL

## 🛠️ Tecnologías

- [SolidJS](https://www.solidjs.com/) - Framework JavaScript reactivo
- [Vite](https://vitejs.dev/) - Bundler y servidor de desarrollo
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado
- [CountUp.js](https://inorganik.github.io/countUp.js/) - Biblioteca para animaciones de números

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🏗️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción

## 🔗 Parámetros de URL

El widget soporta múltiples temporizadores a través de parámetros de URL:

- `?timer=1` - Temporizador por defecto (ID: 1)
- `?timer=2` - Segundo temporizador
- `?timer=3` - Tercer temporizador

Ejemplo de uso:
```
http://localhost:3000/?timer=1
http://localhost:3000/?timer=2
```

El ID del temporizador se mantiene sincronizado con la URL, permitiendo compartir temporizadores específicos.

## 🎨 Estructura del Proyecto

```
src/
├── assets/      # Recursos estáticos
├── components/  # Componentes de la aplicación
├── hooks/       # Hooks personalizados
├── utils/       # Utilidades y funciones auxiliares
├── App.tsx      # Componente principal
└── index.tsx    # Punto de entrada
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vitejs.dev/guide/static-deploy.html)
