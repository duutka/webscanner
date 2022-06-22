import os.path
import validators
import socket
import re
from rest_framework import viewsets, status
from rest_framework.response import Response
import advertools as adv
from urllib.parse import urlparse, urljoin

from metadata.serializers import *
from metadata.models import *

from utils.utils import get_all_website_links, get_all_forms, is_valid
from utils.session import init_session
from injections.injections import scan_sql_injection, scan_xss
from seo.seo import check_sitemap, check_robots, get_url_status
from scanner.scanner import do_scan


class KeyWordViewSet(viewsets.ModelViewSet):
    queryset = KeyWord.objects.all()
    serializer_class = KeyWordSerialize


class SeoWarningViewSet(viewsets.ModelViewSet):
    queryset = SeoWarning.objects.all()
    serializer_class = SeoWarningSerialize


class PageAnalyzeViewSet(viewsets.ModelViewSet):
    queryset = PageAnalyze.objects.all()
    serializer_class = PageAnalyzeSerialize


class SeoAnalyzeViewSet(viewsets.ModelViewSet):
    queryset = SeoAnalyze.objects.all()
    serializer_class = SeoAnalyzeSerialize


class SeoViewSet(viewsets.ModelViewSet):
    queryset = Seo.objects.all()
    serializer_class = SeoSerialize


class InjectionViewSet(viewsets.ModelViewSet):
    queryset = Injection.objects.all()
    serializer_class = InjectionSerialize


class BruteForceViewSet(viewsets.ModelViewSet):
    queryset = Port.objects.all()
    serializer_class = BruteForceSerialize


class HostViewSet(viewsets.ModelViewSet):
    queryset = Host.objects.all()
    serializer_class = HostSerialize


class PortViewSet(viewsets.ModelViewSet):
    queryset = Port.objects.all()
    serializer_class = PortSerialize


class ScannerViewSet(viewsets.ModelViewSet):
    queryset = Scanner.objects.all()
    serializer_class = ScannerSerialize

    def create(self, request, *args, **kwargs):
        scanner_data = request.data
        if scanner_data.get('url') is None:
            return Response({'error': 'Отсутствует URL адрес'})

        url = scanner_data.get('url')

        # Валидация URL-а
        if not is_valid(url):
            return Response({'error': 'Невалидный URL адрес'}, status=status.HTTP_400_BAD_REQUEST)

        scanner = Scanner.objects.create(url=url)

        # Инициализируем сессию
        session = init_session(site=url)

        urls = get_all_website_links(session, url)

        # Получение имени домена
        hostname = urlparse(url).hostname

        print("INJECTION.....")
        # Сканирование инъекций
        for url in urls:

            # Получение всех формы
            forms = get_all_forms(session, url)

            xss = scan_xss(session, url, forms)
            sql = scan_sql_injection(session, url, forms)

            if xss is not None and sql is not None:
                injection_data = Injection.objects.create(url=url, xss=xss, sql=sql)
                scanner.injections.add(injection_data)

        print("SEO.........")
        # Сканирование СЕО
        if check_sitemap(session=session, site=url):
            sitemap = True
        else:
            sitemap = False

        if check_robots(session=session, site=url):
            robots = True
        else:
            robots = False

        # seoanalyze = seo_analyze(site=url, sitemap=None)
        # pages = seoanalyze.pages
        # keywords = seoanalyze.keywords

        seo_data = Seo.objects.create(sitemap=sitemap, robots=robots)

        for url in get_url_status(session, urls):
            url_status_data = UrlStatus.objects.create(url=url[0], status=url[1], title=url[2],
                                                       description=url[3], keywords=url[4])
            seo_data.urls.add(url_status_data)

        scanner.seo = seo_data

        # Сканирование инфраструктуры
        ip = socket.gethostbyname(hostname)

        print("NETWORK......")
        port_report = do_scan(ip, "-sV T5 -Pn --script=vulners.nse")

        p21 = False
        p22 = False
        p3306 = False

        for host in port_report.hosts:
            host_data = Host.objects.create(host=host.address, status=host.status)
            for serv in host.services:
                try:
                    output = serv.scripts_results[0]['output']
                except:
                    output = None

                if serv.port == 22:
                    p22 = True
                if serv.port == 21:
                    p21 = True
                if serv.port == 3306:
                    p3306 = True

                port_data = Port.objects.create(protocol=serv.protocol, port=serv.port, service=serv.service,
                                                state=serv.state, cve=output)
                host_data.ports.add(port_data)

            scanner.hosts.add(host_data)

        print("NETWORK BRUTEFORCE SSH.....")
        if p22:
            ssh_report = do_scan(ip,
                                 "--script ssh-brute -p22 --script-args "
                                 "userdb=E:\\Work\\Diploma\\webscaner\\bruteforce-database\\sshusername.txt,"
                                 "passdb=E:\\Work\\Diploma\\webscaner\\bruteforce-database\\sshpassword.txt")
            ssh = ssh_report.hosts[0].scripts_results
        else:
            ssh = None

        if p21:
            print("NETWORK BRUTEFORCE FTP.....")
            ftp_report = do_scan(ip, "--script ftp-brute -p 21")
            ftp = ftp_report.hosts[0].scripts_results
        else:
            ftp = None

        if p3306:
            print("NETWORK BRUTEFORCE MYSQL.....")
            mysql_empty_report = do_scan(ip, "-sV --script=mysql-empty-password")
            mysqlempty = mysql_empty_report.hosts[0].scripts_results

            mysql_report = do_scan(ip, "--script mysql-brute -p3306 --script-args userdb=users.lst, "
                                       "passdb=passwords.lst")
            mysql = mysql_report.hosts[0].scripts_results
        else:
            mysql = None
            mysqlempty = None

        bruteforce = BruteForce.objects.create(ssh=ssh, ftp=ftp, mysql=mysql, mysqlempty=mysqlempty)
        scanner.bruteforce = bruteforce

        print("NETWORK BRUTEFORCE AUTHFINDER.....")
        auth_report = do_scan(ip, "-p80 --script http-auth-finder")
        authfinder = auth_report.hosts[0].scripts_results

        print("NETWORK BRUTEFORCE AUTHBRUTE.....")
        authbrute_report = do_scan(ip, "-p80 --script http-brute")
        authbrute = authbrute_report.hosts[0].scripts_results

        auth_data = Auth.objects.create(authfinder=authfinder, authbrute=authbrute)

        scanner.auth = auth_data

        print("NETWORK BRUTEFORCE HTTPENUM.....")
        httpenum_report = do_scan(ip, "-sV --script http-enum")
        for host in httpenum_report.hosts:
            for serv in host.services:
                if serv.banner_dict:
                    product = serv.banner_dict.get('product')
                    ostype = serv.banner_dict.get('ostype')
                    version = serv.banner_dict.get('version')
                    extrainfo = serv.banner_dict.get('extrainfo')
                    hostname = serv.banner_dict.get('hostname')
                    httpenum = serv.scripts_results

                    httpenum_data = Httpenum.objects.create(product=product, ostype=ostype, version=version,
                                                            extrainfo=extrainfo, hostname=hostname, httpenum=httpenum)

                    scanner.httpenum.add(httpenum_data)

        print("SUCCESS")
        scanner.save()
        serializer = ScannerSerialize(scanner)
        return Response(serializer.data)
