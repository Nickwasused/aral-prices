import Layout from '../components/layout.tsx';
import { Head } from '$fresh/runtime.ts';

export default function NotFound() {
	return (
		<Layout>
			<Head>
				<title>Aral Tank-Preis Liste</title>
			</Head>
			<p>Seite nicht gefunden!</p>
		</Layout>
	);
}
