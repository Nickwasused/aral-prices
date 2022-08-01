<script>
import stations from '../assets/stations.json';
import { RouterLink } from 'vue-router';

export default {
  name: "StationList",
  components: {
    RouterLink
  },
  data() {
    return {
      stations: stations
    }
  }
}
</script>

<template>
  <table class="station_count">
    <tr><td><h1>Tankstellen: {{ Object.keys(this.stations).length }}</h1></td></tr>
  </table>
  <ul class="stationlist">
    <RouterLink :to="'/station/' + station.id" v-for="station in this.stations"><li>{{ station.name }}</li></RouterLink>
  </ul>
</template>

<style lang="scss">
@import "../assets/stationlist.scss";
</style>