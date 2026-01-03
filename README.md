# LAVALEX - Landing Page

Landing page profesional para LAVALEX, empresa especializada en compra, venta, reparación y mantenimiento de lavadoras automáticas en Bucaramanga.

## 🚀 Tecnologías

- **React 19** con **TypeScript**
- **Vite** como build tool
- **Framer Motion** para animaciones
- **React Icons** para iconografía
- **CSS Modules** para estilos modulares

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (Button, Input, Card, etc.)
│   ├── layout/         # Header, Footer, Container
│   └── sections/       # Secciones específicas de la landing
├── styles/             # Sistema de diseño
│   ├── variables.css   # Variables CSS globales
│   ├── themes/         # Temas (light, dark)
│   └── mixins.css      # Mixins y utilidades
├── hooks/              # Custom hooks
├── utils/              # Utilidades y helpers
├── assets/             # Imágenes, logos, iconos
├── types/              # Definiciones TypeScript
└── constants/          # Constantes de la aplicación
```

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño basado en CSS Modules con variables globales que permiten:

- **Temas**: Soporte para modo claro y oscuro
- **Colores de marca**: Paleta extraída de los logos SVG
- **Componentes reutilizables**: Button, Input, Card, Accordion, Section
- **Responsive**: Mobile-first approach

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📦 Dependencias Principales

- `react`: ^19.1.0
- `react-dom`: ^19.1.0
- `framer-motion`: ^11.0.0
- `react-icons`: ^5.2.0
- `typescript`: ^5.3.3

## 🎯 Características

- ✅ Header sticky con animación al hacer scroll
- ✅ Botón flotante de WhatsApp
- ✅ Botón scroll to top
- ✅ Animaciones suaves con Framer Motion
- ✅ Formulario de contacto integrado con WhatsApp
- ✅ Sección de compra y venta con galería
- ✅ Sección de servicios de reparación y mantenimiento
- ✅ Sección "Quién Soy"
- ✅ FAQ con acordeón interactivo
- ✅ Diseño responsive
- ✅ SEO optimizado
- ✅ Lazy loading de componentes

## 📝 Configuración

### Variables de Entorno

Actualizar en `src/constants/index.ts`:
- `WHATSAPP_NUMBER`: Número de WhatsApp para contacto
- `WHATSAPP_MESSAGE`: Mensaje predeterminado

### Personalización

Los colores de la marca están definidos en `src/styles/variables.css` y pueden ajustarse fácilmente.

## 🚀 Despliegue

El proyecto está listo para desplegar en cualquier plataforma que soporte aplicaciones React/Vite:

- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

## 📄 Licencia

Todos los derechos reservados © 2024 LAVALEX
