from bs4 import BeautifulSoup


def check_sitemap(session, site):
    response = session.get(site + '/sitemap.xml')
    if response.status_code == '200':
        return True
    else:
        return False


def check_robots(session, site):
    response = session.get(site + '/robots.txt')
    if response.status_code == '200':
        return True
    else:
        return False


def get_url_status(session, urls):
    lists = []
    for url in urls:
        try:
            res = session.get(url)
            status = res.status_code

            soup = BeautifulSoup(res.content, "html.parser")
            if soup.find("title") is None:
                title = False
            else:
                title = True

            meta = soup.find_all('meta')

            description = False
            keywords = False

            for tag in meta:
                if 'name' in tag.attrs.keys() and tag.attrs['name'].strip().lower() in 'description':
                    description = True
                if 'name' in tag.attrs.keys() and tag.attrs['name'].strip().lower() in 'keywords':
                    keywords = True

            lists.append((url, status, title, description, keywords))

        except Exception as e:
            lists.append((url, str(e), False, False, False))
            print(url + "\tNA FAILED TO CONNECT\t" + str(e))
            continue
    return lists
