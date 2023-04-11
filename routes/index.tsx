import Layout from '../components/layout.tsx';
import stations from '../stations_min.json' assert { type: 'json' };
import { Handlers, PageProps } from '$fresh/server.ts';
import { asset, Head } from '$fresh/runtime.ts';
import { Data, ger_facilities, ger_fuel, stationdata } from './data.ts';

export const handler: Handlers<Data> = {
	GET(req, ctx) {
		const url = new URL(req.url);
		const facilities: string[] = url.searchParams.getAll('facilities') || [];
		const fuel: string[] = url.searchParams.getAll('fuel') || [];
		let query: string = url.searchParams.get('query') || '';
		query = query.toLocaleLowerCase();
		let results: stationdata[] = [];

		if (query == '' && facilities.length == 0 && fuel.length == 0) {
			results = [];
		} else {
			results = stations.filter((station) => (
				(station.city.toLocaleLowerCase().includes(query) ||
					station.name.toLocaleLowerCase().includes(query) ||
					station.postcode.toLocaleLowerCase().includes(query) ||
					station.address.toLocaleLowerCase().includes(query)) &&
				facilities.every((entry: string) => station.facilities.includes(entry)) &&
				fuel.every((entry: string) => station.products.includes(entry))
			));
		}

		return ctx.render({ results, query, facilities, fuel });
	},
};

export default function Home({ data }: PageProps<Data>) {
	const { results, query, facilities, fuel } = data;
	return (
		<Layout>
			<Head>
				<title>Aral Tank-Preis Liste</title>
				{query
					? <meta name='description' content={`Tankpreise für ${query}.`} />
					: <meta name='description' content='Tankpreise für verschiedene Aral Tankstellen.' />}
				<link rel='stylesheet' href={asset('/stationlist.css')} />
			</Head>
			<table class='header_table'>
				<tr>
					<td>
						<h1>Tankstellen: {Object.keys(stations).length}</h1>
                        <span><a href="/privacy">Datenschutzerklärung</a></span>
					</td>
				</tr>
				<tr>
					<td>
						<form>
							<input
								type='text'
								name='query'
								placeholder='Stadt, Postleitzahl, Name, Straße'
								value={query ? query : ''}
							>
							</input>

							<select name='fuel' multiple>
								{ger_fuel.map(
									(element: string, index: number) => {
										if (fuel.includes(element)) {
											return (
												<option
													id={`${element}-${index}`}
													value={element}
													selected
												>
													{element}
												</option>
											);
										} else {
											return (
												<option
													id={`${element}-${index}`}
													value={element}
												>
													{element}
												</option>
											);
										}
									},
								)}
							</select>
							<select name='facilities' multiple>
								{Object.entries(ger_facilities).map(
									(
										element: [string, string],
										index: number,
									) => {
										if (facilities.includes(element[0])) {
											return (
												<option
													id={`${element[0]}-${index}`}
													value={element[0]}
													selected
												>
													{element[1]}
												</option>
											);
										} else {
											return (
												<option
													id={`${element[0]}-${index}`}
													value={element[0]}
												>
													{element[1]}
												</option>
											);
										}
									},
								)}
							</select>
							<input
								type='submit'
								value='suchen'
								class='wrapper'
							/>
						</form>
					</td>
				</tr>
			</table>
			{(Object.keys(results).length > 0) && (
				<span>
					<table class='header_table'>
						<tr>
							<td>
								<h2>
									Ergebnisse: {Object.keys(results).length}
								</h2>
							</td>
						</tr>
					</table>
					<table class='stationlist'>
						<tr>
							<td>Postleitzahl</td>
							<td>Stadt</td>
							<td>Name</td>
						</tr>
						{results.map((station: stationdata) => (
							<tr>
								<td><a href={`/station/${station.id}`}>{station.postcode}</a></td>
								<td><a href={`/station/${station.id}`}>{station.city}</a></td>
								<td><a href={`/station/${station.id}`}>{station.name}</a></td>
							</tr>
						))}
					</table>
				</span>
			)}
		</Layout>
	);
}
