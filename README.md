# Mi Portafolio

Bienvenido a mi portafolio web. Aquí encontrarás una colección de mis proyectos, habilidades y experiencias profesionales. Este sitio ha sido diseñado para mostrar mis capacidades y ofrecer una visión general de mi trabajo en el ámbito del desarrollo web.

## Contenido

- **Acerca de mí**: Detalles sobre mi experiencia, formación y habilidades.
- **Proyectos**: Una galería de proyectos en los que he trabajado, con descripciones y enlaces a los repositorios.
- **Certificados**: Certificados en los que he realizado

## Tecnologías Utilizadas

El proyecto está organizado como una aplicación moderna con las siguientes herramientas:

- [Vite](https://vitejs.dev/) para el bundling y el entorno de desarrollo.
- [Express](https://expressjs.com/) para exponer endpoints sencillos desde el directorio `server/`.
- [ESLint](https://eslint.org/) y [Prettier](https://prettier.io/) para mantener un estilo de código consistente.
- [Vitest](https://vitest.dev/) para las pruebas unitarias.

La estructura principal se divide en:

- `src/`: Código del cliente organizado en subdirectorios de componentes, estilos y assets.
- `server/`: Endpoints y servicios del backend.
- `shared/`: Recursos compartidos entre el cliente y el servidor, como el catálogo de proyectos.
- Configuración en la raíz (`vite.config.js`, `eslint.config.js`, `prettier.config.js`, etc.) para scripts de verificación y CI.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Automatización continua

El repositorio incluye un flujo de trabajo de GitHub Actions (`.github/workflows/ci.yml`) que valida cada cambio ejecutando las tareas de lint (`npm run lint`), build (`npm run build`) y pruebas (`npm run test:run`). El pipeline usa Node.js 20 y aprovecha la caché de dependencias de npm. Para ejecutar correctamente las pruebas en CI se declaran las variables `NODE_ENV` y `DATABASE_FILE`, y cualquier secreto como `CONTACT_WEBHOOK_URL` debe configurarse en **Settings → Secrets and variables → Actions** del repositorio.

## Contenedor Docker

Se añade un `Dockerfile` multi-stage que compila el frontend y prepara el servidor Express listo para producción:

```bash
docker build -t portafolio-app .
docker run --rm -p 3000:3000 \
  -e PORT=3000 \
  -e DATABASE_FILE=/data/database.json \
  -e LOG_LEVEL=info \
  -e CONTACT_WEBHOOK_URL=https://ejemplo.com/webhook \
  -v $(pwd)/data:/data \
  portafolio-app
```

El contenedor instala únicamente las dependencias de producción y expone el puerto `3000`. Las rutas de datos pueden montarse como volumen para persistir el archivo JSON.

## Configuración de entorno y secretos

El archivo `.env.example` documenta las variables necesarias:

- `PORT`: puerto de escucha del servidor.
- `DATABASE_FILE`: ubicación del archivo JSON que hace de base de datos.
- `LOG_LEVEL`: controla el nivel de detalle de los logs.
- `CONTACT_WEBHOOK_URL`: webhook opcional para notificar nuevos mensajes de contacto. Debe declararse como secreto en los entornos CI/CD o en la infraestructura de despliegue.

En desarrollo local puede copiarse a `.env` y cargarlo con herramientas como [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) o mediante el shell.

## Monitoreo y registros

El backend ahora incorpora utilidades básicas de observabilidad:

- **Logs estructurados** controlados por `LOG_LEVEL`, emitidos por `server/observability/logger.js`.
- **Métricas en memoria** que contabilizan peticiones, tiempos de respuesta y errores (`server/observability/metrics.js`).
- **Middleware de auditoría** que registra cada solicitud (`server/observability/requestLogger.js`).
- **Endpoint de salud** disponible en `GET /health`, que expone métricas, uptime y uso de recursos.
- **Webhook opcional** para nuevos mensajes de contacto (`CONTACT_WEBHOOK_URL`), útil para integrarse con herramientas externas de monitoreo o notificación.

Estas capacidades permiten detectar rápidamente fallos y facilitan la integración con servicios externos para observabilidad avanzada.
