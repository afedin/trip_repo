# mapapp/sitemaps.py

from django.contrib.sitemaps import Sitemap

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = 'daily'

    def items(self):
        # Возвращает список из одного URL
        return ['home']

    def location(self, item):
        # Возвращает путь к URL
        return '/'
