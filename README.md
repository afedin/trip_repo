# WhereFly

Интерактивная карта визовых ограничений для граждан России. Проект построен на Django и использует библиотеку Leaflet для отображения данных на карте.

## Структура репозитория
```
.
├── manage.py               # точка входа Django
├── tripproject/            # настройки и корневые URL
├── mapapp/                 # основное приложение
│   ├── templates/mapapp/   # HTML‑шаблоны
│   ├── static/             # JS/CSS и GeoJSON‑данные
│   └── urls.py, views.py   # роутинг и представления
├── staticfiles/            # собранные статики (collectstatic)
├── docker-compose*.yml     # конфигурации Docker
├── Dockerfile*             # Dockerfile приложения и Nginx
└── requirements.txt        # Python‑зависимости
```

## Запуск проекта

### Через Docker
Для локальной разработки используйте `docker-compose_dev.yml`:

```bash
# Сборка и запуск контейнеров
docker-compose -f docker-compose_dev.yml build
docker-compose -f docker-compose_dev.yml up
```

В продакшн варианте (`docker-compose.yml`) дополнительно поднимаются Nginx и Certbot для HTTPS. Сертификаты должны лежать по пути `/etc/letsencrypt`, который монтируется в контейнер Nginx. В конфигурации упомянут скрипт `reload-nginx.sh` для автоматического обновления сертификатов (его нужно добавить вручную).

### Без Docker
Для локального запуска достаточно Python 3.8:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Сайт будет доступен на `http://localhost:8000/`.

## Статические данные
В каталоге `mapapp/static/data/` находятся файлы `1.geojson`, `2.geojson`, …, `262.geojson` — полигоны стран с атрибутом `legend`. Скрипт `map.js` загружает их при инициализации карты. После выполнения `collectstatic` файлы копируются в `staticfiles/` и раздаются Nginx.

## Тестирование
Тесты JavaScript расположены в `staticfiles/mapapp/map.test.js` и запускаются через Jest. В Python‑части тесты пока не реализованы (в `mapapp/tests.py` заглушка).

```bash
# пример запуска JS‑тестов, если установлен node и jest
npm install
yarn test   # или `npx jest`
```

## Дополнительные материалы
- `blog.html` и `contacts.html` — заготовки страниц, которые можно заполнить контентом.
- Для деплоя через Docker используется Gunicorn и Nginx.

