import React from 'react';
import button from "../css/button.module.css";
import { NavLink } from 'react-router-dom';

class Privacy extends React.PureComponent {
  render() {
    return (
        <div>
            <NavLink 
                exact to="/" 
                activeClassName="selected">
                <center><button className={button.button}>Zurück</button></center>
            </NavLink><br/>
            <div class="privacy">
                <h1>Datenschutzbestimmungen für Nickwasused</h1>

                <p>Bei der Tankliste, erreichbar unter https://tanken.nickwasused.eu/, ist eine unserer Hauptprioritäten der Schutz der Privatsphäre unserer Besucher. Dieses Dokument zum Datenschutz enthält die Arten von Informationen, die von LuckyV Streamer Liste gesammelt und aufgezeichnet werden, und wie wir sie verwenden.</p>

                <p>Wenn Sie weitere Fragen haben oder mehr Informationen über unsere Datenschutzrichtlinie benötigen, zögern Sie nicht, uns zu kontaktieren.</p>

                <p>Diese Datenschutzrichtlinie gilt nur für unsere Online-Aktivitäten und für die Besucher unserer Website in Bezug auf die Informationen, die sie in LuckyV Streamer Liste teilen und/oder sammeln. Diese Richtlinie gilt nicht für Informationen, die anders als auf dieser Website gesammelt werden. </p>

                <h2>Zustimmung</h2>

                <p>Durch die Nutzung unserer Website erklären Sie sich mit unserer Datenschutzrichtlinie einverstanden und stimmen deren Bedingungen zu.</p>

                <h2>Informationen, die wir sammeln</h2>

                <p>Wenn Sie uns direkt kontaktieren, können wir zusätzliche Informationen über Sie erhalten, wie z.B. Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer, den Inhalt der Nachricht und/oder Anhänge, die Sie uns senden, und alle anderen Informationen, die Sie uns zur Verfügung stellen.</p>

                <h2>Wie wir Ihre Informationen verwenden</h2>

                <p>Wir verwenden die von uns erfassten Informationen auf verschiedene Weise, unter anderem um:</p>

                <ul>
                <li>Inhalte von dritten zur Verfügung zu stellen (https://api.tankstelle.aral.de)</li>
                </ul>

                <h2>Log-Dateien</h2>

                <p>LuckyV Streamer Liste verwendet keine eigenden Protokolldateien. Jedoch verwendet der Hoster (https://www.cloudflare.com/) möglicherweise welche.</p>

                <h2>Cookies und Web Beacons</h2>

                <p>Wie jede andere Website verwendet auch die LuckyV Streamer Liste "Cookies". Diese Cookies werden verwendet, um Informationen zu speichern, einschließlich der Präferenzen der Besucher und der Seiten auf der Website, die der Besucher aufgerufen oder besucht hat. Diese Informationen werden verwendet, um Inhalte auf unserer Webseite zur verfügung zu stellen.</p>

                <h2>Datenschutzrichtlinien Dritter</h2>

                <p>Die Datenschutzrichtlinien von LuckyV Streamer Liste gelten nicht für andere Websites. Wir raten Ihnen daher, die jeweiligen Datenschutzrichtlinien dieser Dritter zu konsultieren, um genauere Informationen zu erhalten. Diese können deren Praktiken und Anweisungen darüber enthalten, wie Sie bestimmte Optionen deaktivieren können. </p>

                <p>Sie können Cookies über Ihre individuellen Browseroptionen deaktivieren. Ausführlichere Informationen über die Cookie-Verwaltung mit bestimmten Webbrowsern finden Sie auf den jeweiligen Websites der Browser.</p>

                <h2>CCPA-Datenschutzrechte (Verkaufen Sie meine persönlichen Daten nicht)</h2>

                <p>Nach dem CCPA haben kalifornische Verbraucher neben anderen Rechten das Recht:</p>
                <p>Von einem Unternehmen, das personenbezogene Daten eines Verbrauchers sammelt, zu verlangen, dass es die Kategorien und spezifischen Teile der personenbezogenen Daten offenlegt, die das Unternehmen über den Verbraucher gesammelt hat.</p>
                <p>Verlangen, dass ein Unternehmen alle personenbezogenen Daten über den Verbraucher löscht, die ein Unternehmen gesammelt hat.</p>
                <p>Verlangen Sie, dass ein Unternehmen, das die personenbezogenen Daten eines Verbrauchers verkauft, die personenbezogenen Daten des Verbrauchers nicht verkauft.</p>
                <p>Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten. Wenn Sie eines dieser Rechte ausüben möchten, nehmen Sie bitte Kontakt mit uns auf.</p>

                <h2>GDPR-Datenschutzrechte</h2>

                <p>Wir möchten sicherstellen, dass Sie sich über alle Ihre Datenschutzrechte im Klaren sind. Jeder Nutzer hat das Recht auf Folgendes:</p>
                <p>Das Auskunftsrecht - Sie haben das Recht, Kopien Ihrer personenbezogenen Daten anzufordern. Für diesen Service können wir Ihnen eine geringe Gebühr in Rechnung stellen.</p>
                <p>Das Recht auf Berichtigung - Sie haben das Recht, von uns die Berichtigung von Daten zu verlangen, die Sie für unrichtig halten. Sie haben auch das Recht zu verlangen, dass wir die Informationen, die Sie für unvollständig halten, vervollständigen.</p>
                <p>Das Recht auf Löschung - Sie haben das Recht zu verlangen, dass wir Ihre personenbezogenen Daten unter bestimmten Bedingungen löschen.</p>
                <p>Das Recht auf Einschränkung der Verarbeitung - Sie haben das Recht zu verlangen, dass wir die Verarbeitung Ihrer personenbezogenen Daten unter bestimmten Bedingungen einschränken.</p>
                <p>Das Recht auf Widerspruch gegen die Verarbeitung - Sie haben das Recht, unter bestimmten Bedingungen gegen die Verarbeitung Ihrer personenbezogenen Daten durch uns Widerspruch einzulegen.</p>
                <p>Das Recht auf Datenübertragbarkeit - Sie haben das Recht, unter bestimmten Bedingungen zu verlangen, dass wir die von uns erhobenen Daten an eine andere Organisation oder direkt an Sie weitergeben.</p>
                <p>Wenn Sie einen Antrag stellen, haben wir einen Monat Zeit, Ihnen zu antworten. Wenn Sie eines dieser Rechte ausüben möchten, kontaktieren Sie uns bitte.</p>

                <h2>Informationen für Kinder</h2>

                <p>Ein weiterer Teil unserer Priorität ist der Schutz von Kindern bei der Nutzung des Internets. Wir ermutigen Eltern und Erziehungsberechtigte, ihre Online-Aktivitäten zu beobachten, daran teilzunehmen und/oder sie zu überwachen und anzuleiten.</p>

                <p>LuckyV Streamer Liste erhebt nicht wissentlich personenbezogene Daten von Kindern unter 13 Jahren. Wenn Sie der Meinung sind, dass Ihr Kind diese Art von Daten auf unserer Website angegeben hat, bitten wir Sie dringend, uns umgehend zu kontaktieren, damit wir uns bemühen können, diese Daten umgehend aus unseren Aufzeichnungen zu entfernen.</p>

            </div>
        </div>
      )
    }
  } export default React.memo(Privacy);