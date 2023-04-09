
import Layout from '../components/layout.tsx';
import { Head, asset } from '$fresh/runtime.ts';

export default function Privacy() {
    return (
        <Layout>
            <Head>
                <title>Datenschutzerklärung</title>
                <meta name='description' content='Datenschutzerklärung' />
                <link rel='stylesheet' href={asset('/privacy.css')} />
            </Head>
            <div class="privacy">
                <h1>Datenschutzerklärung</h1>

                <h2>§1 verarbeitete Daten</h2>
                <h3>Reporting</h3>
                <p>Diese Website nutzt <a href="https://report-uri.com/home/privacy_policy">report-uri.com</a>, um Berichte über browser-sicherheits-standarts zu erhalten.</p>
                <p>Dafür werden folgende Daten während eines Berichtes erfasst:</p>
                <ul>
                    <li>IP Adresse</li>
                    <li>HTTP Referrer Header</li>
                    <li>Document URI</li>
                    <li>Query String</li>
                    <li>URI Fragmente</li>
                </ul>

                <h3>Hosting</h3>
                <p>Diese Website wird auf <a href="https://deno.com/deploy">Deno Deploy</a> gehostet.</p>

                <h2>§2 Cookies</h2>
                <p>Diese Website verwendet keine Cookies.</p>

                <h2>§3 Änderungen</h2>
                <p>Veränderungen an dieser Datenschutzerklärung können jederzeit vorgenommen werden. Es wird empfohlen, diese Seite immer mal wieder zu prüfen.</p>

                <h2>$4 Beschwerden</h2>
                <p>Beschwerden gegen diese Datenschutzerklärung können an <a href="mailto:contact@tankpreise.uk">contact@tankpreise.uk</a> gesendet werden.</p>
            </div>
        </Layout>
    );
}