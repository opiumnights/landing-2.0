# Mental Manager — Инструкция по размещению на хостинге

## Структура проекта

```
lending/
├── index.html    — Главная страница
├── style.css     — Стили (glassmorphism, анимации)
├── script.js     — Скрипты (scroll reveal, parallax, counters)
└── DEPLOY.md     — Эта инструкция
```

---

## Вариант 1: GitHub Pages (бесплатно)

### 1. Инициализация Git-репозитория

```bash
cd lending
git init
git add .
git commit -m "Initial commit: Mental Manager landing page"
```

### 2. Создание репозитория на GitHub

1. Перейдите на https://github.com/new
2. Введите имя репозитория (например, `mental-manager`)
3. Нажмите **Create repository**

### 3. Подключение и отправка

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/mental-manager.git
git branch -M main
git push -u origin main
```

### 4. Включение GitHub Pages

1. Перейдите в **Settings** → **Pages**
2. В разделе **Source** выберите **Deploy from a branch**
3. Выберите ветку `main` и папку `/ (root)`
4. Нажмите **Save**

Через 1-2 минуты сайт будет доступен по адресу:
```
https://ВАШ_ЛОГИН.github.io/mental-manager/
```

---

## Вариант 2: Обычный хостинг (VPS/shared hosting)

### 1. Инициализация Git

```bash
cd lending
git init
git add .
git commit -m "Initial commit: Mental Manager landing page"
```

### 2. Подключение к серверу

```bash
# Добавьте удалённый репозиторий на сервере
git remote add production ssh://user@ваш-сервер.com/var/www/mental-manager.git

# Отправьте код
git push production main
```

### Альтернатива: загрузка через SFTP/FTP

Если Git на сервере недоступен, загрузите файлы вручную:

```bash
# Через scp
scp -r index.html style.css script.js user@ваш-сервер.com:/var/www/html/

# Или через rsync
rsync -avz --progress ./ user@ваш-сервер.com:/var/www/html/
```

---

## Вариант 3: Netlify (бесплатно, с автодеплоем)

### Способ A: Через GitHub

1. Отправьте код на GitHub (см. Вариант 1, шаги 1-3)
2. Перейдите на https://app.netlify.com
3. Нажмите **Add new site** → **Import an existing project**
4. Выберите ваш GitHub-репозиторий
5. Нажмите **Deploy site**

### Способ B: Drag & Drop

1. Перейдите на https://app.netlify.com/drop
2. Перетащите папку `lending` в окно браузера
3. Сайт будет развёрнут за секунды

---

## Вариант 4: Vercel (бесплатно)

```bash
# Установите Vercel CLI
npm install -g vercel

# Разверните
cd lending
vercel
```

Следуйте инструкциям в терминале. Сайт будет развёрнут автоматически.

---

## Привязка собственного домена

### GitHub Pages
1. **Settings** → **Pages** → **Custom domain**
2. Введите ваш домен (например, `mentalmanager.ru`)
3. Добавьте DNS-запись у регистратора:
   - Тип: `CNAME`
   - Имя: `www`
   - Значение: `ВАШ_ЛОГИН.github.io`

### Netlify / Vercel
1. В панели управления выберите **Domain settings**
2. Нажмите **Add custom domain**
3. Следуйте инструкциям для настройки DNS

---

## Обновление сайта

После внесения изменений:

```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

При использовании GitHub Pages, Netlify или Vercel обновления применятся автоматически через 1-2 минуты.
