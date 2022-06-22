from rest_framework import serializers

from metadata.models import *


class KeyWordSerialize(serializers.ModelSerializer):
    class Meta:
        model = KeyWord
        fields = "__all__"


class SeoWarningSerialize(serializers.ModelSerializer):
    class Meta:
        model = SeoWarning
        fields = "__all__"


class PageAnalyzeSerialize(serializers.ModelSerializer):
    class Meta:
        model = PageAnalyze
        fields = "__all__"


class SeoAnalyzeSerialize(serializers.ModelSerializer):
    class Meta:
        model = SeoAnalyze
        fields = "sitemap, robots, urls"


class UrlStatusSerialize(serializers.ModelSerializer):
    class Meta:
        model = UrlStatus
        fields = "__all__"


class SeoSerialize(serializers.ModelSerializer):
    urls = UrlStatusSerialize(many=True)

    class Meta:
        model = Seo
        fields = "__all__"


class HttpenumSerialize(serializers.ModelSerializer):
    class Meta:
        model = Httpenum
        fields = "__all__"


class PortSerialize(serializers.ModelSerializer):
    class Meta:
        model = Port
        fields = "__all__"


class HostSerialize(serializers.ModelSerializer):
    ports = PortSerialize(many=True)

    class Meta:
        model = Host
        fields = "__all__"


class BruteForceSerialize(serializers.ModelSerializer):
    class Meta:
        model = BruteForce
        fields = "__all__"


class AuthSerialize(serializers.ModelSerializer):
    class Meta:
        model = Auth
        fields = "__all__"


class InjectionSerialize(serializers.ModelSerializer):
    class Meta:
        model = Injection
        fields = "__all__"


class ScannerSerialize(serializers.ModelSerializer):
    injections = InjectionSerialize(many=True)
    hosts = HostSerialize(many=True)
    bruteforce = BruteForceSerialize(many=False)
    seo = SeoSerialize(many=False)
    httpenum = HttpenumSerialize(many=True)
    auth = AuthSerialize(many=False)

    class Meta:
        model = Scanner
        fields = "__all__"
