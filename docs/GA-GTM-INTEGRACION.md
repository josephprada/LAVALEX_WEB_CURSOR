# Guía: Integrar Google Analytics 4 con Google Tag Manager

Guía paso a paso para conectar **Google Analytics 4 (GA4)** usando **Google Tag Manager (GTM)** en el sitio Lavalex, sin instalar el código de GA directamente en el proyecto.

---

## Índice

1. [Qué vas a lograr](#1-qué-vas-a-lograr)
2. [Crear propiedad en Google Analytics 4](#2-crear-propiedad-en-google-analytics-4)
3. [Crear contenedor en Google Tag Manager](#3-crear-contenedor-en-google-tag-manager)
4. [Instalar el código de GTM en tu sitio](#4-instalar-el-código-de-gtm-en-tu-sitio)
5. [Configurar la etiqueta de GA4 en GTM](#5-configurar-la-etiqueta-de-ga4-en-gtm)
6. [Publicar el contenedor y verificar](#6-publicar-el-contenedor-y-verificar)
7. [Eventos opcionales (clics, formularios)](#7-eventos-opcionales-clics-formularios)
8. [Resumen y próximos pasos](#8-resumen-y-próximos-pasos)

---

## 1. Qué vas a lograr

- **GTM** cargará en todas las páginas y gestionará las etiquetas (tags).
- **GA4** se cargará a través de GTM: página vista por defecto y, si quieres, eventos personalizados.
- Podrás añadir después más etiquetas (Meta Pixel, Clarity, etc.) desde GTM sin tocar código.

**Flujo:** Usuario entra → GTM carga → GTM dispara la etiqueta GA4 → GA4 registra la visita.

---

## 2. Crear propiedad en Google Analytics 4

### 2.1 Entrar a Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com).
2. Inicia sesión con la cuenta de Google que quieras usar para Lavalex.

### 2.2 Crear propiedad (si aún no tienes una)

1. En la esquina inferior izquierda, haz clic en **Administrar** (icono de engranaje).
2. En la columna **Cuenta**, asegúrate de tener (o crear) una cuenta para Lavalex.
3. En la columna **Propiedad**, haz clic en **+ Crear propiedad**.
4. **Nombre de la propiedad:** por ejemplo `LAVALEX - Web`.
5. **Zona horaria:** `(GMT-05:00) Bogotá`.
6. **Moneda:** Pesos colombianos (COP) o la que prefieras.
7. Siguiente → responde el cuestionario de negocio si quieres (opcional) → **Crear**.
8. Acepta los términos de servicio si aparecen.

### 2.3 Crear flujo de datos web (GA4)

1. En **Administrar** → columna **Propiedad** → **Flujos de datos**.
2. Clic en **Añadir flujo** (o **Web** si es la primera vez).
3. **URL del sitio web:** `https://lavalex.co` (o tu dominio real).
4. **Nombre del flujo:** por ejemplo `Lavalex Web`.
5. Opciones de medición mejorada: deja activado lo que quieras (recomendado: todo).
6. **Crear flujo**.

### 2.4 Anotar el ID de medición

En la pantalla del flujo de datos verás algo como:

- **ID de medición:** `G-XXXXXXXXXX`

**Cópialo y guárdalo.** Lo usarás en GTM en el siguiente bloque.

---

## 3. Crear contenedor en Google Tag Manager

### 3.1 Entrar a GTM

1. Ve a [tagmanager.google.com](https://tagmanager.google.com).
2. Inicia sesión con la misma cuenta de Google (recomendado).

### 3.2 Crear contenedor

1. Clic en **Crear cuenta** (o **Añadir cuenta** si ya tienes otra).
2. **Nombre de la cuenta:** por ejemplo `LAVALEX`.
3. **Nombre del contenedor:** por ejemplo `lavalex.co`.
4. **Plataforma de destino:** **Web**.
5. Clic en **Crear**.
6. Acepta los Términos del Servicio si aparecen.

### 3.3 Anotar el ID del contenedor

En la pantalla principal de GTM verás un recuadro con dos bloques de código:

- **ID del contenedor:** formato `GTM-XXXXXXX` (ej. `GTM-ABC1234`).

**Cópialo.** Lo pegarás en el `index.html` del proyecto (paso 4).

Si cierras la ventana, el ID siempre está en la esquina superior derecha de la interfaz de GTM.

---

## 4. Instalar el código de GTM en tu sitio

GTM requiere **dos fragmentos**: uno en el `<head>` y otro justo después de la apertura del `<body>`.

### 4.1 Fragmento del `<head>`

Se coloca **lo antes posible** dentro de `<head>`, típicamente después de `<meta charset>` y `<viewport>`.

Sustituye `GTM-XXXXXXX` por tu ID real (ej. `GTM-ABC1234`):

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

### 4.2 Fragmento del `<body>`

Se coloca **inmediatamente después** de la etiqueta de apertura `<body>`.

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

Usa el **mismo** ID en ambos sitios.

### 4.3 Dónde está en este proyecto

En este repositorio:

- Archivo: **`index.html`** (raíz del proyecto).
- `<head>`: el script de GTM está después de los meta tags y antes del cierre de `</head>`.
- `<body>`: el `<noscript>` está justo después de `<body>` y antes de `<div id="root">`.

Cuando despliegues (por ejemplo en lavalex.co), el mismo `index.html` se sirve y GTM cargará en todas las rutas de tu SPA (React/Vite) porque el HTML es único.

---

## 5. Configurar la etiqueta de GA4 en GTM

### 5.1 Crear la etiqueta de Google Analytics: GA4 Configuration

1. En GTM, en el menú izquierdo: **Etiquetas** → **Nueva**.
2. **Nombre:** `GA4 - Configuración` (o similar).
3. Clic en **Configuración de la etiqueta** → elige **Google Analytics: GA4 Configuration**.
4. En **ID de medición**, pega tu ID de GA4: `G-XXXXXXXXXX`.
5. (Opcional) En **Campos a configurar** puedes añadir más parámetros; para empezar no es necesario.

### 5.2 Definir el activador (trigger)

1. En **Activación**, elige **All Pages** (Todas las páginas).
   - Si no existe, créalo: **Activación** → **Nueva** → Tipo **Page View** → disparador **All Pages** → Guardar.
2. Guarda la etiqueta (**Guardar**).

### 5.3 Resumen

- **Etiqueta:** GA4 Configuration.  
- **Activación:** All Pages.  

Con esto, cada vez que se cargue una página, GTM enviará una “vista de página” a GA4.

---

## 6. Publicar el contenedor y verificar

### 6.1 Enviar y publicar

1. En GTM, clic en **Enviar** (arriba a la derecha).
2. **Nombre de la versión:** por ejemplo `Configuración inicial GA4`.
3. **Enviar** y luego **Publicar**.

### 6.2 Verificar en el sitio

1. Abre tu sitio en el navegador (local o lavalex.co).
2. Abre las DevTools (F12) → pestaña **Red** (Network).
3. Recarga la página.
4. Busca una petición a `googletagmanager.com` y/o `google-analytics.com`. Deberían aparecer (puede verse como `gtm.js`, `collect`, etc.).

### 6.3 Verificar en GA4

1. En GA4: **Informes** → **Tiempo real** (o **Informes en tiempo real**).
2. Con la pestaña del sitio aún abierta, deberías ver al menos **1 usuario activo** y la URL de la página.

Si ves el usuario en tiempo real, la integración GA + GTM está funcionando.

**Nota:** Los datos en otros informes (no tiempo real) pueden tardar 24–48 horas en aparecer.

---

## 7. Eventos opcionales (clics, formularios)

GTM puede enviar **eventos** a GA4 (por ejemplo: clic en “Quiero vender”, envío de formulario). Resumen:

### 7.1 Clics en enlaces o botones

1. En GTM: **Activaciones** → **Nueva**.
2. Tipo: **Clic - Todos los elementos** (o **Just Links** si solo quieres enlaces).
3. Configura **Algunos clics** si quieres filtrar por texto o URL (ej. texto del botón contiene “Vender”).
4. Nueva **Etiqueta** → tipo **Google Analytics: GA4 Event**.
5. **ID de medición:** mismo `G-XXXXXXXXXX`.
6. **Nombre del evento:** por ejemplo `click_cta_vender`.
7. **Activación:** el activador de clic que creaste.

Así GA4 registrará ese evento y podrás usarlo en informes y conversiones.

### 7.2 Envío de formularios

1. **Activación** → **Nueva** → tipo **Formulario enviado**.
2. Opcional: restringir a un formulario concreto (por ID o nombre).
3. Etiqueta **GA4 Event** con nombre por ejemplo `form_submit_contacto**, activada por ese activador.

### 7.3 Marcar un evento como conversión

En GA4: **Administrar** → **Eventos** → localiza el evento (ej. `click_cta_vender`) → activa **Marcar como conversión**.

---

## 8. Resumen y próximos pasos

| Paso | Acción |
|------|--------|
| 1 | Crear propiedad GA4 y flujo de datos web → anotar **ID de medición** (`G-...`). |
| 2 | Crear contenedor GTM (Web) → anotar **ID del contenedor** (`GTM-...`). |
| 3 | Pegar los dos fragmentos de GTM en `index.html` (head y body) con tu `GTM-...`. |
| 4 | En GTM: etiqueta **GA4 Configuration** con tu `G-...`, activación **All Pages**. |
| 5 | **Enviar** y **Publicar** el contenedor. |
| 6 | Verificar en GA4 **Tiempo real** con el sitio abierto. |

**Próximos pasos recomendados:**

- Añadir **Google Search Console** y vincularlo con GA4 (para SEO).
- Añadir eventos para los CTAs importantes (vender, reparación, contacto).
- Considerar **Microsoft Clarity** (heatmaps/sesiones) instalado también vía GTM.

Si cambias de dominio (por ejemplo de lavalex.com a lavalex.co), actualiza la URL del flujo de datos en GA4 y, si usas filtros o segmentos, las URLs en ellos.
