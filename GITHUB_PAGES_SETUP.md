# Configuración de GitHub Pages - LAVALEX

## ✅ Cambios Realizados

El proyecto ha sido configurado para desplegarse automáticamente en GitHub Pages. Se han realizado los siguientes cambios:

### 1. Configuración de Vite (`vite.config.ts`)
- Se agregó el `base` path configurado para GitHub Pages: `/LAVALEX_WEB_CURSOR/`
- Esto asegura que todos los recursos se carguen correctamente desde la subcarpeta

### 2. Workflow de GitHub Actions (`.github/workflows/deploy.yml`)
- Se creó un workflow automático que:
  - Se ejecuta en cada push a la rama `main`
  - Construye el proyecto con `npm run build`
  - Despliega automáticamente a GitHub Pages

### 3. Script de Deploy (`package.json`)
- Se agregó el script `deploy` (requiere `gh-pages` si quieres usarlo manualmente)

## 📋 Pasos Finales para Habilitar GitHub Pages

### Paso 1: Habilitar GitHub Pages en el Repositorio

1. Ve a tu repositorio en GitHub: https://github.com/josephprada/LAVALEX_WEB_CURSOR
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca y haz clic en **Pages**
4. En la sección **Source** (Origen):
   - Selecciona **GitHub Actions** como fuente
5. Guarda los cambios

### Paso 2: Verificar el Deploy

1. Ve a la pestaña **Actions** de tu repositorio
2. Deberías ver un workflow llamado "Deploy to GitHub Pages" ejecutándose o completado
3. Si es la primera vez, el workflow se ejecutará automáticamente después de habilitar Pages
4. Puedes forzar una ejecución manual desde la pestaña Actions → "Deploy to GitHub Pages" → "Run workflow"

### Paso 3: Acceder a tu Sitio

Una vez que el workflow se complete exitosamente, tu sitio estará disponible en:

**URL:** `https://josephprada.github.io/LAVALEX_WEB_CURSOR/`

⚠️ **Nota:** El primer deploy puede tardar entre 2-5 minutos. Los siguientes deploys serán más rápidos.

## 🔄 Deploy Automático

A partir de ahora, cada vez que hagas `git push` a la rama `main`, el sitio se actualizará automáticamente en GitHub Pages.

## 🛠️ Deploy Manual (Opcional)

Si prefieres hacer deploy manualmente, puedes usar:

```bash
npm run build
# Luego sube la carpeta dist/ a la rama gh-pages o usa gh-pages
```

Pero con el workflow configurado, esto no es necesario.

## 📝 Notas Importantes

- El `base` path en `vite.config.ts` debe coincidir con el nombre de tu repositorio
- Si cambias el nombre del repositorio, actualiza el `base` path en `vite.config.ts`
- Los cambios en el código se reflejarán automáticamente después de cada push a `main`

## 🐛 Solución de Problemas

### El sitio no carga correctamente
- Verifica que el `base` path en `vite.config.ts` coincida con el nombre del repositorio
- Asegúrate de que el workflow se haya ejecutado correctamente (revisa la pestaña Actions)

### El workflow falla
- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs del workflow en la pestaña Actions para ver el error específico

### Los recursos no se cargan
- Asegúrate de que el `base` path esté configurado correctamente
- Verifica que las rutas de las imágenes y assets sean relativas o usen el base path

## ✅ Estado Actual

- ✅ Repositorio configurado: `josephprada/LAVALEX_WEB_CURSOR`
- ✅ Vite configurado para GitHub Pages
- ✅ Workflow de GitHub Actions creado y subido
- ✅ Cambios commiteados y pusheados a GitHub
- ⏳ **Pendiente:** Habilitar GitHub Pages en Settings (Paso 1 arriba)

