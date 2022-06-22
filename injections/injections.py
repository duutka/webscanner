from urllib.parse import urljoin
from pprint import pprint
import requests


def submit_form(session, form_details, url, value):
    """
    Отправляет форму
    Params:
        form_details (list): информация о форме
        url (str): URL
        value (str): это будет заменено на все текстовые и поисковые входы
    Возвращает HTTP ответ после отправки формы
    """
    try:
        target_url = urljoin(url, form_details["action"])
        inputs = form_details["inputs"]
        data = {}
        for input in inputs:
            if input["type"] == "text" or input["type"] == "search":
                input["value"] = value
            input_name = input.get("name")
            input_value = input.get("value")
            if input_name and input_value:
                data[input_name] = input_value

        if form_details["method"] == "post":
            return session.post(target_url, data=data)
        else:
            return session.get(target_url, params=data)
    except requests.exceptions.ConnectionError:
        return None
        pass


def scan_xss(session, url, forms):
    """
    Params:
        'url': URL
    Выводит все формы, уязвимые для XSS, и
    возвращает True, если кто-то из них уязвим, иначе False
    """
    try:
        if forms is not None:
            js_script = "<Script>alert('hi')</scripT>"
            is_vulnerable = False
            for form in forms:
                form_details = get_form_details(form)
                if submit_form(session, form_details, url, js_script).content is not None:
                    content = submit_form(session, form_details, url, js_script).content.decode()
                    if js_script in content:
                        is_vulnerable = True
                return is_vulnerable
    except Exception:
        pass


def get_form_details(form):
    """
    Извлекает всю информацию о HTML-форме
    """
    details = {}
    try:
        action = form.attrs.get("action").lower()
    except:
        action = None
    method = form.attrs.get("method", "get").lower()
    inputs = []
    for input_tag in form.find_all("input"):
        input_type = input_tag.attrs.get("type", "text")
        input_name = input_tag.attrs.get("name")
        input_value = input_tag.attrs.get("value", "")
        inputs.append({"type": input_type, "name": input_name, "value": input_value})
    details["action"] = action
    details["method"] = method
    details["inputs"] = inputs
    return details


def is_vulnerable(response):
    """Проверка на уязвимость страницы"""
    errors = {
        # MySQL
        "you have an error in your sql syntax;",
        "warning: mysql",
        # SQL Server
        "unclosed quotation mark after the character string",
        # Oracle
        "quoted string not properly terminated",
    }
    try:
        for error in errors:
            if error in response.content.decode().lower():
                return True
        return False
    except:
        return False


def scan_sql_injection(session, url, forms):
    try:
        for c in "\"'":
            new_url = f"{url}{c}"
            print("[!] Сканируем", new_url)
            res = session.get(new_url)
            if is_vulnerable(res):
                print("[+] SQL Injection обнаружена на странице:", new_url)
                return True
        print(f"[+] Обнаружено {len(forms)} форм на странице {url}.")
        for form in forms:
            form_details = get_form_details(form)
            for c in "\"'":
                data = {}
                for input_tag in form_details["inputs"]:
                    if input_tag["type"] == "hidden" or input_tag["value"]:
                        try:
                            data[input_tag["name"]] = input_tag["value"] + c
                        except:
                            pass
                    elif input_tag["type"] != "submit":
                        data[input_tag["name"]] = f"test{c}"
                url = urljoin(url, form_details["action"])
                if form_details["method"] == "post":
                    res = session.post(url, data=data)
                elif form_details["method"] == "get":
                    res = session.get(url, params=data)
                if is_vulnerable(res):
                    print("[+] SQL Injection обнаружена на странице:", url)
                    print("[+] Форма:")
                    pprint(form_details)
                    return True
        return False
    except requests.exceptions.ConnectionError:
        return False
