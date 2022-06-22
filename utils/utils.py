import re

from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup


def is_valid(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://'  # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|'  # domain...
        r'localhost|'  # localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|'  # ...or ipv4
        r'\[?[A-F0-9]*:[A-F0-9:]+\]?)'  # ...or ipv6
        r'(?::\d+)?'  # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)

    return re.match(regex, url) is not None


def get_all_website_links(session, url):
    urls = set()
    internal_urls = set()
    external_urls = set()

    domain_name = urlparse(url).netloc
    soup = BeautifulSoup(session.get(url).content, "html.parser")
    for a_tag in soup.findAll("a"):
        href = a_tag.attrs.get("href")
        if href == "" or href is None:
            continue
        href = urljoin(url, href)
        parsed_href = urlparse(href)
        href = parsed_href.scheme + "://" + parsed_href.netloc + parsed_href.path
        if not is_valid(href):
            continue
        if href in internal_urls:
            continue
        if domain_name not in href:
            if href not in external_urls:
                external_urls.add(href)
                urls.add(href)
            continue
        urls.add(href)
        internal_urls.add(href)
    return urls


def get_all_forms(session, url):
    """Возвращает все HTML-формы на странице URL"""
    try:
        soup = BeautifulSoup(session.get(url).content, "html.parser")
        return soup.find_all("form")
    except:
        return None
