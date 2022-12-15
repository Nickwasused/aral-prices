#!/bin/python3
from datetime import datetime
from pathlib import Path
from json import load

empty_sitemap_start = """<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">"""

empty_sitemap_end = "</urlset>"

empty_site = """<url>
    <loc>{}</loc>
    <lastmod>{}</lastmod>
</url>"""

base_url = "https://aral.nickwasused.com/station/{}"

def load_json(file):
    f = open(file, encoding="utf8")
    return load(f)

station_path = Path(__file__).parent.absolute().joinpath('stations.json')
output_path = Path(__file__).parent.absolute().joinpath('./static/sitemap.xml')

if __name__ == "__main__":
    station_data = load_json(station_path)
    now = datetime.now().strftime("%Y-%m-%dT00:00:00+00:00")
    with open(output_path, "w+") as f:
        f.write(empty_sitemap_start)
        for station in station_data:
            f.write(empty_site.format(base_url.format(station["id"]), now))

        f.write(empty_sitemap_end)