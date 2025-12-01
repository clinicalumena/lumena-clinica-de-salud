# Instalación de Google Cloud SDK

## Estado Actual
- ❌ Homebrew no está instalado
- ❌ gcloud CLI no está instalado

## Opción 1: Instalación Manual de gcloud CLI (Recomendado)

### Paso 1: Descargar el instalador

Descarga el instalador desde el sitio oficial de Google Cloud:

**Para macOS (Apple Silicon - M1/M2/M3):**
```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-darwin-arm.tar.gz
```

**Para macOS (Intel):**
```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-darwin-x86_64.tar.gz
```

### Paso 2: Extraer el archivo

**Para Apple Silicon:**
```bash
tar -xzf google-cloud-cli-darwin-arm.tar.gz
```

**Para Intel:**
```bash
tar -xzf google-cloud-cli-darwin-x86_64.tar.gz
```

### Paso 3: Instalar

```bash
./google-cloud-sdk/install.sh
```

Durante la instalación:
- Presiona `Enter` para aceptar la ubicación por defecto
- Escribe `Y` cuando pregunte si quieres actualizar el PATH
- Escribe `Y` cuando pregunte si quieres habilitar command completion

### Paso 4: Reiniciar la terminal

Cierra y vuelve a abrir tu terminal, o ejecuta:

```bash
source ~/.zshrc
```

### Paso 5: Verificar instalación

```bash
gcloud --version
```

## Opción 2: Instalar Homebrew primero (Alternativa)

Si prefieres usar Homebrew (gestor de paquetes para macOS):

### Instalar Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Después de instalar Homebrew, ejecuta:
```bash
brew install --cask google-cloud-sdk
```

## Después de Instalar gcloud CLI

Una vez instalado, ejecuta estos comandos:

```bash
# 1. Autenticarse
gcloud auth login

# 2. Configurar proyecto
gcloud config set project lumena-479218

# 3. Habilitar APIs necesarias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 4. Verificar configuración
gcloud config list
```

## Desplegar a Cloud Run

Después de configurar gcloud, ejecuta:

```bash
cd /Users/pietro/Desktop/lumena-_-clínica-de-salud

gcloud run deploy lumena-clinica \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="TU_API_KEY_AQUI"
```

## Recursos

- [Documentación oficial de instalación](https://cloud.google.com/sdk/docs/install)
- [Guía de inicio rápido](https://cloud.google.com/sdk/docs/quickstart)

## ¿Necesitas ayuda?

Si tienes problemas con la instalación, puedes:
1. Visitar la [consola web de Google Cloud](https://console.cloud.google.com/) para gestionar tu proyecto
2. Usar [Cloud Shell](https://cloud.google.com/shell) (terminal en el navegador con gcloud pre-instalado)
