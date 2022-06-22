from django.db import models


class KeyWord(models.Model):
    word = models.TextField(blank=False, verbose_name="Слово")
    count = models.IntegerField(blank=False, verbose_name="Количество слов")

    class Meta:
        verbose_name = "Счетчик слово"
        verbose_name_plural = "Счетчики слов"


class SeoWarning(models.Model):
    message = models.TextField(blank=False, verbose_name="Сообщение об ошибке")

    class Meta:
        verbose_name = "Предупреждение СЕО"
        verbose_name_plural = "Предупреждения СЕО"


class PageAnalyze(models.Model):
    url = models.TextField(blank=False, verbose_name="url")
    title = models.TextField(blank=False, verbose_name="заголовок")
    description = models.TextField(blank=False, verbose_name="описание")
    seowarnings = models.ManyToManyField(SeoWarning, blank=False, verbose_name="СЕО ошибки")
    headings = models.TextField(blank=False, verbose_name="Информация о тегах h1-h6")

    class Meta:
        verbose_name = "Информация о странице"
        verbose_name_plural = "Информация о страницах"


class SeoAnalyze(models.Model):
    keywords = models.ManyToManyField(KeyWord, blank=True, verbose_name="Информация о всех словах")
    pages = models.ManyToManyField(PageAnalyze, blank=True, verbose_name="Информация о сео на всех страницах")

    class Meta:
        verbose_name = "Результат СЕО сканирования страниц"
        verbose_name_plural = "Результаты СЕО сканирования страницы"


class UrlStatus(models.Model):
    status = models.TextField(blank=False, null=True, verbose_name="Статус")
    title = models.BooleanField(blank=False, null=True, verbose_name="Тег title")
    description = models.BooleanField(blank=False, null=True, verbose_name="Тег description")
    keywords = models.BooleanField(blank=False, null=True, verbose_name="Тег keywords")
    url = models.TextField(blank=False, verbose_name="URL")


class Seo(models.Model):
    sitemap = models.BooleanField(blank=False, verbose_name="Проверка sitemap")
    robots = models.BooleanField(blank=False, verbose_name="Проверка robots")
    urls = models.ManyToManyField(UrlStatus, blank=False, verbose_name="Сканирование ссылок")

    class Meta:
        verbose_name = "Результат СЕО сканирования"
        verbose_name_plural = "Результаты СЕО сканирования"


class Port(models.Model):
    protocol = models.TextField(blank=False, verbose_name="Протокол")
    port = models.IntegerField(blank=False, verbose_name="Номер порта")
    service = models.TextField(blank=False, verbose_name="Сервис")
    state = models.TextField(blank=False, verbose_name="Статус")
    cve = models.TextField(blank=False, null=True, verbose_name="CVE")

    class Meta:
        verbose_name = "Порт хоста"
        verbose_name_plural = "Порты хоста"


class Httpenum(models.Model):
    product = models.TextField(blank=False, verbose_name="Название продукта")
    ostype = models.TextField(blank=False, null=True, verbose_name="Тип ОС")
    version = models.TextField(blank=False, null=True, verbose_name="Версия")
    extrainfo = models.TextField(blank=False, null=True, verbose_name="Дополнительная информация")
    hostname = models.TextField(blank=False, null=True, verbose_name="Имя хоста")
    httpenum = models.TextField(blank=False, verbose_name="httpenum")

    class Meta:
        verbose_name = "HTTPENUM"
        verbose_name_plural = "HTTPENUMS"


class Auth(models.Model):
    authfinder = models.TextField(blank=False, verbose_name="Формы авторизации")
    authbrute = models.TextField(blank=False, verbose_name="Результаты bruteforce")


class Host(models.Model):
    host = models.TextField(blank=False, verbose_name="Хост")
    status = models.TextField(blank=False, verbose_name="Статус хоста")
    ports = models.ManyToManyField(Port, blank=False, verbose_name="Порты")

    class Meta:
        verbose_name = "Хост"
        verbose_name_plural = "Хосты"


class BruteForce(models.Model):
    ssh = models.TextField(blank=False, null=True, verbose_name="ssh")
    ftp = models.TextField(blank=False, null=True, verbose_name="ftp")
    mysql = models.TextField(blank=False, null=True, verbose_name="mysql")
    mysqlempty = models.TextField(blank=False, null=True, verbose_name="mysql empty")


class Injection(models.Model):
    url = models.TextField(blank=False, verbose_name="Ссылка")
    xss = models.BooleanField(blank=False, verbose_name="Результат XSS")
    sql = models.BooleanField(blank=False, verbose_name="Результат SQL Injection")

    class Meta:
        verbose_name = "Результаты сканирования инъекций на странице"
        verbose_name_plural = "Результаты сканирования инъекций на страницах"


class Scanner(models.Model):
    url = models.TextField(blank=False, verbose_name="Ссылка")
    injections = models.ManyToManyField(Injection, blank=False, verbose_name="Результаты сканирования инъекций")
    seo = models.ForeignKey(Seo, on_delete=models.CASCADE, null=True, blank=False,
                            verbose_name="Результаты сео сканирования")
    hosts = models.ManyToManyField(Host, blank=False, verbose_name="Результаты сканирования хостов")
    bruteforce = models.ForeignKey(BruteForce, on_delete=models.CASCADE, null=True, blank=False,
                                   verbose_name="Результаты подбора логинов и паролей "
                                                "для хостов")
    auth = models.ForeignKey(Auth, on_delete=models.CASCADE, null=True, blank=False,  verbose_name="Результаты "
                                                                                                   "сканирование "
                                                                                                   "аутентификации")
    httpenum = models.ManyToManyField(Httpenum, blank=False, verbose_name="Результаты сканирование конфигурации")

    class Meta:
        verbose_name = "Результат сканирования"
        verbose_name_plural = "Результаты сканирования"
