import requests
import requests.adapters
from requests.packages.urllib3.util.retry import Retry
import urllib.robotparser


def check_robots(site):
    response = requests.get(site + '/robots.txt')
    if response.status_code == '200':
        return True
    else:
        return False


def init_session(site):
    if check_robots(site):
        rp = urllib.robotparser.RobotFileParser()
        rp.set_url(site + '/robots.txt')
        rp.read()
        crawl_delay = rp.crawl_delay("*")

        session = requests.Session()
        retry = Retry(connect=3, backoff_factor=crawl_delay)
        adapter = requests.adapters.HTTPAdapter(pool_connections=100, pool_maxsize=100, max_retries=retry)
        session.mount('http://', adapter)
        session.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, " \
                                        "like Gecko)" \
                                        " Chrome/83.0.4103.106 Safari/537.36 "
    else:
        session = requests.Session()
        retry = Retry(connect=3, backoff_factor=0.5)
        adapter = requests.adapters.HTTPAdapter(pool_connections=100, pool_maxsize=100, max_retries=retry)
        session.mount('http://', adapter)
        session.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, " \
                                        "like Gecko)" \
                                        " Chrome/83.0.4103.106 Safari/537.36 "
    return session
