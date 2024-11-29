<h3 align="center">Webinterface</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-inactive-success.svg)]() 
  [![License](https://img.shields.io/github/license/bp-stations/webinterface)](/LICENSE)

</div>

---

<p align="center"> Frontend for <a href="https://www.bp.com/">BP</a> gas stations
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Affiliation](#affiliation)

## 🧐 About <a name = "about"></a>
Frontend for [BP](https://www.bp.com/) gas stations using the data from [station-data](https://github.com/bp-stations/station-data/).

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install the software and how to install them.

``python3`` is required.
``tailwindcss`` [is required](https://tailwindcss.com/blog/standalone-cli)

### Installing

Install the required packages by running:

```commandline
pip install -r requirements.txt
```

Regenerate the ``main.css`` file by running:

```commandline
tailwindcss -i ./static/css/base.css -o ./static/css/main.css --watch -m
```

## 🎈 Usage <a name="usage"></a>
You can start the frontend by running ``python3 app.py``.

## 🚀 Deployment <a name = "deployment"></a>
There is a [Dockerfile](./Dockerfile) available.

## Style
The code is formatted and checked with [ruff](https://github.com/astral-sh/ruff)s default settings.

## ⛏️ Built Using <a name = "built_using"></a>
- [Flask](https://flask.palletsprojects.com) - Web Framework
- [Station-Data](https://github.com/bp-stations/station-data/) - Gas station data
- [tailwindcss](https://tailwindcss.com/) - CSS framework

## Affiliation <a name = "affiliation"></a>
I am not affiliated with the Aral Aktiengesellschaft nor the BP p.l.c.
