/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/layout.tsx";
// import stations from '../stations.json' assert { type: "json" };

interface Stats {
  id: number;
  aral_id: string;
  name: string;
  icon: string;
  price: any;
}

export const handler: Handlers<Stats | null> = {
  async GET(_req, ctx) {
    const { stationid } = ctx.params;
    const station_data = await fetch(`https://api.tankstelle.aral.de/api/v2/stations/${stationid}/prices`);
    if (!station_data) {
      return new Response("Station not found", { status: 404 });
    }
    const station_stats: Stats = await station_data.json();
    return ctx.render(station_stats);
  },
};

export default function StationStats(props: PageProps) {
  if (!props.data) {
    return <h1>Station not found!</h1>
  }

  return (
    <Layout>
      <div class="wrapper"><a href="/">Zurück</a></div>
      <table class="stationstats">
          <tr v-once>
              <td>Icon</td>
              <td>Kraftstoff</td>
              <td>Preis in Euro</td>
              <td>Preisänderung</td>
          </tr>
          { props.data["data"].map((fuel: Stats) => {
            if (fuel.price.error) {
              return (
                <tr></tr>
              )
            } else {
              return (
                <tr>
                  <td>
                    <img src={`https://external-content.duckduckgo.com/iu/?u=https://api.tankstelle.aral.de${fuel.icon}`} />
                  </td>
                  <td>
                    { fuel.name }
                  </td>
                  <td>
                    { (fuel.price.price / 100).toFixed(2) } €
                  </td>
                  <td>
                  {
                    new Date(new Date(fuel.price.valid_from).toString() + " UTC").getHours() + ":" + new Date(new Date(fuel.price.valid_from).toString() + " UTC").getMinutes() + " Uhr"
                  }
                  </td>
                </tr>
              )
            }}) }
      </table>
  </Layout>
  );
}
