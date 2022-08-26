/** @jsx h */
import { h } from "preact";
import Layout from "../components/layout.tsx";
import stations from '../stations.json' assert { type: "json" };

export default function Home() {
  return (
    <Layout>
      <table class="station_count">
          <tr>
              <td>
                  <h1>Tankstellen: { Object.keys(stations).length }</h1>
              </td>
          </tr>
      </table>
      <div>
      <ul class="stationlist">
        {stations.map((station) => (
          <a href={station.id}><li>{ station.name }</li></a> 
        ))}
      </ul>
      </div>
    </Layout>
  );
}
