/** @jsx h */
import { h } from "preact";
import Layout from "../components/layout.tsx";
import stations from '../stations.json' assert { type: "json" };
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <Layout>
      <Head>
        <meta name="description" content="Tankpreise für verschiedene Aral Tankstellen."></meta>
      </Head>
      <table class="header_table">
          <tr>
              <td>
                  <h1>Tankstellen: { Object.keys(stations).length }</h1>
              </td>
          </tr>
          <tr>
            <td>
            <form action="/search">
              <input type="text" name="q" placeholder="Stadt, Postleitzahl, Name, Straße"></input>
            </form>
            </td>
          </tr>
      </table>
    </Layout>
  );
}
