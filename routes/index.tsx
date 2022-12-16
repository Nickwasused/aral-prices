/** @jsx h */
import { h } from "preact";
import Layout from "../components/layout.tsx";
import stations from '../stations.json' assert { type: "json" };
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";

type stationdata = {
  id: string,
  name: string,
  lat: string,
  lng: string,
  adress: string,
  city: string,
  state: string,
  postcode: string,
  country_code: string,
  telephone: string,
  facilities: string[],
  products: string[],
  opening_hours: string[],
  open_status: string,
  site_brand: string,
  watchlist_id?: string,
  website?: string
}

interface Data {
results: stationdata[];
query: string;
}

export const handler: Handlers<Data> = {
GET(req, ctx) {
  const url = new URL(req.url);
  let query = url.searchParams.get("q") || "";
  query = query.toLocaleLowerCase()
  if (query == "" || query == undefined) {
      const results = [];

      return ctx.render({ results, query });
  } else {
      const results: stationdata[] = stations.filter((station) => (
          station.city.toLocaleLowerCase().includes(query) ||
          station.name.toLocaleLowerCase().includes(query) ||
          station.postcode.toLocaleLowerCase().includes(query) ||
          station.address.toLocaleLowerCase().includes(query)
      ));

      return ctx.render({ results, query });
  }
},
};

export default function Home({ data }: PageProps<Data>) {
  const { results, query } = data;
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
            <form>
              <input type="text" name="q" placeholder="Stadt, Postleitzahl, Name, Straße"></input>
            </form>
            </td>
          </tr>
      </table>
      <Head>
          <link rel="stylesheet" href={asset('/stationlist.css')} />
          <meta name="description" content={"Tankpreise für "  + query + "."}></meta>
      </Head>
      <table class="header_table">
        <tr>
            <td>
                <h2>Ergebnisse: { Object.keys(results).length }</h2>
            </td>
        </tr>
      </table>
      <table class="stationlist">
          <tr>
              <td>Postleitzahl</td>
              <td>Stadt</td>
              <td>Name</td>
          </tr>
          {results.map((station) => (
              <tr onClick={'location.href="/station/' + station.id + '"'}>
                  <td>{station.postcode}</td>
                  <td>{station.city}</td>
                  <td>{station.name}</td>
              </tr>
          ))}
      </table>
    </Layout>
  );
}
