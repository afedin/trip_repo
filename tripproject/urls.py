"""
URL configuration for tripproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# tripproject/urls.py

from django.contrib import admin
from django.urls import path, include, re_path  # Добавьте re_path
from django.contrib.sitemaps.views import sitemap
from django.views.static import serve  # Добавьте этот импорт
from django.conf import settings  # Добавьте этот импорт
from mapapp.sitemaps import StaticViewSitemap  # импортирование вашего класса Sitemap

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('map/', include('mapapp.urls')),
    path('', include('mapapp.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),  # новый маршрут для sitemap.xml
    re_path(r'^1q5ki2uavdjmt7s0zi8131pb54ryfq3hpjdshfpw3P6dd2\.txt$', serve, {
        'path': '1q5ki2uavdjmt7s0zi8131pb54ryfq3hpjdshfpw3P6dd2.txt',
        'document_root': settings.STATIC_ROOT,
    }),  # Добавьте этот маршрут для статического файла с ключом
]

