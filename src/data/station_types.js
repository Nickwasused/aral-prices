export const station_types = {
    "stations": [
        {
            "id": 0,
            "name": "Aral",
            "url": "https://api.tankstelle.aral.de/api/v2/stations/{id}/prices",
            "headers": {
                "Host": "api.tankstelle.aral.de",
                "Origin": "https://tankstelle.aral.de"
            }
        },
        {
            "id": 1,
            "name": "Star",
            "url": "https://uberall.com/api/storefinders/fh6bkacXrYxFxK28kbylc8jdborIlY/locations/{id}?v=20210824&language=de&full=true",
            "headers": {
                "Host": "uberall.com",
                "Origin": "https://www.star.de"
            }
        }
    ]
}

export default station_types;