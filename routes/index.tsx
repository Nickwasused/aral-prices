import Layout from "../components/layout.tsx";
import stations from '../stations.json' assert { type: "json" };
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";
import { stationdata, Data, ger_facilities } from "./data.ts";

export const handler: Handlers<Data> = {
GET(req, ctx) {
  const url = new URL(req.url);
  const facilities: string[] = url.searchParams.getAll("facilities") || "";
  console.log(facilities);
  let query = url.searchParams.get("q") || "";
  query = query.toLocaleLowerCase()
  if (query == "" || query == undefined) {
      const results: stationdata[] = [];

      return ctx.render({ results, query, facilities });
  } else {
      const results: stationdata[] = stations.filter((station)=> (
        (
          station.city.toLocaleLowerCase().includes(query) ||
          station.name.toLocaleLowerCase().includes(query) ||
          station.postcode.toLocaleLowerCase().includes(query) ||
          station.address.toLocaleLowerCase().includes(query)
        ) &&
          (
            facilities.forEach((entry) => (
              station.facilities.includes(entry)
            ))
          )
      ));

      return ctx.render({ results, query, facilities });
    }
  },
};

export default function Home({ data }: PageProps<Data>) {
  const { results, query, facilities } = data;
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
              <input type="text" name="q" placeholder="Stadt, Postleitzahl, Name, Straße" value={query ? query:""}></input>
              {
                Object.entries(ger_facilities).map((element) => (
                  <span>
                    <input type="checkbox" id={element[0]} name="facilities" value={element[0]} />
                    <label for={element[0]}>{element[1]}</label>&nbsp;
                  </span>
                ))
              }
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
