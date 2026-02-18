# Guía de despliegue: Lavalex en VPS (plan n8n)

Guía paso a paso para subir tu landing Lavalex a un VPS con plan n8n, usar tu dominio y dejar todo funcionando con HTTPS.

---

## Índice

1. [Conceptos que debes conocer](#1-conceptos-que-debes-conocer)
2. [Qué necesitas tener a mano](#2-qué-necesitas-tener-a-mano)
3. [Conectarte al VPS por SSH](#3-conectarte-al-vps-por-ssh)
4. [Preparar el servidor (Nginx)](#4-preparar-el-servidor-nginx)
5. [Construir el proyecto en tu PC](#5-construir-el-proyecto-en-tu-pc)
6. [Subir los archivos al VPS](#6-subir-los-archivos-al-vps)
7. [Configurar Nginx para tu sitio](#7-configurar-nginx-para-tu-sitio)
8. [Comprobar que el dominio apunta al VPS](#8-comprobar-que-el-dominio-apunta-al-vps)
9. [Activar HTTPS con Let's Encrypt](#9-activar-https-con-lets-encrypt)
10. [Resumen de comandos y actualizaciones futuras](#10-resumen-de-comandos-y-actualizaciones-futuras)
11. [Problemas frecuentes](#11-problemas-frecuentes)

---

## 1. Conceptos que debes conocer

- **VPS (Virtual Private Server):** Un servidor virtual que es “tu máquina” en internet. Tienes acceso completo (como un PC con Linux). Puedes instalar programas, servir tu web, etc.

- **SSH (Secure Shell):** Forma segura de “entrar” al VPS desde tu PC. Escribes comandos en una terminal y se ejecutan en el servidor.

- **Dominio:** La dirección que la gente escribe (ej. `www.tudominio.com`). Lo “enlazaste” al VPS: en la práctica eso significa que en el panel del proveedor se configuró un registro **A** que apunta la dirección al **IP del VPS**.

- **Nginx:** Programa que sirve archivos por internet. En tu caso servirá los archivos estáticos (HTML, JS, CSS) que genera Vite al hacer el build.

- **Build:** El proceso que convierte tu código (React, Vite) en archivos listos para producción. El resultado queda en la carpeta `dist/` de tu proyecto.

---

## 2. Qué necesitas tener a mano

Antes de empezar, asegúrate de tener:

| Dato | Dónde lo ves |
|------|----------------|
| **IP del VPS** | Panel del proveedor (Hostinger, etc.): sección del VPS o del servicio. |
| **Usuario SSH** | Suele ser `root` o el que te dieron al crear el VPS. |
| **Contraseña SSH** (o clave privada) | Email del proveedor o panel (algunos dan solo contraseña, otros una clave para descargar). |
| **Nombre de tu dominio** | Ej. `lavalex.com` o `www.lavalex.com`. |
| **Variables de Supabase** | En tu proyecto: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` (en `.env` o `.env.local`). |

En tu PC necesitas:

- **Terminal:** En Windows puedes usar **PowerShell** o **Windows Terminal**. Si prefieres una app con interfaz, **PuTTY** también sirve para SSH.
- **Conexión a internet** estable.

---

## 3. Conectarte al VPS por SSH

### 3.1 Desde Windows (PowerShell o CMD)

Abre PowerShell y ejecuta (sustituye `TU_IP`, `usuario` y, si aplica, `PUERTO` por tus datos):

```bash
ssh -p PUERTO usuario@TU_IP
```

**Importante:** Algunos proveedores (por ejemplo HostGator) usan un puerto SSH distinto al 22 (ej. 22022). Revisa en el panel de tu VPS la sección "Acceso SSH": si indica **Puerto**, úsalo con `-p`. Si no indica puerto, se usa el 22 por defecto.

Ejemplo con puerto 22 (estándar):

```bash
ssh root@123.45.67.89
```

Ejemplo con puerto 22022 (HostGator u otros):

```bash
ssh -p 22022 root@69.6.234.237
```

- La primera vez te preguntará si confías en el servidor: escribe **yes** y Enter.
- Luego te pedirá la **contraseña** del usuario. Al escribirla no se verá nada (es normal); escribe y pulsa Enter.

Cuando veas un prompt como `root@nombre-del-servidor:~#`, ya estás **dentro del VPS**.

### 3.2 Si usas clave privada en lugar de contraseña

Si el proveedor te dio un archivo `.pem` o similar:

```bash
ssh -i ruta/al/archivo.pem usuario@TU_IP
```

### 3.3 Si no tienes SSH en Windows

En Windows 10/11 suele venir OpenSSH. Si al ejecutar `ssh` te dice que no existe el comando:

- Instala [OpenSSH](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse) o usa **PuTTY**: en “Host” pon la IP, en “Connection > SSH” tu usuario y contraseña (o clave).

---

## 4. Preparar el servidor (Nginx)

Una vez conectado al VPS por SSH, ejecuta los comandos según tu sistema.

**¿Tienes AlmaLinux 9 (o Rocky Linux / RHEL)?** → Usa la [sección 4.5](#45-si-tienes-almalinux-9) y, más adelante, las variantes indicadas en los pasos 7 y 9.

**¿Tienes Debian o Ubuntu?** → Sigue desde 4.1.

### 4.1 Actualizar el sistema (Debian/Ubuntu)

```bash
apt update && apt upgrade -y
```

### 4.2 Instalar Nginx (Debian/Ubuntu)

```bash
apt install nginx -y
```

### 4.3 Comprobar que Nginx está activo

```bash
systemctl status nginx
```

Deberías ver `active (running)`. Para salir de esa vista pulsa **q**.

### 4.4 Crear la carpeta donde irá tu web

Vamos a usar una ruta clara y que no se mezcle con n8n:

```bash
mkdir -p /var/www/lavalex
```

- **`/var/www/`** es la ruta típica donde se ponen sitios web en Linux.
- **`lavalex`** es el nombre de la “carpeta del sitio”; puedes cambiarlo si quieres.

Cuando más adelante subas los archivos, el contenido de tu carpeta `dist/` (del build) debe quedar **dentro** de `/var/www/lavalex/` (es decir, que `index.html` esté en `/var/www/lavalex/index.html`).

### 4.5 Si tienes AlmaLinux 9

En AlmaLinux 9 (y en Rocky Linux o RHEL) se usa **dnf** en lugar de **apt**. Los comandos equivalentes son:

**Actualizar el sistema:**

```bash
dnf update -y
```

**Instalar Nginx:**

```bash
dnf install nginx -y
```

**Activar e iniciar Nginx (por si no arrancó solo):**

```bash
systemctl enable nginx
systemctl start nginx
systemctl status nginx
```

Deberías ver `active (running)`. Para salir de esa vista pulsa **q**.

**Crear la carpeta del sitio** (igual que arriba):

```bash
mkdir -p /var/www/lavalex
```

A partir de aquí, los pasos 5 y 6 (build en tu PC y subir archivos) son **iguales**. En el paso 7 (configurar Nginx) y en el 9 (Certbot) usa las variantes para AlmaLinux que se indican ahí.

---

## 5. Construir el proyecto en tu PC

Antes de subir nada, debes generar el build en tu ordenador. Así el VPS solo sirve archivos y no necesita Node.js.

### 5.1 Variables de entorno para producción

Tu app usa Supabase. Esas variables se “meten” en el build en el momento de compilar. Tienes dos opciones:

**Opción A – Archivo `.env` o `.env.production` en el proyecto (recomendado)**

En la raíz del proyecto (donde está `package.json`), crea o edita `.env.production` con:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

- No subas este archivo a Git (`.env` y `.env.production` suelen estar en `.gitignore`).
- Usa los valores reales de tu proyecto de Supabase (Dashboard de Supabase → Settings → API).

**Opción B – Pasar las variables al comando de build**

En PowerShell (Windows):

```powershell
$env:VITE_SUPABASE_URL="https://tu-proyecto.supabase.co"; $env:VITE_SUPABASE_ANON_KEY="tu_anon_key"; npm run build
```

Sustituye las URLs y la key por las tuyas.

### 5.2 Instalar dependencias y hacer el build

En la raíz del proyecto:

```bash
npm ci
npm run build
```

Si todo va bien, se crea la carpeta **`dist/`** con algo como:

- `index.html`
- `assets/` (JS y CSS)

Esa carpeta **`dist/`** es la que subirás al VPS.

### 5.3 Probar el build en local (opcional)

```bash
npm run preview
```

Abre en el navegador la URL que te indique (ej. `http://localhost:4173`) y comprueba que la app carga y que Supabase funciona (por ejemplo, listado de lavadoras o login).

---

## 6. Subir los archivos al VPS

Tienes que copiar **todo el contenido** de `dist/` dentro de `/var/www/lavalex/` en el VPS. Hazlo **desde tu PC**, en una terminal nueva (no hace falta estar conectado por SSH en esa misma ventana).

### 6.1 Desde PowerShell (Windows) con SCP

Abre PowerShell en la raíz de tu proyecto (donde está la carpeta `dist/`) y ejecuta (cambia `TU_IP`, `root` y, si tu proveedor usa otro puerto SSH, añade `-P PUERTO`):

```powershell
scp -r dist/* root@TU_IP:/var/www/lavalex/
```

Si tu SSH usa un puerto distinto al 22 (ej. HostGator con 22022), indica el puerto con `-P` (mayúscula en SCP):

```powershell
scp -P 22022 -r dist/* root@TU_IP:/var/www/lavalex/
```

Te pedirá la contraseña del usuario. Después del primer uso ya no tendrás que hacer nada más para esa sesión.

### 6.2 Si prefieres subir la carpeta `dist` entera

```powershell
scp -r dist root@TU_IP:/var/www/
```

Luego, por SSH en el VPS, mueve el contenido para que `index.html` esté en `/var/www/lavalex/`:

```bash
# Conectado por SSH al VPS
mv /var/www/dist/* /var/www/lavalex/
rmdir /var/www/dist
```

(En algunos casos la carpeta puede llamarse `dist` dentro de `/var/www/`; ajusta el nombre si es necesario.)

### 6.3 Permisos para que Nginx pueda leer

Conectado por SSH:

```bash
chown -R www-data:www-data /var/www/lavalex
chmod -R 755 /var/www/lavalex
```

- **Debian/Ubuntu:** Nginx suele correr como **www-data**.
- **AlmaLinux 9 (y RHEL/Rocky):** Nginx suele correr como **nginx**. En ese caso usa: `chown -R nginx:nginx /var/www/lavalex` y luego `chmod -R 755 /var/www/lavalex`.
- Así Nginx podrá leer y servir los archivos.

---

## 7. Configurar Nginx para tu sitio

Ahora hay que decirle a Nginx: “para este dominio, sirve los archivos de `/var/www/lavalex/`”.

### 7.1 Crear el archivo de configuración del sitio

Conectado por SSH:

**Debian/Ubuntu:** crea el sitio en `sites-available` (luego lo activarás en 7.2).

```bash
nano /etc/nginx/sites-available/lavalex
```

**AlmaLinux 9 (y RHEL/Rocky):** en estos sistemas se usa `conf.d`. Crea el archivo ahí:

```bash
nano /etc/nginx/conf.d/lavalex.conf
```

**Sustituye `tudominio.com`** por tu dominio real (con o sin `www`, según lo que vayas a usar). Si quieres que funcione tanto `tudominio.com` como `www.tudominio.com`, déjalo como en el ejemplo.

Pega esta configuración:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name lavalex.co www.lavalex.co;

    root /var/www/lavalex;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

- **`listen 80`:** Escucha en el puerto 80 (HTTP). Luego activarás HTTPS.
- **`server_name`:** Dominios para los que aplica este bloque.
- **`root`:** Carpeta de donde Nginx sirve los archivos.
- **`try_files ... /index.html`:** Necesario para una SPA (React Router): todas las rutas que no sean un archivo físico se redirigen a `index.html`.

Guarda en nano: **Ctrl+O**, Enter, luego **Ctrl+X** para salir.

### 7.2 Activar el sitio y recargar Nginx

```bash
ln -s /etc/nginx/sites-available/lavalex /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

- **`ln -s ...`** crea un enlace simbólico para “activar” el sitio.
- **`nginx -t`** comprueba que la configuración no tenga errores.
- **`systemctl reload nginx`** aplica los cambios.

**AlmaLinux 9 (y RHEL/Rocky):** en estos sistemas no se usa `sites-available`/`sites-enabled`. Si creaste el archivo en `/etc/nginx/conf.d/lavalex.conf`, no hace falta el `ln -s`; solo ejecuta `nginx -t` y `systemctl reload nginx`.

### 7.3 Probar por IP (antes de usar el dominio)

Abre en el navegador:

`http://TU_IP`

Deberías ver tu landing. Si ves la página por defecto de Nginx, revisa que los archivos estén en `/var/www/lavalex/` y que el `root` en la config sea esa ruta.

---

## 8. Comprobar que el dominio apunta al VPS

Dijiste que ya enlazaste el dominio al VPS. Eso normalmente significa que en el panel del proveedor hay un registro **A** que apunta tu dominio a la **IP del VPS**.

### 8.1 Comprobar desde tu PC

En PowerShell:

```powershell
nslookup tudominio.com
```

Sustituye `tudominio.com` por tu dominio. En la respuesta debería aparecer la **misma IP** que tu VPS. Si no, en el panel de DNS del proveedor:

- Tipo: **A**
- Nombre: **@** (o en blanco) para el dominio raíz, y/o **www** para `www.tudominio.com`
- Valor / destino: **IP de tu VPS**
- TTL: 300 o 3600 está bien

Los cambios de DNS pueden tardar unos minutos u horas en propagarse.

### 8.2 Probar en el navegador

Abre:

`http://tudominio.com`

(y si configuraste `www`, también `http://www.tudominio.com`). Deberías ver la misma landing que al entrar por IP.

---

## 9. Activar HTTPS con Let's Encrypt

Para que la web cargue por **https://** (candado verde) y no dé avisos de “no seguro”, usa Certbot. Es gratuito y renueva solo.

### 9.1 Instalar Certbot (en el VPS, por SSH)

**Debian/Ubuntu:**

```bash
apt install certbot python3-certbot-nginx -y
```

**AlmaLinux 9 (y RHEL/Rocky):** habilita EPEL y luego instala Certbot:

```bash
dnf install epel-release -y
dnf install certbot python3-certbot-nginx -y
```

### 9.2 Obtener el certificado y configurar Nginx automáticamente

```bash
certbot --nginx -d tudominio.com -d www.tudominio.com
```

Sustituye por tu dominio. Certbot te pedirá:

- Un email para avisos de renovación (recomendado).
- Aceptar los términos (sí).
- Redirigir HTTP a HTTPS: elige **2 (Redirect)** para forzar siempre HTTPS.

Después, Certbot modifica la configuración de Nginx y recarga el servicio.

### 9.3 Comprobar renovación automática

```bash
certbot renew --dry-run
```

Si no da error, la renovación automática está bien configurada. No tienes que hacer nada más.

Abre en el navegador **https://tudominio.com** y comprueba que carga con candado.

---

## 10. Resumen de comandos y actualizaciones futuras

### Primera vez (resumen)

| Dónde | Qué hacer |
|-------|-----------|
| **Tu PC** | `.env.production` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` |
| **Tu PC** | `npm ci && npm run build` |
| **Tu PC** | `scp -r dist/* root@TU_IP:/var/www/lavalex/` (con `-P 22022` si usas HostGator) |
| **VPS** | Crear `/var/www/lavalex`, permisos `nginx:nginx` (AlmaLinux) o `www-data` (Debian), config Nginx, `certbot` |

### Cómo subir cambios y actualizar el sitio

Cada vez que modifiques el código (textos, estilos, componentes, imágenes, etc.) y quieras que se vea en la web en vivo, sigue estos pasos.

#### Paso 1: En tu PC, en la raíz del proyecto

- Si cambiaste **solo código** (HTML, CSS, JS, componentes): no hace falta tocar `.env.production`.
- Si cambiaste **variables de entorno** (por ejemplo otra URL o key de Supabase): actualiza `.env.production` antes de construir.

Luego construye el proyecto:

```bash
npm run build
```

Si algo falla, corrige el error antes de subir. Si el build termina bien, se habrá generado de nuevo la carpeta `dist/`.

#### Paso 2: Subir los archivos al VPS

Desde **PowerShell** (en la raíz del proyecto, donde está `dist/`):

**Si tu SSH usa el puerto por defecto (22):**

```powershell
scp -r dist/* root@TU_IP:/var/www/lavalex/
```

**Si usas HostGator u otro proveedor con puerto SSH distinto (ej. 22022):**

```powershell
scp -P 22022 -r dist/* root@TU_IP:/var/www/lavalex/
```

Sustituye `TU_IP` por la IP de tu VPS (ej. `69.6.234.237`). Te pedirá la contraseña de `root`; los archivos se sobrescribirán en el servidor.

#### Paso 3: Comprobar en el navegador

- Abre tu sitio (ej. `https://lavalex.co`) y revisa que se vean los cambios.
- Si sigues viendo la versión anterior, prueba **recarga forzada**: Ctrl+F5 (Windows) o Cmd+Shift+R (Mac), o abre en ventana privada. A veces el navegador usa caché del JS/CSS anterior.

#### Resumen rápido (actualizar después de cada cambio)

| Dónde   | Comando |
|---------|---------|
| **Tu PC** | `npm run build` |
| **Tu PC** | `scp -P 22022 -r dist/* root@TU_IP:/var/www/lavalex/` (ajusta `-P` y `TU_IP`) |
| **VPS**  | No hace falta hacer nada; Nginx sirve los archivos nuevos al instante. |

No es necesario reiniciar Nginx ni ejecutar comandos en el VPS al subir cambios; solo reemplazar el contenido de `/var/www/lavalex/` es suficiente.

### Script opcional para actualizar desde tu PC (PowerShell)

Puedes guardar esto en un archivo `deploy.ps1` en la raíz del proyecto (y rellenar `TU_IP` y, si aplica, el puerto):

```powershell
$VPS_IP = "TU_IP"
$SSH_PORT = 22022   # Cambia a 22 si tu SSH usa el puerto por defecto

# Opcional: si no usas .env.production, descomenta y rellena:
# $env:VITE_SUPABASE_URL = "https://tu-proyecto.supabase.co"
# $env:VITE_SUPABASE_ANON_KEY = "tu_anon_key"

npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }
scp -P $SSH_PORT -r dist/* root@${VPS_IP}:/var/www/lavalex/
Write-Host "Despliegue terminado. Comprueba https://tudominio.com"
```

Ejecutar con: `.\deploy.ps1`. Es mejor usar `.env.production` para las variables y dejar comentadas las líneas de `$env:...`.

---

## 11. Problemas frecuentes

### La página en blanco o “Cannot GET /ruta”

- Nginx debe tener **`try_files $uri $uri/ /index.html;`** en el `location /`. Sin eso, al recargar en una ruta de React Router (ej. `/venta`) Nginx busca un archivo llamado `venta` y no lo encuentra.
- Tras cambiar la config: `nginx -t` y `systemctl reload nginx`.

### Los estilos o el JS no cargan (404)

- Asegúrate de haber subido **todo** el contenido de `dist/`, incluida la carpeta `assets/`.
- La ruta en Nginx debe ser `root /var/www/lavalex;` y en esa carpeta debe estar `index.html` y `assets/`.

### Supabase no funciona (error de red o “Servicio no configurado”)

- Las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` tienen que estar definidas **en el momento del build**. Si construiste sin ellas, vuelve a hacer `npm run build` con el `.env.production` correcto (o con las variables en el comando) y vuelve a subir `dist/`.

### No puedo conectar por SSH

- Comprueba que la IP sea la **pública del VPS** (no tu IP local 192.168.x.x). La ves en el panel del proveedor.
- Muchos proveedores (p. ej. HostGator) usan un **puerto SSH distinto al 22** (ej. 22022). En el panel, en "Acceso SSH", revisa el campo **Puerto** y conecta con: `ssh -p 22022 root@TU_IP`.
- Si usas clave privada, revisa la ruta del `-i` y los permisos del archivo.

### El dominio no abre o abre otra cosa

- Espera un poco (propagación DNS).
- Comprueba con `nslookup tudominio.com` que la IP sea la del VPS.
- En Nginx, que `server_name` sea exactamente tu dominio (con o sin `www` según lo que uses).

### Certbot falla (“Could not find a virtual host”)

- El bloque `server` de Nginx para tu dominio debe estar activo y con `server_name` correcto.
- Ejecuta `nginx -t` y revisa que no haya errores. Luego `certbot --nginx -d tudominio.com`.

---

Si sigues esta guía en orden, tendrás la landing Lavalex funcionando en tu VPS con tu dominio y HTTPS. Para cualquier paso, si tu proveedor usa otro sistema (por ejemplo, panel propio para Nginx o dominio), adapta solo esa parte; el resto (build, subida de `dist/`, variables de Supabase, SPA con `try_files`) sigue siendo igual.
