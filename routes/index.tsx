import Layout from "../components/layout.tsx";
import stations from '../stations.json' assert { type: "json" };
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";
import { stationdata, Data, ger_facilities, ger_fuel } from "./data.ts";

export const handler: Handlers<Data> = {
GET(req, ctx) {
  const url = new URL(req.url);
  const facilities: string[] = url.searchParams.getAll("facilities");
  const fuel: string[] = url.searchParams.getAll("fuel");
  let query: string = url.searchParams.get("query") || "";
  query = query.toLocaleLowerCase()
  let results: stationdata[] = [];

  // filter for city, name, postcode and address
  if (query !== "" && query !== undefined) {
    results = stations.filter((station) => (
      station.city.toLocaleLowerCase().includes(query) ||
      station.name.toLocaleLowerCase().includes(query) ||
      station.postcode.toLocaleLowerCase().includes(query) ||
      station.address.toLocaleLowerCase().includes(query)
    ));
  }

  // filter for facilities
  if (facilities.length !==0) {
    results = results.filter((station)=> (
      facilities.every((entry) => station.facilities.includes(entry))
    ));
  }

  // filter for fuel
  if (fuel.length !==0) {
    results = results.filter((station)=> (
      fuel.every((entry) => station.products.includes(entry))
    ));
  }

  return ctx.render({ results, query, facilities, fuel });
}};

export default function Home({ data }: PageProps<Data>) {
  const { results, query, facilities, fuel } = data;
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
              <input type="text" name="query" placeholder="Stadt, Postleitzahl, Name, Straße" value={query ? query:""}></input>
              {
                ger_fuel.map((element: string) => (
                  <span>
                    {fuel.includes(element) ? <input type="checkbox" id={element} name="fuel" value={element} checked />:<input type="checkbox" id={element} name="fuel" value={element} />}
                    <label for={element}>{element}</label>&nbsp;
                  </span>
                ))
              } <br /><br />
              {
                Object.entries(ger_facilities).map((element) => (
                  <span>
                    {facilities.includes(element[0]) ? <input type="checkbox" id={element[0]} name="facilities" value={element[0]} checked />: <input type="checkbox" id={element[0]} name="facilities" value={element[0]} />}
                    <label for={element[0]}>{element[1]}</label>&nbsp;
                  </span>
                ))
              } <br />
              <input type="submit" style="display: none" />
              <input type="submit" value="suchen" class="wrapper" />
            </form>
            </td>
          </tr>
      </table>
      <Head>
          <link rel="stylesheet" href={asset('/stationlist.css')} />
          <meta name="description" content={`Tankpreise für ${query}.`}></meta>
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
          {results.map((station: stationdata) => (
              <tr onClick={`location.href="/station/${station.id}"`}>
                  <td>{station.postcode}</td>
                  <td>{station.city}</td>
                  <td>{station.name}</td>
              </tr>
          ))}
      </table>
    </Layout>
  );
}
