# Google Mobile-Friendly Test Checklist ✅

## 🎯 URL para testear:
- **Desarrollo**: http://localhost:3001/es
- **Producción**: https://www.casinospesos.com/es

## 📱 Herramientas de Google para Testing:

### 1. **Google Mobile-Friendly Test**
- URL: https://search.google.com/test/mobile-friendly
- Ingresa tu URL y ejecuta el test
- Debe mostrar "La página es apta para dispositivos móviles"

### 2. **Google PageSpeed Insights**
- URL: https://pagespeed.web.dev/
- Revisa tanto Mobile como Desktop
- Objetivo: Score > 90 en móvil

### 3. **Google Search Console**
- URL: https://search.google.com/search-console
- Revisa la sección "Usabilidad móvil"
- No debe haber errores

### 4. **Chrome DevTools Mobile Testing**
```bash
1. Abre Chrome
2. F12 o Click derecho -> Inspeccionar
3. Toggle device toolbar (Ctrl+Shift+M)
4. Selecciona diferentes dispositivos
5. Revisa que no haya scroll horizontal
```

## ✅ Checklist de Optimización Implementada:

### **1. Meta Viewport** ✅
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
- [x] Configurado en layout.tsx
- [x] Ancho = device-width
- [x] Escala inicial = 1

### **2. Tamaño de Fuentes** ✅
- [x] Fuente base mínima: 16px
- [x] Párrafos y texto: mínimo 14px
- [x] Small text: mínimo 12px
- [x] Line-height: 1.5 para legibilidad

### **3. Tap Targets (Objetivos Táctiles)** ✅
- [x] Botones mínimo: 48x48px
- [x] Enlaces mínimo: 48x48px
- [x] Inputs mínimo: 48px altura
- [x] Espaciado entre elementos: 8px mínimo

### **4. Contenido Responsive** ✅
- [x] No scroll horizontal
- [x] Imágenes max-width: 100%
- [x] Videos responsive
- [x] Tablas con overflow-x: auto
- [x] Contenedores con max-width: 100vw

### **5. Optimización de Rendimiento** ✅
- [x] Lazy loading de imágenes
- [x] Font-display: swap
- [x] Animaciones reducidas en móvil
- [x] Touch events optimizados

### **6. Características Móviles** ✅
- [x] mobile-web-app-capable
- [x] apple-mobile-web-app-capable
- [x] Theme color configurado
- [x] Manifest.json presente
- [x] Touch icons configurados

### **7. Structured Data** ✅
- [x] Schema.org WebSite
- [x] Breadcrumbs
- [x] SearchAction
- [x] Organization data

### **8. Accesibilidad** ✅
- [x] Focus states visibles
- [x] Skip links
- [x] ARIA labels
- [x] Alt text en imágenes
- [x] Contraste adecuado

### **9. Formularios Móviles** ✅
- [x] Inputs con font-size: 16px (previene zoom en iOS)
- [x] Autocomplete configurado
- [x] Type correcto (email, tel, number)
- [x] Labels asociados

### **10. Navegación Móvil** ✅
- [x] Menú hamburguesa funcional
- [x] Scroll lock cuando menú abierto
- [x] Touch-friendly navigation
- [x] Bottom navigation bar

## 📊 Métricas Objetivo:

### Core Web Vitals (Mobile):
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms  
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s

### Google Mobile-Friendly Test:
- ✅ Página apta para móviles
- ✅ Sin errores de usabilidad
- ✅ Recursos cargables
- ✅ Viewport configurado correctamente

## 🚀 Comandos para Testing:

### 1. Test Local con ngrok:
```bash
# Instalar ngrok
npm install -g ngrok

# Exponer puerto local
ngrok http 3001

# Usar la URL HTTPS generada en Google Mobile Test
```

### 2. Lighthouse CLI:
```bash
# Instalar Lighthouse
npm install -g lighthouse

# Ejecutar test móvil
lighthouse http://localhost:3001 --view --preset=desktop --throttling.cpuSlowdownMultiplier=4

# Con autenticación si es necesario
lighthouse http://localhost:3001 --view --chrome-flags="--headless" --output=json --output-path=./lighthouse-report.json
```

### 3. Test con Puppeteer:
```bash
npm install puppeteer

# Crear script test-mobile.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Emular iPhone 12
  await page.emulate(puppeteer.devices['iPhone 12']);
  
  await page.goto('http://localhost:3001');
  await page.screenshot({ path: 'mobile-screenshot.png' });
  
  // Check viewport
  const viewport = await page.evaluate(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });
  
  console.log('Viewport:', viewport);
  await browser.close();
})();
```

## 🔍 Validación Manual:

### En Dispositivo Real:
1. Abre el sitio en tu móvil
2. Verifica:
   - [ ] No hay scroll horizontal
   - [ ] Botones son fáciles de tocar
   - [ ] Texto es legible sin zoom
   - [ ] Menú funciona correctamente
   - [ ] Formularios son usables
   - [ ] Imágenes cargan correctamente

### Chrome DevTools:
1. **Network throttling**: Slow 3G
2. **CPU throttling**: 4x slowdown
3. **Dispositivos a probar**:
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - Samsung Galaxy S20 (412x915)
   - iPad (768x1024)
   - Pixel 5 (393x851)

## 🎯 Resolución de Problemas Comunes:

### Problema: "Texto demasiado pequeño"
**Solución**: Aumentar font-size base a 16px mínimo

### Problema: "Elementos clicables muy juntos"  
**Solución**: Añadir margin/padding, min-height: 48px

### Problema: "Contenido más ancho que pantalla"
**Solución**: max-width: 100vw, overflow-x: hidden

### Problema: "Viewport no configurado"
**Solución**: Añadir meta viewport en <head>

### Problema: "Recursos bloqueados"
**Solución**: Verificar robots.txt, CORS headers

## 📈 Monitoreo Continuo:

1. **Google Search Console**: Configurar alertas de usabilidad móvil
2. **Google Analytics**: Revisar métricas móviles
3. **Core Web Vitals**: Monitorear en Search Console
4. **Real User Monitoring**: Implementar RUM

## ✅ Estado Actual:

- [x] Viewport configurado
- [x] CSS responsive implementado  
- [x] Tap targets optimizados
- [x] Fuentes legibles
- [x] Sin scroll horizontal
- [x] Menú móvil funcional
- [x] Structured data añadido
- [x] Performance optimizada

## 📝 Notas:

- El sitio está optimizado para Google Mobile-Friendly Test
- Todos los criterios principales han sido implementados
- Se recomienda hacer testing regular con cada deployment
- Mantener Core Web Vitals monitoreados

---

**Última actualización**: 2025-09-05
**Estado**: ✅ OPTIMIZADO PARA MÓVILES