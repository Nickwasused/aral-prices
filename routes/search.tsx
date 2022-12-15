/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import Layout from "../components/layout.tsx";
import stations from '../stations.json' assert { type: "json" };
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
    if (query == "") {
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

export default function Search({ data }: PageProps<Data>) {
  const { results, query } = data;
  return (
    <Layout>
        <Head>
            <link rel="stylesheet" href={asset('/stationlist.css')} />
            <meta name="description" content={"Tankpreise für "  + query + "."}></meta>
        </Head>
        <table class="header_table">
          <tr>
              <td>
                  <h1>Ergebnisse: { Object.keys(results).length }</h1>
              </td>
          </tr>
          <tr>
            <td>
                <div class="wrapper"><a href="/">Zurück</a></div>
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