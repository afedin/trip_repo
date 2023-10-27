
# tripproject/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.sitemaps.views import sitemap
from django.views.static import serve
from django.conf import settings
from mapapp.sitemaps import StaticViewSitemap

sitemaps = {
    'static': StaticViewSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('map/', include('mapapp.urls')),
    path('', include('mapapp.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    re_path(r'^1q5ki2uavdjmt7s0zi8131pb54ryfq3hpjdshfpw3P6dd2\.txt$', serve, {
        'path': '1q5ki2uavdjmt7s0zi8131pb54ryfq3hpjdshfpw3P6dd2.txt',
        'document_root': settings.STATIC_ROOT,
    }),
    re_path(r'^ads\.txt$', serve, {
        'path': 'ads.txt',
        'document_root': settings.STATIC_ROOT,
    }),  # Добавленный маршрут для файла ads.txt
]


