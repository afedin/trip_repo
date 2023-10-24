# urls.py

from django.urls import path, re_path
from django.views.static import serve
from django.conf import settings
from . import views  # Импорт ваших представлений

urlpatterns = [
    path('', views.map, name='map'),
    re_path(r'^robots.txt$', serve, {
        'path': 'robots.txt',
        'document_root': settings.STATIC_ROOT,
    }),
]

