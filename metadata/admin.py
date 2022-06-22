from django.contrib import admin
from .models import *


class KeyWordAdmin(admin.ModelAdmin):
    class Meta:
        model = KeyWord


admin.site.register(KeyWord, KeyWordAdmin)


class SeoWarningAdmin(admin.ModelAdmin):
    class Meta:
        model = SeoWarning


admin.site.register(SeoWarning, SeoWarningAdmin)


class PageAnalyzeAdmin(admin.ModelAdmin):
    class Meta:
        model = PageAnalyze


admin.site.register(PageAnalyze, PageAnalyzeAdmin)


class SeoAnalyzeAdmin(admin.ModelAdmin):
    class Meta:
        model = SeoAnalyze


admin.site.register(SeoAnalyze, SeoAnalyzeAdmin)


class SeoAdmin(admin.ModelAdmin):
    class Meta:
        model = Seo


admin.site.register(Seo, SeoAdmin)


class InjectionAdmin(admin.ModelAdmin):
    class Meta:
        model = Injection


admin.site.register(Injection, InjectionAdmin)


class ScannerAdmin(admin.ModelAdmin):
    class Meta:
        model = Scanner


admin.site.register(Scanner, ScannerAdmin)


class PortAdmin(admin.ModelAdmin):
    class Meta:
        model = Port


admin.site.register(Port, PortAdmin)


class HostAdmin(admin.ModelAdmin):
    class Meta:
        model = Host


admin.site.register(Host, HostAdmin)
