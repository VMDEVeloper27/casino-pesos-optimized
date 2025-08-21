# 📁 СТРУКТУРА ПРОЕКТА CASINOSPESOS

## 🎨 ФРОНТЕНД

### `/src/app/[locale]/` - Публичные страницы с поддержкой языков (es/en)

- **`page.tsx`** - Главная страница сайта
- **`/casinos/`** - Страницы казино
  - `page.tsx` - Список всех казино
  - `[id]/page.tsx` - Детальная страница казино
- **`/bonos/`** - Бонусы
  - `page.tsx` - Все бонусы
  - `[category]/page.tsx` - Категории бонусов (sin-deposito, bienvenida и т.д.)
- **`/juegos/`** - Игры
  - `page.tsx` - Каталог игр
  - `[slug]/page.tsx` - Страница конкретной игры
- **`/comparar/`** - Сравнение казино
- **`/guias/`** - Гайды и статьи
  - `[slug]/page.tsx` - Детальная страница гайда
- **`/blog/`** - Блог
  - `[slug]/page.tsx` - Статья блога
- **`/dashboard/`** - Личный кабинет пользователя
  - `/favorites/` - Избранные казино и игры
  - `/settings/` - Настройки профиля
- **`/auth/`** - Авторизация
  - `/signin/` - Вход
  - `/signup/` - Регистрация

### `/src/app/admin/` - Админ панель (темная тема)

- **`page.tsx`** - Дашборд админки
- **`/casinos/`** - Управление казино
  - `new/` - Добавить казино
  - `[id]/edit/` - Редактировать казино
- **`/games/`** - Управление играми
  - `new/` - Добавить игру
  - `[id]/edit/` - Редактировать игру
- **`/blog/`** - Управление блогом
- **`/media/`** - Медиа галерея
- **`/settings/`** - Настройки сайта
- **`/audit-log/`** - Логи действий

## 🔧 BACKEND (API Routes)

### `/src/app/api/` - Все API эндпоинты

#### Публичные API:
- **`/auth/`** - NextAuth авторизация
  - `[...nextauth]/route.ts` - Конфигурация NextAuth
  - `/register/` - Регистрация
  - `/reset-password/` - Сброс пароля
- **`/casinos/`** - Получение данных казино
- **`/games/`** - Получение игр
- **`/blog/`** - Статьи блога
- **`/subscribe/`** - Подписка на рассылку
- **`/search/`** - Поиск по сайту

#### Админские API:
- **`/admin/casinos/`** - CRUD казино
  - `[id]/route.ts` - Обновление/удаление
  - `[id]/logo/route.ts` - Загрузка логотипа
- **`/admin/games/`** - CRUD игр
  - `import/route.ts` - Импорт игр
- **`/admin/media/`** - Загрузка медиа на Supabase
- **`/admin/stats/`** - Статистика

#### Версионированные API:
- **`/v2/`** - Новая версия API
  - `/casinos/` - Работа с Supabase
  - `/games/` - Управление играми

## 🎨 КОМПОНЕНТЫ

### `/src/components/`

- **`/casino/`** - Компоненты казино
  - `CasinoCard.tsx` - Карточка казино
  - `CasinoComparisonTable.tsx` - Таблица сравнения
- **`/games/`** - Компоненты игр
  - `GameCard.tsx` - Карточка игры
  - `GameFilters.tsx` - Фильтры игр
- **`/ui/`** - UI компоненты
  - `CasinoLogo.tsx` - Логотип с зеленым фоном
  - `Button.tsx`, `Card.tsx` и т.д.
- **`/admin/`** - Админские компоненты
  - `ImageSelector.tsx` - Выбор изображений
  - `ImageSelectorModal.tsx` - Модалка галереи
- **`/auth/`** - Компоненты авторизации
- **`Newsletter.tsx`** - Подписка на рассылку
- **`Header.tsx`**, **`Footer.tsx`** - Шапка и подвал

## 📚 БИБЛИОТЕКИ И УТИЛИТЫ

### `/src/lib/`

- **`supabase.ts`** - Клиент Supabase
- **`casino-database.ts`** - Старая БД казино (JSON)
- **`casino-database-supabase.ts`** - Новая БД (Supabase)
- **`auth.ts`** - Конфигурация NextAuth
- **`rate-limit.ts`** - Ограничение запросов
- **`email.ts`** - Отправка email через Resend
- **`utils.ts`** - Вспомогательные функции

## 🗄️ БАЗА ДАННЫХ (Supabase)

### Таблицы:
- **`casinos`** - Все казино
- **`games`** - Игры
- **`blog_posts`** - Статьи блога
- **`users`** - Пользователи
- **`favorites`** - Избранное пользователей
- **`subscribers`** - Подписчики рассылки
- **`audit_log`** - Логи действий

## ⚙️ КОНФИГУРАЦИЯ

- **`next.config.ts`** - Настройки Next.js
- **`tailwind.config.ts`** - Настройки Tailwind CSS
- **`middleware.ts`** - Middleware для роутинга и авторизации
- **`.env.local`** - Переменные окружения (API ключи)
- **`package.json`** - Зависимости проекта

## 🌍 ИНТЕРНАЦИОНАЛИЗАЦИЯ

### `/src/messages/`
- **`es.json`** - Испанские переводы
- **`en.json`** - Английские переводы

## 📦 СТАТИЧЕСКИЕ ФАЙЛЫ

### `/public/`
- **`/images/`** - Изображения
  - `/casinos/` - Логотипы казино
  - `/games/` - Превью игр
  - `/blog/` - Изображения для блога
- **`/fonts/`** - Шрифты
- **`favicon.ico`**, **`robots.txt`**, **`sitemap.xml`**

## 🔐 АВТОРИЗАЦИЯ
- **NextAuth** - для входа/регистрации
- **Роли**: `user`, `editor`, `admin`
- **Провайдеры**: Email/Password, Google (можно добавить)

## 💾 ХРАНИЛИЩЕ
- **Supabase Storage** - для изображений
- **Buckets**: `casino-logos`, `game-images`, `blog-images`

## 🚀 ДЕПЛОЙ
- **Vercel** - хостинг
- **GitHub** - репозиторий
- **Автодеплой** при пуше в main

## 🛠️ ОСНОВНЫЕ ТЕХНОЛОГИИ

- **Next.js 15.4.6** - App Router
- **TypeScript** - типизация
- **Tailwind CSS** - стили
- **Supabase** - БД + Storage
- **NextAuth** - авторизация
- **Resend** - отправка email
- **Font Awesome** - иконки
- **React Hook Form** - формы
- **Zod** - валидация
- **next-intl** - интернационализация

## 📝 КЛЮЧЕВЫЕ ОСОБЕННОСТИ

1. **Мультиязычность** - испанский и английский
2. **SEO оптимизация** - meta теги, structured data, sitemap
3. **Адаптивный дизайн** - mobile-first подход
4. **Темная админка** - на `/admin`
5. **Медиа галерея** - загрузка на Supabase Storage
6. **Избранное** - для авторизованных пользователей
7. **Рейтинги и отзывы** - система оценок
8. **Фильтры и поиск** - по казино и играм
9. **Email рассылка** - через Resend
10. **Аудит лог** - отслеживание действий в админке

## 🔄 РАБОЧИЙ ПРОЦЕСС

1. **Разработка** - `npm run dev` на localhost:3006
2. **Коммит** - в GitHub репозиторий
3. **Пуш в main** - автодеплой на Vercel
4. **Продакшн** - https://casinospesos.com

## 📊 ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ (.env.local)

```
NEXTAUTH_URL=
NEXTAUTH_SECRET=
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```