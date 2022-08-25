<script>
import stations from "../assets/stations.json"
import { useRoute } from "vue-router"

export default {
    name: "StationStats",
    components: {},
    data() {
        return {
            station_id: 0,
            station_data: {},
            station_stats: [],
            timer: null,
            last_update: new Date(),
        }
    },
    created() {
        const route = useRoute()
        this.station_id = route.params.stationid
        stations.forEach((station) => {
            if (station.id == this.station_id) {
                this.station_data = station
                return
            }
        })
        this.get_station_data()
    },
    methods: {
        async get_station_data() {
            const api_data = await (
                await fetch(
                    `https://api.tankstelle.aral.de/api/v2/stations/${this.station_id}/prices`
                )
            ).json()
            this.station_stats = api_data["data"]
            this.last_update = new Date()
        },
    },
    mounted: function () {
        if (this.timer == null) {
            this.timer = setInterval(() => {
                this.get_station_data()
            }, 1000 * 60 * 5)
        }
    },
    unmounted() {
        clearInterval(this.timer)
    },
}
</script>

<template>
    <div class="wrapper"><RouterLink to="/">Zurück</RouterLink></div>
    <table class="station_count">
        <tr>
            <td>
                <h1 v-once>{{ this.station_data.name }}</h1>
                <h3>{{ this.last_update.toLocaleTimeString() }}</h3>
            </td>
        </tr>
    </table>
    <table class="stationstats">
        <tr v-once>
            <td>Icon</td>
            <td>Kraftstoff</td>
            <td>Preis in Euro</td>
            <td>Preisänderung</td>
        </tr>
        <tr v-for="fuel in this.station_stats" :key="fuel.id">
            <td v-if="!fuel.price.error">
                <img
                    :src="
                        'https://external-content.duckduckgo.com/iu/?u=https://api.tankstelle.aral.de' +
                        fuel.icon
                    "
                />
            </td>
            <td v-if="!fuel.price.error">
                {{ fuel.name }}
            </td>
            <td v-if="!fuel.price.error">
                {{ parseFloat(fuel.price.price / 100).toFixed(2) }} €
            </td>
            <td v-if="!fuel.price.error">
                {{
                    new Date(
                        new Date(fuel.price.valid_from).toString() + " UTC"
                    ).getHours() +
                    ":" +
                    new Date(
                        new Date(fuel.price.valid_from).toString() + " UTC"
                    ).getMinutes() +
                    " Uhr"
                }}
            </td>
        </tr>
    </table>
</template>

<style lang="scss">
@import "../assets/stationstats.scss";
</style>
