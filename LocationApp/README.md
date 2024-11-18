
# LocationApp

Este proyecto es una aplicación de React Native que utiliza Expo para gestionar la ubicación en dispositivos iOS. A continuación, se describen los pasos para configurar y ejecutar la aplicación en un emulador de iPhone utilizando Xcode.

## Requisitos previos

- macOS con Xcode instalado
- Node.js instalado
- Git instalado

## Pasos para configurar y ejecutar la aplicación

### 1. Configurar el emulador de Xcode

Asegúrate de que Xcode esté instalado y configurado correctamente en tu sistema:

1. Abre Xcode.
2. Navega a **Preferences > Platforms > iOS** y asegúrate de tener un simulador de iPhone descargado.
3. Configura el simulador según tus necesidades.

### 2. Clonar el repositorio con Git

Clona el repositorio del proyecto en tu máquina local:

```bash
git clone https://github.com/GALC55/WayruchallengeF.git
```

### 3. Entrar en la carpeta del proyecto

Navega a la carpeta principal del proyecto:

```bash
cd LocationApp
```

### 4. Instalar todas las dependencias

Ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### 5. Iniciar el emulador de iPhone de Xcode

1. Abre Xcode.
2. Ve a **Xcode > Open Developer Tool > Simulator**.
3. Selecciona el modelo de iPhone que deseas emular.

### 6. Ejecutar el comando para instalar la aplicación en el emulador

Ejecuta el siguiente comando para compilar e instalar la aplicación en el emulador:

```bash
npm run ios
```

---

## Notas

- Si encuentras problemas al ejecutar el comando `npm run ios`, asegúrate de que el simulador esté encendido y de que las configuraciones de tu entorno sean compatibles con el proyecto.
- Para mayor comodidad se recomienda una vez clonado el repositorio, se abra en Visual Studio Code y realizar los comandos de terminal desde ahí.
