# SSL con Let's Encrypt (Certbot) en el VPS Lavalex

Resumen de lo que se hizo para activar HTTPS en **lavalex.co** y **www.lavalex.co** en el VPS de HostGator (AlmaLinux 9, Nginx).

---

## Qué se hizo

1. Se instaló el repositorio **EPEL** y luego **Certbot** con el plugin de Nginx.
2. Se obtuvo un certificado de **Let's Encrypt** para `lavalex.co` y `www.lavalex.co`.
3. Certbot modificó la configuración de Nginx (`/etc/nginx/conf.d/lavalex.conf`) para usar el certificado y redirigir HTTP → HTTPS.

**Resultado:** https://lavalex.co y https://www.lavalex.co funcionan con candado. El certificado vence el **2026-05-19** y se renueva automáticamente.

---

## Comandos ejecutados (en el VPS por SSH)

### 1. Instalar EPEL y Certbot (AlmaLinux 9)

```bash
dnf install epel-release -y
dnf install certbot python3-certbot-nginx -y
```

### 2. Obtener e instalar el certificado

```bash
certbot --nginx -d lavalex.co -d www.lavalex.co
```

Durante el proceso se indicó:
- Email: `developerjp0714@gmail.com` (para avisos de renovación y seguridad).
- Aceptar términos de Let's Encrypt y opción de compartir email con EFF.

Certbot desplegó el certificado en Nginx automáticamente.

### 3. Activar renovación automática (recomendado)

El paquete crea un timer de systemd, pero no siempre se inicia solo. Para asegurar renovaciones automáticas:

```bash
systemctl start certbot-renew.timer
systemctl enable certbot-renew.timer
```

Comprobar que el timer está activo:

```bash
systemctl status certbot-renew.timer
```

### 4. Probar renovación (opcional)

```bash
certbot renew --dry-run
```

Si no hay errores, la renovación en vivo funcionará cuando toque.

---

## Ubicación del certificado

| Qué | Ruta |
|-----|------|
| Certificado | `/etc/letsencrypt/live/lavalex.co/fullchain.pem` |
| Clave privada | `/etc/letsencrypt/live/lavalex.co/privkey.pem` |
| Config Nginx modificada por Certbot | `/etc/nginx/conf.d/lavalex.conf` |
| Logs Certbot | `/var/log/letsencrypt/letsencrypt.log` |

No es necesario tocar estos archivos a mano; Certbot los actualiza al renovar.

---

## Si en el futuro añades otro dominio o subdominio

Para incluir más nombres en el mismo certificado (o crear uno nuevo):

```bash
certbot --nginx -d nuevodominio.com -d www.nuevodominio.com
```

Para renovar todos los certificados a mano (normalmente no hace falta):

```bash
certbot renew
systemctl reload nginx
```

---

## Resumen rápido

| Acción | Comando |
|--------|---------|
| Conectar al VPS | `ssh -p 22022 root@69.6.234.237` |
| Ver estado del timer de renovación | `systemctl status certbot-renew.timer` |
| Probar renovación | `certbot renew --dry-run` |
| Ver certificados instalados | `certbot certificates` |

---

*Documentado tras activar SSL el 2026-02-18. VPS: HostGator, AlmaLinux 9, Nginx, dominio lavalex.co.*
