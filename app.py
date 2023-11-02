#!/usr/bin/env python3
from flask import Flask, render_template, request, redirect, url_for, g
from datetime import datetime, timezone
from dotenv import load_dotenv
from waitress import serve
import requests
import argparse
import sqlite3

load_dotenv()
app = Flask(__name__)


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect("./data/aral.db")
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.template_filter("euro")
def euro(value):
    value = float(value) / 100
    return "{:,.2f} €".format(value)


@app.template_filter("strftime")
def _jinja2_filter_datetime(date):
    # Parse the input date string into a datetime object
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
    date = date.replace(tzinfo=timezone.utc).astimezone(tz=None)

    # Format the datetime as a string
    return date.strftime("%H:%M")


@app.route("/", methods=["GET"])
def index():
    cursor = get_db().cursor()
    station_count = cursor.execute("SELECT COUNT(*) FROM stations;").fetchone()[0]
    return render_template("index.html", station_count=station_count)


@app.route("/raw/search", methods=["GET"])
def search():
    search_term = request.args.get("search")

    if not search_term:
        return ""

    if len(search_term) < 4:
        return ""

    search_term = search_term.lower()
    cursor = get_db().cursor()

    return_stations = cursor.execute(
        "SELECT * FROM stations WHERE LOWER(name) LIKE ? OR LOWER(city) LIKE ? OR LOWER(postcode) LIKE ?",
        (f"%{search_term}%", f"%{search_term}%", f"%{search_term}%",)).fetchall()

    return render_template("raw_search.html", stations=return_stations)


@app.route("/station/<int:station_id>", methods=["GET"])
def station(station_id):
    if not station_id:
        return redirect(url_for("index"))

    cursor = get_db().cursor()
    local_station_data = cursor.execute("SELECT postcode, city, name FROM stations WHERE id = ?;",
                                        (station_id,)).fetchone()
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
