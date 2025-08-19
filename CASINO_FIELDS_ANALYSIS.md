# Análisis de Campos de Casino - Discrepancias entre BD y Formularios

## 🔴 PROBLEMAS CRÍTICOS ENCONTRADOS

### 1. **Nombres de campos incorrectos en formularios**

| Campo en Formulario | Campo Correcto en BD | Estado |
|-------------------|---------------------|---------|
| `affiliate_link` | `affiliateLink` | ❌ Incorrecto |
| `is_featured` | `isFeatured` | ❌ Incorrecto |
| `payment_methods` | Relación `CasinoPaymentMethod` | ❌ Diseño incorrecto |
| `withdrawal_time` | No existe en BD | ❌ Campo extra |

### 2. **Campos de Bonus almacenados incorrectamente**

Los siguientes campos están en el formulario del Casino pero deberían estar en la tabla `Bonus` separada:

- `bonus_type` → `Bonus.type`
- `bonus_amount` → `Bonus.amount`
- `bonus_percentage` → `Bonus.percentage`
- `bonus_free_spins` → `Bonus.freeSpins`
- `bonus_min_deposit` → `Bonus.minDeposit`
- `bonus_wagering` → `Bonus.wageringRequirement`
- `bonus_code` → `Bonus.bonusCode`

### 3. **Campos de Juegos almacenados incorrectamente**

- `games_total` → Debería calcularse sumando `Game.count`
- `games_slots` → Debería ser `Game` con `category=SLOTS`
- `games_live` → Debería ser `Game` con `category=LIVE_CASINO`
- `games_table` → Debería ser `Game` con `category=TABLE_GAMES`

### 4. **Campos faltantes en los formularios**

Campos importantes en la BD que NO están en los formularios:

#### Información básica:
- `websiteUrl` - URL del sitio web del casino
- `description` - Descripción del casino
- `descriptionEs` - Descripción en español
- `descriptionEn` - Descripción en inglés

#### Soporte:
- `supportEmail` - Email de soporte
- `supportPhone` - Teléfono de soporte
- `liveChatAvailable` - Si tiene chat en vivo
- `supportHours` - Horario de soporte

#### Idiomas y países:
- `languages` - Idiomas disponibles
- `supportedCountries` - Países soportados
- `restrictedCountries` - Países restringidos

#### SEO:
- `metaTitle` - Título para SEO
- `metaDescription` - Descripción para SEO
- `metaKeywords` - Palabras clave para SEO

#### Estado:
- `isActive` - Si está activo (usa `status` en su lugar)
- `priority` - Prioridad de ordenamiento
- `verifiedDate` - Fecha de verificación
- `publishedAt` - Fecha de publicación

### 5. **Pros y Contras - Estructura incorrecta**

- En el formulario: Array simple de strings
- En la BD: Tablas relacionadas `CasinoPro` y `CasinoCon` con campos multiidioma

## 📋 SOLUCIONES RECOMENDADAS

### Opción 1: Corregir los formularios existentes (Recomendado)

1. **Actualizar nombres de campos** para que coincidan con la BD
2. **Agregar campos faltantes** al formulario
3. **Separar la creación de Bonus** en una sección aparte
4. **Separar la gestión de Juegos** en una sección aparte
5. **Usar relaciones correctas** para PaymentMethods

### Opción 2: Modificar el esquema de la BD

1. Agregar campos faltantes a la BD
2. Simplificar estructura de bonus y juegos
3. **NO RECOMENDADO** - Perdería la normalización actual

## 🛠️ CAMBIOS NECESARIOS EN EL CÓDIGO

### 1. En `/admin/casinos/new/page.tsx`:

```typescript
// Cambiar esto:
affiliate_link: string;
is_featured: boolean;

// Por esto:
affiliateLink: string;
isFeatured: boolean;
```

### 2. Agregar campos faltantes:

```typescript
interface CasinoFormData {
  // ... campos existentes ...
  
  // Agregar estos:
  websiteUrl: string;
  description: string;
  descriptionEs: string;
  descriptionEn: string;
  
  supportEmail: string;
  supportPhone: string;
  liveChatAvailable: boolean;
  supportHours: string;
  
  languages: string[];
  supportedCountries: string[];
  restrictedCountries: string[];
  
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  
  isActive: boolean;
  priority: number;
}
```

### 3. Crear sección separada para Bonus:

```typescript
// Nueva sección en el formulario o página separada
interface BonusFormData {
  casinoId: string;
  type: 'WELCOME' | 'NO_DEPOSIT' | 'RELOAD' | etc;
  name: string;
  nameEs?: string;
  nameEn?: string;
  amount?: number;
  percentage?: number;
  maxBonus?: number;
  minDeposit?: number;
  freeSpins?: number;
  wageringRequirement?: number;
  bonusCode?: string;
  termsAndConditions?: string;
  validUntil?: Date;
  isExclusive: boolean;
  isActive: boolean;
}
```

### 4. Actualizar el API endpoint `/api/admin/casinos`:

El endpoint debe manejar correctamente:
- Creación del Casino principal
- Creación de Bonus relacionados (en tabla separada)
- Creación de Games relacionados (en tabla separada)
- Relación con PaymentMethods existentes
- Creación de Pros/Cons en tablas separadas

## 📊 IMPACTO EN LA BASE DE DATOS

**No se requieren cambios en el esquema de Prisma** si se implementan las correcciones en los formularios.

La estructura actual de la BD está bien normalizada y sigue las mejores prácticas.

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Corregir nombres de campos en formulario de nuevo casino
- [ ] Corregir nombres de campos en formulario de edición
- [ ] Agregar campos faltantes a ambos formularios
- [ ] Crear sección/página para gestión de Bonus
- [ ] Crear sección/página para gestión de Juegos
- [ ] Actualizar API para manejar relaciones correctamente
- [ ] Actualizar validaciones del lado del servidor
- [ ] Migrar datos existentes si es necesario
- [ ] Probar creación y edición completa

## 🎯 PRIORIDAD DE CAMBIOS

1. **URGENTE**: Corregir nombres de campos (affiliate_link → affiliateLink, etc.)
2. **IMPORTANTE**: Separar Bonus en su propia gestión
3. **IMPORTANTE**: Agregar campos de soporte y SEO
4. **NORMAL**: Mejorar gestión de juegos
5. **OPCIONAL**: Agregar validaciones adicionales