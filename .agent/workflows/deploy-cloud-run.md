---
description: Deploy application to Google Cloud Run
---

# Deploy to Google Cloud Run

Esta guía te ayudará a desplegar tu aplicación React en Google Cloud Run.

## Prerequisitos

1. **Cuenta de Google Cloud**
   - Crea una cuenta en [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la facturación para el proyecto

2. **Instalar Google Cloud SDK (gcloud CLI)**
   ```bash
   # macOS (usando Homebrew)
   brew install --cask google-cloud-sdk
   
   # O descarga desde: https://cloud.google.com/sdk/docs/install
   ```

3. **Autenticarse con Google Cloud**
   ```bash
   gcloud auth login
   gcloud config set project TU_PROJECT_ID
   ```

4. **Habilitar APIs necesarias**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

5. **Docker instalado** (para pruebas locales)
   - Descarga desde [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Opción 1: Despliegue Manual (Recomendado para primera vez)

### Paso 1: Probar el build localmente

```bash
# Construir la imagen Docker
docker build -t lumena-clinica .

# Verificar que la imagen se creó correctamente
docker images | grep lumena-clinica
```

### Paso 2: Probar el contenedor localmente

```bash
# Ejecutar el contenedor localmente
docker run -p 8080:8080 -e GEMINI_API_KEY="tu-api-key-aqui" lumena-clinica

# Abrir en el navegador: http://localhost:8080
# Verifica que la aplicación funciona correctamente
# Prueba navegar entre diferentes rutas
# Presiona Ctrl+C para detener el contenedor
```

### Paso 3: Configurar variables de entorno

**Opción A: Variable de entorno directa** (más simple)
```bash
export GEMINI_API_KEY="tu-api-key-aqui"
```

**Opción B: Google Secret Manager** (más seguro para producción)
```bash
# Crear el secreto
echo -n "tu-api-key-aqui" | gcloud secrets create GEMINI_API_KEY --data-file=-

# Dar permisos al servicio de Cloud Run
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### Paso 4: Desplegar a Cloud Run

**Si usas variable de entorno directa:**
```bash
gcloud run deploy lumena-clinica \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="$GEMINI_API_KEY"
```

**Si usas Secret Manager:**
```bash
gcloud run deploy lumena-clinica \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest
```

### Paso 5: Verificar el despliegue

Después del despliegue, gcloud mostrará la URL de tu aplicación:
```
Service [lumena-clinica] revision [lumena-clinica-00001-xxx] has been deployed and is serving 100 percent of traffic.
Service URL: https://lumena-clinica-xxxxx-uc.a.run.app
```

Abre la URL en tu navegador y verifica:
- ✅ La aplicación carga correctamente
- ✅ Puedes navegar entre rutas
- ✅ El refresh en rutas internas funciona (no da 404)
- ✅ La funcionalidad con la API funciona

## Opción 2: Despliegue Automatizado con Cloud Build

### Paso 1: Configurar Cloud Build

1. **Editar `cloudbuild.yaml`** y actualizar:
   - La región (línea 28): cambia `us-central1` a tu región preferida
   - Descomentar las líneas de Secret Manager si lo usas (líneas 33-34)

2. **Dar permisos a Cloud Build**
   ```bash
   # Obtener el número de proyecto
   PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format="value(projectNumber)")
   
   # Dar permisos para desplegar a Cloud Run
   gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
     --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
     --role="roles/run.admin"
   
   gcloud iam service-accounts add-iam-policy-binding \
     ${PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
     --member="serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   ```

### Paso 2: Ejecutar Cloud Build

```bash
gcloud builds submit --config cloudbuild.yaml
```

Cloud Build automáticamente:
1. Construirá la imagen Docker
2. La subirá a Container Registry
3. Desplegará a Cloud Run

### Paso 3: Configurar CI/CD con GitHub (Opcional)

Para despliegue automático en cada push:

1. **Conectar repositorio a Cloud Build**
   - Ve a [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
   - Click "Connect Repository"
   - Selecciona GitHub y autoriza
   - Selecciona tu repositorio

2. **Crear trigger**
   - Nombre: `deploy-to-cloud-run`
   - Evento: Push to branch
   - Branch: `^main$` (o tu rama principal)
   - Configuration: Cloud Build configuration file
   - Location: `cloudbuild.yaml`

Ahora cada push a `main` desplegará automáticamente a Cloud Run.

## Comandos Útiles

### Ver logs de la aplicación
```bash
gcloud run services logs read lumena-clinica --region us-central1
```

### Ver detalles del servicio
```bash
gcloud run services describe lumena-clinica --region us-central1
```

### Actualizar variables de entorno
```bash
gcloud run services update lumena-clinica \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY="nueva-api-key"
```

### Eliminar el servicio
```bash
gcloud run services delete lumena-clinica --region us-central1
```

### Ver todas las revisiones
```bash
gcloud run revisions list --service lumena-clinica --region us-central1
```

### Rollback a una revisión anterior
```bash
gcloud run services update-traffic lumena-clinica \
  --to-revisions REVISION_NAME=100 \
  --region us-central1
```

## Solución de Problemas

### Error: "Container failed to start"
- Verifica los logs: `gcloud run services logs read lumena-clinica --region us-central1`
- Asegúrate de que el puerto 8080 está expuesto en el Dockerfile
- Prueba el contenedor localmente primero

### Error: 404 en rutas internas
- Verifica que `nginx.conf` tiene la configuración `try_files $uri $uri/ /index.html;`
- Asegúrate de que estás usando `BrowserRouter` en React

### Error: "Permission denied"
- Verifica que las APIs están habilitadas
- Verifica los permisos de Cloud Build (si usas despliegue automatizado)

### La aplicación no puede acceder a la API
- Verifica que `GEMINI_API_KEY` está configurada correctamente
- Revisa los logs para ver errores de API

## Costos Estimados

Cloud Run cobra por:
- **CPU y memoria**: Solo cuando se procesan requests
- **Requests**: Primeros 2 millones/mes gratis
- **Tráfico de red**: Primeros 1 GB/mes gratis

Para una aplicación pequeña, el costo suele ser **$0-5 USD/mes**.

Monitorea costos en: https://console.cloud.google.com/billing

## Recursos Adicionales

- [Documentación de Cloud Run](https://cloud.google.com/run/docs)
- [Pricing de Cloud Run](https://cloud.google.com/run/pricing)
- [Best Practices](https://cloud.google.com/run/docs/best-practices)
