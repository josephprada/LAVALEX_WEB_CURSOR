# Despliegue automático al VPS con GitHub Actions

Cada vez que hagas **push a la rama `main`**, GitHub Actions construye el proyecto y sube los archivos a tu VPS. Así no tienes que ejecutar `npm run build` ni `scp` a mano.

---

## Qué hace el workflow

1. Se ejecuta en cada **push a `main`** (y también se puede lanzar manualmente desde la pestaña Actions).
2. Instala dependencias y hace **build** con las variables de Supabase (desde secretos).
3. Conecta al VPS por **SSH** y copia el contenido de `dist/` a `/var/www/lavalex/`.

El workflow está en `.github/workflows/deploy-vps.yml`. El despliegue a **GitHub Pages** sigue siendo independiente (otro workflow).

---

## Configuración (solo una vez)

### 1. Crear una clave SSH para el despliegue

En tu PC (PowerShell o Git Bash), genera un par de claves **sin contraseña** para que GitHub Actions pueda usarla sin intervención:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f deploy_key -N '""'
```

Se crearán `deploy_key` (privada) y `deploy_key.pub` (pública). **No subas la privada al repositorio.**

### 2. Añadir la clave pública al VPS

Conéctate al VPS y agrega la clave pública al usuario con el que despliegas (por ejemplo `root`):

```bash
ssh -p 22022 root@69.6.234.237
```

En el VPS:

```bash
mkdir -p ~/.ssh
echo "CONTENIDO_DE_deploy_key.pub" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

(Sustituye `CONTENIDO_DE_deploy_key.pub` por todo el contenido del archivo `deploy_key.pub`.)

Comprueba que puedes entrar con la clave privada desde tu PC:

```bash
ssh -p 22022 -i deploy_key root@69.6.234.237
```

### 3. Añadir secretos en GitHub

En tu repositorio: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Crea estos secretos:

| Nombre del secreto       | Valor                    | Ejemplo / descripción                          |
|--------------------------|--------------------------|------------------------------------------------|
| `VPS_HOST`               | IP del VPS               | `69.6.234.237`                                 |
| `VPS_PORT`               | Puerto SSH               | `22022`                                        |
| `VPS_USER`               | Usuario SSH              | `root`                                         |
| `VPS_SSH_PRIVATE_KEY`    | Clave privada completa   | Todo el contenido de `deploy_key` (incluido `-----BEGIN...` y `-----END...`) |
| `VITE_SUPABASE_URL`      | URL del proyecto Supabase| `https://xxxx.supabase.co`                      |
| `VITE_SUPABASE_ANON_KEY` | Anon key de Supabase     | La clave pública del proyecto                  |

Para `VPS_SSH_PRIVATE_KEY`: abre `deploy_key` en un editor y copia **todas** las líneas (desde `-----BEGIN OPENSSH PRIVATE KEY-----` hasta `-----END OPENSSH PRIVATE KEY-----`).

### 4. Listo

Haz push a `main` (o ejecuta el workflow manualmente en **Actions** → **Deploy to VPS** → **Run workflow**). En la pestaña Actions verás el progreso; si todo está bien, el sitio en https://lavalex.co se actualizará tras cada ejecución correcta.

---

## Resumen

- **Automático:** push a `main` → build → subida al VPS.
- **Manual:** Actions → Deploy to VPS → Run workflow.
- **GitHub Pages** no se modifica; sigue desplegando con su propio workflow.
- Las variables de Supabase y los datos del VPS van en **secretos**, no en el código.
