# Despliegue Rápido a Cloud Run

**Project ID:** `lumena-479218`

## Despliegue en 3 Pasos

### 1. Configurar gcloud (solo primera vez)

```bash
# Instalar gcloud CLI si no lo tienes
brew install --cask google-cloud-sdk

# Autenticarse
gcloud auth login

# Configurar proyecto
gcloud config set project lumena-479218

# Habilitar APIs necesarias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Configurar tu API Key

Reemplaza `TU_API_KEY_AQUI` con tu clave real de Gemini:

```bash
export GEMINI_API_KEY="TU_API_KEY_AQUI"
```

### 3. Desplegar

```bash
cd /Users/pietro/Desktop/lumena-_-clínica-de-salud

gcloud run deploy lumena-clinica \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="$GEMINI_API_KEY"
```

El despliegue tomará unos 3-5 minutos. Al finalizar, verás la URL de tu aplicación:

```
Service URL: https://lumena-clinica-xxxxx-uc.a.run.app
```

## Comandos Útiles

### Ver logs en tiempo real
```bash
gcloud run services logs tail lumena-clinica --region us-central1
```

### Actualizar la aplicación
```bash
# Después de hacer cambios en el código
gcloud run deploy lumena-clinica \
  --source . \
  --region us-central1
```

### Actualizar solo la API key
```bash
gcloud run services update lumena-clinica \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY="nueva-api-key"
```

### Ver información del servicio
```bash
gcloud run services describe lumena-clinica --region us-central1
```

### Abrir en el navegador
```bash
gcloud run services browse lumena-clinica --region us-central1
```

## Despliegue Automatizado (Opcional)

Para despliegue con Cloud Build:

```bash
gcloud builds submit --config cloudbuild.yaml
```

## Solución de Problemas

### Error: "API not enabled"
```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com
```

### Error: "Permission denied"
Asegúrate de estar autenticado:
```bash
gcloud auth login
gcloud config set project lumena-479218
```

### Ver logs de errores
```bash
gcloud run services logs read lumena-clinica --region us-central1 --limit 50
```

## Más Información

Para instrucciones detalladas, consulta:
- [.agent/workflows/deploy-cloud-run.md](.agent/workflows/deploy-cloud-run.md) - Guía completa
- [Walkthrough](file:///Users/pietro/.gemini/antigravity/brain/dbbf87a7-f348-47d9-8bb2-6c28fc10f1ac/walkthrough.md) - Explicación de archivos creados

## Costos

Cloud Run es muy económico para aplicaciones pequeñas:
- Primeros 2 millones de requests/mes: **GRATIS**
- Estimado para uso moderado: **$0-5 USD/mes**

Monitorea costos: https://console.cloud.google.com/billing/lumena-479218
