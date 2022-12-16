/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../../components/layout.tsx";
import stations from '../../stations.json' assert { type: "json" };
import { Head, asset } from "$fresh/runtime.ts";

interface Stats {
  id: number;
  aral_id: string;
  name: string;
  icon: string;
  price: any;
}

const ger_facilities = {
  "open_24_hours": "24 Stunden geöffnet",
  "car_wash": "Waschanlage",
  "jet_wash": "JetWash",
  "super_wash": "SuperWash",
  "recup": "RECUP - Pfandbecher",
  "shop": "Aral Store",
  "bistro": "PetitBistro",
  "pay_at_pump_supported": "Bezahlen an der Zapfsäule",
  "outdoor_payment_terminal": "Outdoor-Zahlungsterminal",
  "loyalty": "PAYBACK & Aral FuelCard",
  "special_car_wash": "Spezielle Waschanlage",
  "vda": "VDA Konform Siegel",
  "open_saturday": "Samstags geöffnet",
  "open_sunday": "Sonntags geöffnet",
  "rewe_to_go": "Rewe to Go",
  "too_good_to_go": "Too Good To Go",
  "super_boxes": "SB Waschplätze",
  "cash_point": "Geldautomat",
  "electric_charging": "Ladesäulen",
  "truck_parking": "Autohof",
  "motorway_site": "Autobahnnah",
  "truck_wash": "Truck Wash"
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

function get_station(stationid: number) {
  const fstations = stations.filter((station) => {
    if (parseInt(station.id) == stationid) {
      return station;
    }
  });
  return fstations[0]
}


export default function StationStats(props: PageProps) {
  if (!props.data) {
    return <h1>Station not found!</h1>
  }

  const station = get_station(parseInt(props.params.stationid))

  return (
    <Layout>
      <Head>
        <title>{ station.city } Tankpreise</title>
        <meta name="description" content={ "Tankpreise für die Aral Tankstelle in "  + station.city + "."}></meta>
        <link rel="stylesheet" href={asset('/stationstats.css')} />
      </Head>
      <div class="wrapper"><a href="/">Zurück</a></div>
      <table class="header_table">
        <tr>
            <td>
              <h1>{ station.city }</h1>
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
          { props.data["data"].map((fuel: Stats) => {
            if (fuel.price.error) {
              return (
                <tr></tr>
              )
            } else {
              return (
                <tr>
                  <td>
                    <img alt={fuel.name} src={`https://external-content.duckduckgo.com/iu/?u=https://api.tankstelle.aral.de${fuel.icon}`} />
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
      <div class="extra_info">
        <div class="facilities">
          <h3>Services</h3>
          <ul>
          { station.facilities.map((entry: string) => {
              if (ger_facilities[entry] !== undefined && ger_facilities[entry] !== "") {
                return (
                  <li>{ger_facilities[entry]}</li>
                )
              }
              
            })
          }
          </ul>
        </div>
        <div class="contact">
          <h3>Kontakt</h3>
          {station.name}<br />
          {station.address}<br />
          {station.postcode} {station.city}<br />
          {station.telephone}
        </div>
      </div>
  </Layout>
  );
}
