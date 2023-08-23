#!/usr/bin/env python3
from flask import Flask, render_template, request, abort, redirect, url_for
from dotenv import load_dotenv
from waitress import serve
from json import loads
from datetime import datetime
import requests
import argparse
import sys

load_dotenv()
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

with open("./data/stations_min.json", "r", encoding="utf-8") as f:
    stations = f.read()

if not stations:
    app.logger.warning("stations not found.")
    sys.exit(1)

stations = loads(stations)
station_count = len(stations)
stations_dict = {item["id"]: item for item in stations}

# Preprocess the station data to build index dictionaries
stations_index = {
    "name": {},
    "city": {},
    "postcode": {},
    "id": {}
}

for index, tmp_station in enumerate(stations):
    for field in ["name", "city", "postcode", "id"]:
        for term in tmp_station[field].lower().split():
            if term not in stations_index[field]:
                stations_index[field][term] = []
            stations_index[field][term].append(index)


@app.template_filter("euro")
def euro(value):
    value = float(value) / 100
    return "{:,.2f} €".format(value)


@app.template_filter("strftime")
def _jinja2_filter_datetime(date):
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
    return date.strftime("%H:%M")


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html", station_count=station_count)


@app.route("/raw/search", methods=["GET"])
def search():
    search_term = request.args.get("search")

    if not search_term:
        return ""

    if len(search_term) < 4:
        return ""

    search_term = search_term.lower()

    # Initialize a set to store unique station matches
    matched_indices = set()

    for field in ["name", "city", "postcode"]:
        if search_term in stations_index[field]:
            matched_indices.update(stations_index[field][search_term])

    # Convert indices to actual station data
    return_stations = [stations[index] for index in matched_indices]

    return render_template("raw_search.html", stations=return_stations)


@app.route("/station/<int:station_id>", methods=["GET"])
def station(station_id):

    if not station_id:
        return redirect(url_for("index"))

    local_station_data = stations_dict.get(str(station_id))

    if not local_station_data:
        return redirect(url_for("index"))

    station_data = requests.get(f"https://api.tankstelle.aral.de/api/v2/stations/{station_id}/prices").json()

    return render_template("station.html", local_station_data=local_station_data, station_data=station_data)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="frontend")
    parser.add_argument("-w", "--waitress", help="Define if we want to use waitress for the web server.",
                        action="store_true")
    args = parser.parse_args()

    if args.waitress:
        app.logger.info("app listening on port 5000")
        serve(app, port=5000, host="0.0.0.0")
    else:
        # https://werkzeug.palletsprojects.com/en/2.2.x/serving/#werkzeug.serving.run_simple
        app.run(debug=True)