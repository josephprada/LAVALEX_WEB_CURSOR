# 📸 Cómo Funciona la Conexión Storage-Tabla para Imágenes

## 🔄 Flujo Completo

### 1. **Subida de Imágenes a Storage**

Cuando subes una imagen en el formulario:

1. **El archivo se sube a Supabase Storage**
   - Bucket: `washer-images`
   - Ruta: `{washerId}/{timestamp}-{random}.{extension}`
   - Ejemplo: `abc123-def456/1706123456789-k3j2h1.jpeg`

2. **Se obtiene la URL pública**
   - Supabase genera una URL pública automáticamente
   - Ejemplo: `https://ghctdbkkcvkkkeaclryu.supabase.co/storage/v1/object/public/washer-images/abc123-def456/1706123456789-k3j2h1.jpeg`

3. **La URL se guarda en la tabla `washers`**
   - Campo: `image_urls` (array de texto)
   - Se guarda como: `["url1", "url2", "url3"]`

### 2. **Visualización de Imágenes**

Cuando se muestra una lavadora:

1. **Se lee el array `image_urls` de la tabla**
2. **Cada URL apunta directamente al archivo en Storage**
3. **El navegador carga la imagen desde Storage usando la URL**

---

## ⚙️ Configuración Necesaria

### ✅ Checklist de Configuración

1. **Bucket creado en Storage**
   - Nombre: `washer-images` (exacto)
   - ✅ Marcado como **PÚBLICO** (muy importante)

2. **Políticas de Storage configuradas**
   - Lectura pública (SELECT)
   - Escritura solo para autenticados (INSERT, UPDATE, DELETE)

3. **RLS en la tabla `washers`**
   - Lectura pública (SELECT)
   - Escritura solo para autenticados (INSERT, UPDATE, DELETE)

---

## 🔍 Verificar que Todo Funciona

### Paso 1: Verificar el Bucket

1. Ve a **Storage** en Supabase Dashboard
2. Abre el bucket `washer-images`
3. Verifica que:
   - ✅ Está marcado como **Público**
   - ✅ Puedes ver archivos subidos (si hay)

### Paso 2: Verificar las URLs en la Base de Datos

1. Ve a **Table Editor** > `washers`
2. Abre una lavadora que tenga imágenes
3. Verifica el campo `image_urls`
4. Deberías ver algo como:
   ```json
   ["https://ghctdbkkcvkkkeaclryu.supabase.co/storage/v1/object/public/washer-images/..."]
   ```

### Paso 3: Probar la URL Directamente

1. Copia una URL del campo `image_urls`
2. Pégalo en el navegador
3. **Deberías ver la imagen directamente**
4. Si ves un error 404 o "Access Denied", el bucket NO está público

---

## 🐛 Solución de Problemas

### ❌ Las imágenes no se ven

**Problema 1: Bucket no es público**
- **Solución**: Ve a Storage > washer-images > Settings > Activa "Public bucket"

**Problema 2: URLs no se están guardando**
- **Solución**: 
  1. Abre la consola del navegador (F12)
  2. Busca los logs que empiezan con 📤, ✅, o ❌
  3. Verifica si hay errores al subir

**Problema 3: Políticas de Storage incorrectas**
- **Solución**: Ejecuta el script `supabase-storage-policies.sql` de nuevo

**Problema 4: CORS bloqueando las imágenes**
- **Solución**: En Storage > Settings del bucket, verifica que CORS esté configurado

### ❌ Error al subir imágenes

**Error: "new row violates row-level security policy"**
- **Causa**: No estás autenticado
- **Solución**: Asegúrate de estar logueado antes de subir

**Error: "Bucket not found"**
- **Causa**: El bucket no existe o tiene otro nombre
- **Solución**: Verifica que el bucket se llame exactamente `washer-images`

**Error: "The resource already exists"**
- **Causa**: Estás intentando subir un archivo con el mismo nombre
- **Solución**: El código ya maneja esto, pero si persiste, verifica los logs

---

## 📊 Estructura de Datos

### En la Tabla `washers`:

```sql
image_urls: TEXT[]  -- Array de URLs
```

Ejemplo de datos:
```json
["https://...supabase.co/.../image1.jpeg", "https://...supabase.co/.../image2.jpeg"]
```

### En Storage:

```
washer-images/
  ├── {washer-id-1}/
  │   ├── 1706123456789-abc123.jpeg
  │   └── 1706123457890-def456.jpeg
  ├── {washer-id-2}/
  │   └── 1706123458901-ghi789.jpeg
```

---

## 🔐 Seguridad

- ✅ **Lectura pública**: Cualquiera puede ver las imágenes (necesario para la landing)
- ✅ **Escritura protegida**: Solo usuarios autenticados pueden subir/eliminar
- ✅ **RLS activado**: Protege la tabla de modificaciones no autorizadas

---

## 💡 Tips

1. **Siempre verifica la consola del navegador** cuando subas imágenes
2. **Las URLs son permanentes** - no cambian a menos que elimines el archivo
3. **El bucket debe ser público** para que las imágenes se vean en la landing
4. **Los archivos se organizan por `washerId`** para facilitar la limpieza

---

## 🧪 Prueba Rápida

1. Crea una lavadora con una imagen
2. Abre la consola del navegador (F12)
3. Busca los logs: deberías ver:
   ```
   📤 Subiendo imagen: {...}
   ✅ Imagen subida exitosamente: {...}
   🔗 URL pública generada: https://...
   📋 Total de URLs de imágenes: 1
   ✅ Lavadora creada: {...}
   ```
4. Ve a la tabla `washers` y verifica que `image_urls` tenga la URL
5. Copia la URL y pégala en el navegador - deberías ver la imagen
