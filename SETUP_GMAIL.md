# Настройка отправки через Gmail

## Шаги для настройки Gmail:

1. **Включите двухфакторную аутентификацию в Gmail:**
   - Зайдите в https://myaccount.google.com/security
   - Включите "Двухэтапная аутентификация"

2. **Создайте пароль приложения:**
   - Перейдите на https://myaccount.google.com/apppasswords
   - Выберите "Почта" и "Другое"
   - Введите название "CasinosPesos"
   - Скопируйте сгенерированный пароль (16 символов)

3. **Добавьте в .env.local:**
   ```
   GMAIL_USER=albertokiddi1992@gmail.com
   GMAIL_APP_PASSWORD=ваш-16-значный-пароль
   ```

4. **Установите nodemailer:**
   ```bash
   npm install nodemailer @types/nodemailer
   ```

После этого письма будут отправляться напрямую с вашего Gmail!