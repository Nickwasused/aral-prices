import { Handlers, PageProps } from '$fresh/server.ts';
import Layout from '../../components/layout.tsx';
import stations from '../../stations.json' assert { type: 'json' };
import { asset, Head } from '$fresh/runtime.ts';
import { ger_facilities, Stats } from '../data.ts';

export const handler: Handlers<Stats | null> = {
	async GET(_req, ctx) {
		const { stationid } = ctx.params;
		const station_data = await fetch(
			`https://api.tankstelle.aral.de/api/v2/stations/${stationid}/prices`,
		);
		if (!station_data) {
			return new Response('Station not found', { status: 404 });
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
	return fstations[0];
}

export default function StationStats(props: PageProps) {
	if (!props.data) {
		return <h1>Station not found!</h1>;
	}

	const station = get_station(parseInt(props.params.stationid));

	return (
		<Layout>
			<Head>
				<title>{station.city} Tankpreise</title>
				<meta
					name='description'
					content={'Tankpreise für die Aral Tankstelle in ' +
						station.city + '.'}
				>
				</meta>
				<link rel='stylesheet' href={asset('/stationstats.css')} />
			</Head>
			<div class='wrapper'>
				<a href='/'>Zurück</a>
			</div>
			<table class='header_table'>
				<tr>
					<td>
						<h1>{station.city}</h1>
					</td>
				</tr>
			</table>
			<table class='stationstats'>
				<tr v-once>
					<td>Icon</td>
					<td>Kraftstoff</td>
					<td>Preis in Euro</td>
					<td>Preisänderung</td>
				</tr>
				{props.data['data'].map((fuel: Stats) => {
					if (fuel.price.error) {
						return <tr></tr>;
					} else {
						return (
							<tr>
								<td>
									<img
										alt={fuel.name}
										src={`https://external-content.duckduckgo.com/iu/?u=https://api.tankstelle.aral.de${fuel.icon}`}
									/>
								</td>
								<td>
									{fuel.name}
								</td>
								<td>
									{(fuel.price.price / 100).toFixed(2)} €
								</td>
								<td>
									{new Date(
										new Date(fuel.price.valid_from)
											.toString() + ' UTC',
									).getHours() + ':' +
										new Date(
											new Date(fuel.price.valid_from)
												.toString() + ' UTC',
										).getMinutes() + ' Uhr'}
								</td>
							</tr>
						);
					}
				})}
			</table>
			<div class='extra_info'>
				<div class='facilities'>
					<h2>Services</h2>
					<ul>
						{station.facilities.map((entry: string) => {
							if (
								ger_facilities[entry] !== undefined &&
								ger_facilities[entry] !== ''
							) {
								return <li>{ger_facilities[entry]}</li>;
							}
						})}
					</ul>
				</div>
				<div class='contact'>
					<h2>Kontakt</h2>
					{station.name}
					<br />
					{station.address}
					<br />
					{station.postcode} {station.city}
					<br />
					{station.telephone}
				</div>
			</div>
		</Layout>
	);
}
